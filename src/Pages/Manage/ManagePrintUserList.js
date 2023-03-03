import { useParams } from "react-router";
import { useDataBase_ReadPrograms, useDataBase_ReadRegistrations, useDataBase_ReadUsers } from "../../Hooks/useDataBase";
import dayjs from "dayjs";
import { useContext } from "react";
import EventContext from "../../Context/EventContext";



export default function ManagePrintUserList() {
  const { eventID } = useParams();
  const [events, loadingEvent,] = useContext(EventContext);
  const [programList, , ] = useDataBase_ReadPrograms(eventID);
  const [registrationList, ,] = useDataBase_ReadRegistrations(eventID);
  const [usersList, ,] = useDataBase_ReadUsers(eventID);
  const event = events?.[eventID];

  const print = () => window.print();

  return (
    <>
      <div className="d-print-none">
        <h2 style={{ marginBottom: '1rem', marginTop: '1rem' }}>Lista osób</h2>

        {loadingEvent
          ? <div className="spinner-border text-primary" role="status">  <span className="visually-hidden">Loading...</span></div>
          : <div style={{ textAlign: 'left' }}>
            <h3 style={{ color: 'blue' }}>{event.title}</h3>
            <h4 >{dayjs(event.date).format('YYYY-MM-DD HH:mm:ss')}</h4>

            {event.picsURL && <img alt="obrazek wydarzenia" src={event.picsURL} style={{ maxHeight: '100px', maxWidth: '200px' }} />}
          </div>
        }
        <h4 style={{ marginBottom: '1rem', marginTop: '1rem' }}>Zapisane osoby</h4>

        <button onClick={print} className="btn btn-primary">
          Drukuj
        </button>
      </div>
      <div id="sessionTable" className="d-print-block" style={{ textAlign: 'left' }}>
        {Object.entries(programList).map(([id, program]) => <Program
          key={id}
          eventID={eventID}
          programID={id}
          program={program}
          registrationList={registrationList?.[id]}
          usersList={usersList}
          />)
        }
      </div>

    </>
  )
}

function Program(props) {
  const program = props.program;
  const registrationList = props.registrationList;
  const usersList = props.usersList;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <hr />
      <h5 style={{ color: 'blue' }}>{program.title}</h5>
      <p>Zapisanych: {registrationList ? Object.keys(registrationList)?.length : 0}/{program.usersCountMax}</p>
      {registrationList && <table className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th scope="col" style={{ width: '30%' }}></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(registrationList).map(([key, value], index) => <tr key={index}>
            <td>{usersList?.[key]?.displayName}</td>
          </tr>)}
        </tbody>
      </table>
      }
    </div>
  )
}