import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDataBase_ApproveProgram, useDataBase_ReadPrograms, useDataBase_ReadRegistrations, useDataBase_RemoveProgram } from '../Hooks/useDataBase';
import InfoBarContext from "../Context/InfoBarContext";
import { infoBarAction } from "../Reduce/InfoBarReducer";
import EventContext from "../Context/EventContext";
import dayjs from "dayjs";

function ManageProgram() {
  const navigator = useNavigate();
  const { eventID } = useParams();
  const [events, loadingEvent, errorEvent] = useContext(EventContext);
  const [programList, loadingProgram, errorProgram] = useDataBase_ReadPrograms(eventID);
  const [registrationList, loadingRegister, errorRegister] = useDataBase_ReadRegistrations(eventID);
  const [removeProgram, loadingRemoveProgram, errorRemoveProgram] = useDataBase_RemoveProgram();
  const [approveProgram, loadingApproveProgram, errorApproveProgram] = useDataBase_ApproveProgram();
  const event = events?.[eventID];

  const userList = () => navigator('../printUserList/' + eventID);
  const edit = () => navigator('../editEvent/' + eventID);


  return (
    <>
      {(errorEvent || errorProgram || errorRegister || errorRemoveProgram || errorApproveProgram) && <p style={{ color: 'red' }}> Błąd odczytu z bazy danych <br /> {errorEvent} </p>}
      <h2 style={{ marginBottom: '1rem', marginTop: '1rem' }}>Szczegóły wydarzenia</h2>
      <button onClick={userList} className="btn btn-primary" style={{ marginRight: '1rem' }}>
        Lista osób
      </button>
      <button onClick={edit} className="btn btn-warning">
        edytuj wydarzenie
      </button>

      {loadingEvent
        ? <div className="spinner-border text-primary" role="status">  <span className="visually-hidden">Loading...</span></div>
        : <div>
          <h3 style={{ color: 'blue' }}>{event.title}</h3>

          {event.picsURL && <img alt="obrazek wydarzenia" src={event.picsURL} style={{ maxHeight: '100px', maxWidth: '200px' }} />}

          <table className="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th scope="col" style={{ width: '10%' }}>key</th>
                <th scope="col">value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(event).map(([key, value], index) => <tr key={index}>
                <td>{key}</td><td>{value}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      }
      {loadingProgram
        ? <div className="spinner-border text-primary" role="status">  <span className="visually-hidden">Loading...</span></div>
        : <div style={{ textAlign: 'left' }}>
          <h4 >ListaSesji</h4>
          {errorEvent && <p style={{ color: 'red' }}> Błąd odczytu z bazy danych <br /> {errorEvent} </p>}
          {errorEvent && <p style={{ color: 'red' }}> Błąd odczytu z bazy danych <br /> {errorEvent} </p>}
          {loadingProgram || loadingRegister
            ? <p> trwa ładowanie ...</p>
            : <div style={{ textAlign: 'left' }}>
              {Object.entries(programList).map(([id, program]) => <Program
                key={id}
                eventID={eventID}
                programID={id}
                program={program}
                registrationList={registrationList?.[id]}
                remove={removeProgram}
                approve={approveProgram}
                loading={loadingRemoveProgram || loadingApproveProgram} />)
              }
            </div>
          }
        </div>
      }
    </>
  );
}

function Program(props) {
  const navigator = useNavigate();
  const [confirmRemove, setConfirmRemove] = useState();
  const infoBar = useContext(InfoBarContext);
  const program = props.program;
  const registrationList = props.registrationList;

  const edit = () => navigator('../editProgram/' + props.programID);
  const approve = async () => {
    const resultError = await props.approve(props.eventID, props.programID, !program?.approved);
    resultError
      ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można zalogować użytkownika, sprawdź login i hasło' })
      : program?.approved
        ? infoBar.dispatch({ type: infoBarAction.WARNING, message: 'Ukryto sesję' })
        : infoBar.dispatch({ type: infoBarAction.SUCCESS, message: 'Pokazano sesję' })
  }
  const remove = async () => {
    if (confirmRemove) {
      const resultError = await props.remove(props.eventID, props.programID);
      resultError
        ? infoBar.dispatch({ type: infoBarAction.ERROR, message: 'Nie można usunąć sesji' })
        : infoBar.dispatch({ type: infoBarAction.WARNING, message: 'Usunięto sesję' })
    }
    setConfirmRemove(!confirmRemove);
  };


  return (
    <div style={{ marginBottom: '2rem' }}>
      <hr />
      <h5 style={{ color: 'blue' }}>{program.title}</h5>
      <p>Zapisanych: {registrationList ? Object.keys(registrationList)?.length : 0}/{program.usersCountMax}</p>
      {props.loading
        ? <div className="spinner-border text-danger" role="status">  <span className="visually-hidden">Loading...</span></div>
        : <div style={{ display: 'flex', flexDirection: 'row' }}>
          <button onClick={remove} className="btn btn-danger">
            {confirmRemove ? "Potwierdź" : "Usuń"}
          </button>
          <button onClick={edit} className="btn btn-warning" style={{ marginLeft: '1rem' }}>
            Edytuj
          </button>
          <button onClick={approve} className={`btn ${program?.approved ? "btn-secondary" : "btn-success"}`} style={{ marginLeft: '1rem' }}>
            {program?.approved ? "Ukryj" : "Zatwierdź"}
          </button>
        </div>
      }
      <table className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th scope="col" style={{ width: '10%' }}>key</th>
            <th scope="col">value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(program).map(([key, value], index) => <tr key={index}>
            <td>{key}</td><td>{JSON.stringify(value)}</td>
          </tr>)}
        </tbody>
      </table>
      <h6>Zapisy na sesje</h6>
      {registrationList && <table className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th scope="col" style={{ width: '10%' }}></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(registrationList).map(([key, value], index) => <tr key={index}>
            <td>{key}</td><td>{dayjs(value?.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
          </tr>)}
        </tbody>
      </table>
      }
    </div>
  )
}


export default ManageProgram;

