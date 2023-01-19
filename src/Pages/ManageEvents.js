import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import EventContext from "../Context/EventContext"
import { useDataBase_RemoveEvent } from "../Hooks/useDataBase";


function ManageEvents() {
  const navigator = useNavigate();
  const [events, loading, error] = useContext(EventContext);
  const removeEvent = useDataBase_RemoveEvent(); 

  const addEvent = () => navigator('addEvent');

  const sorter = (a, b) => {
    return a[1].date < b[1].date
  }

  return (
    <div>
      <h1 style={{ marginTop: '10px' }}>Zarządzaj wydarzeniami</h1>
      <button onClick={addEvent} className="btn btn-primary">
        Dodaj wydarzenie
      </button>
      {error && <p style={{ color: 'red' }}> Błąd odczytu z bazy danych <br /> {error} </p>}
      {loading
        ? <p> trwa ładowanie ...</p>
        : <div style={{ textAlign: 'left' }}>
          {Object.entries(events).sort(sorter).map(([id, event]) => <Event key={id} id={id} event={event} removeEvent={removeEvent} />)}
        </div>
      }
    </div>
  )
}

export default ManageEvents;

function Event(props) {
  const navigator = useNavigate();
  const [confirmRemove, setConfirmRemove] = useState();
  const [removeEvent, loading, error] = props.removeEvent;

  const details = () => navigator('evetnDetails/' + props.id);
  const edit = () => navigator('editEvent/' + props.id);
  const remove = () => {
    if(confirmRemove) removeEvent(props.id);
    setConfirmRemove(!confirmRemove);
  };

  const event = props.event;
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>{event.title}</h3>

      {event.picsURL && <img alt="obrazek wydarzenia" src={event.picsURL} style={{maxHeight: '100px',maxWidth:'200px'}}/>}

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
      {error && <div className="alert alert-danger" role="alert">Błąd podczas usunięcia eventu</div>}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button onClick={remove} className="btn btn-danger">
          {confirmRemove ? "Potwierdź" : "Usuń"}
        </button>
        {loading && <div className="spinner-border text-danger" role="status">  <span className="visually-hidden">Loading...</span></div>}
        <button onClick={edit} className="btn btn-warning" style={{ marginLeft: '1rem' }}>
          Edytuj
        </button>
        <button onClick={details} className="btn btn-info" style={{ marginLeft: '1rem' }}>
          Szczegóły
        </button>
      </div>
    </div>
  )
}