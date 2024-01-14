import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const TeacherPage = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const handleSaveActivity = (activity) => {
    setActivities([...activities, activity]);
    setIsModalOpen(false); // Închide modalul după salvare
  };

  const handleActivityClick = (activity, history) => {
    // Aici deschidem pagina de feedback pentru activitatea selectată
    setSelectedActivity(activity);
  };

  const closeFeedback = () => {
    setSelectedActivity(null);
  };

  const AddActivityModal = () => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [accessCode, setAccessCode] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      handleSaveActivity({ title, date, time, accessCode });
    };

    return (
      <div className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Titlu:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="time">Setare Ora:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label htmlFor="date">Setare Data:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label htmlFor="accessCode">Setare Cod Acces:</label>
          <input
            type="text"
            id="accessCode"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            required
          />

          <button type="submit">Salvează</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Închide</button>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Pagina Profesorului</h1>

      {activities.map((activity, index) => (
        <div
          key={index}
          style={{
            border: '1px solid',
            borderRadius: '8px',
            padding: '10px',
            marginTop: '10px',
            cursor: 'pointer',
          }}
          onClick={() => handleActivityClick(activity)}
        >
          <p>Titlu: {activity.title}</p>
          <p>Ora: {activity.time}</p>
          <p>Data: {activity.date}</p>
          <p>Cod Acces: {activity.accessCode}</p>
        </div>
      ))}

      {isModalOpen ? null : (
        <button
          style={buttonStyle}
          onClick={() => setIsModalOpen(true)}
        >
          Adaugă Activitate
        </button>
      )}

      {isModalOpen && <AddActivityModal />}

      {selectedActivity && (
        <div>
          <h2>Feedback pentru activitatea: {selectedActivity.title}</h2>
          {/* Afișează feedback-ul aici, în funcție de activitatea selectată */}
          <button onClick={closeFeedback}>Închide</button>
        </div>
      )}
    </div>
  );
};

const FeedbackPage = ({ match }) => {
  // Aici vei adăuga logica pentru a prelua feedback-ul din baza de date
  const feedbackData = { /* ... */ };

  return (
    <div>
      <h2>Feedback pentru activitatea: {match.params.title}</h2>
      {/* Afișează feedback-ul în funcție de datele obținute din baza de date */}
    </div>
  );
};

export default TeacherPage;
