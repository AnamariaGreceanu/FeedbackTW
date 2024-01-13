import React, { useState } from 'react';

const TeacherPage = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveActivity = (activity) => {
    setActivities([...activities, activity]);
    setIsModalOpen(false); // Închide modalul după salvare
  };

  const AddActivityModal = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [accessCode, setAccessCode] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      handleSaveActivity({ date, time, accessCode });
    };

    return (
      <div className="modal" style={{ display: isModalOpen ? 'block' : 'none' }}>
        <form onSubmit={handleSubmit}>
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
      <h1>Pagina Profesorului</h1>

      {activities.map((activity, index) => (
        <div key={index}>
          <p>Ora: {activity.time}</p>
          <p>Data: {activity.date}</p>
          <p>Cod Acces: {activity.accessCode}</p>
          <button onClick={() => setIsModalOpen(true)}>Adaugă Activitate</button>
        </div>
      ))}

      <button onClick={() => setIsModalOpen(true)}>Adaugă Activitate</button>

      {isModalOpen && <AddActivityModal />}
    </div>
  );
};

export default TeacherPage;
