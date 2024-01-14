import React, { useState, useEffect } from 'react';

const TeacherPage = () => {
  const [activitiesBySubject, setActivitiesBySubject] = useState({});
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);

  const fetchFeedbackData = (title) => {
    // Simulează o cerere către baza de date pentru feedback
    // Înlocuiește cu metoda reală de obținere a feedback-ului
    const simulatedFeedbackData = {
      date: '2022-03-15',
      text: 'Feedback-ul pentru activitatea X este pozitiv.',
    };
    setFeedbackData(simulatedFeedbackData);
  };

  const handleSaveActivity = (activity) => {
    const updatedActivities = [...(activitiesBySubject[selectedSubject] || []), activity];
    setActivitiesBySubject({
      ...activitiesBySubject, [selectedSubject]: updatedActivities,
    });
    setIsModalOpen(false); // Închide modalul după salvare
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedActivity(null); // Adaugă această linie pentru a reseta activitatea selectată
    setFeedbackData(null); // Și această linie pentru a reseta feedback-ul
  };

  useEffect(() => {
    // Verificăm dacă o materie este selectată și obținem feedback-ul pentru acea materie
    if (selectedSubject && selectedActivity) {
      fetchFeedbackData(selectedActivity.title); // Poți înlocui cu metoda reală de obținere a feedback-ului
    }else{
      setFeedbackData(null);
    }
  }, [selectedActivity]);

  const SubjectsList = () => {
    const subjects = ['Multimedia', 'TW', 'Android', 'DSAD'];

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Select Your Subject</h1>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index} style={{ cursor: 'pointer' }} onClick={() => setSelectedSubject(subject)}>
              {subject}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!selectedSubject) {
    return <SubjectsList />;
  }

  const handleActivityClick = (activity) => {
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
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="time">Set hour:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label htmlFor="date">Set data:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label htmlFor="accessCode">Set acces code:</label>
          <input
            type="text"
            id="accessCode"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            required
          />

          <button type="submit">Save</button>
        </form>
        <button onClick={() => setIsModalOpen(false)}>Închide</button>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Teacher's Page</h1>
      <a
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#007bff',
          color: '#ffffff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
        href="#"
        onClick={() => handleSubjectSelect(null)}>Back to Subjects</a> {/* Apelez functia de revenire la materii  */}
        <h2 style={{textAlign: 'center'}}>Subject: {selectedSubject}</h2>
      {(activitiesBySubject[selectedSubject] || []).map((activity, index) => (
        <div
          key={index}
          style={{
            border: '1px solid',
            borderRadius: '8px',
            padding: '10px',
            marginTop: '10px',
            cursor: 'pointer',
          }}
          onClick={() => handleActivityClick(activity)}>
          <p>Titlu: {activity.title}</p>
          <p>Ora: {activity.time}</p>
          <p>Data: {activity.date}</p>
          <p>Cod Acces: {activity.accessCode}</p>
        </div>
      ))}

      {isModalOpen ? null : (
        <button
          style={{
            backgroundColor: '#007bff',
            color: '#ffffff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
          onClick={() => setIsModalOpen(true)}>Add Activity</button>
      )}

      {isModalOpen && <AddActivityModal />}

      {selectedActivity && (
        <div>
          <h2>Feedback for activity: {selectedActivity.title}</h2>
          <p>Feedback date: {feedbackData ? feedbackData.date : 'Loading ...'}</p>
          <p>Feedback: {feedbackData ? feedbackData.text: 'Loading...'}</p>
        </div>
      )}
    </div>
  );
};
export default TeacherPage;