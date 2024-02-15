import React, { useState, useEffect, useContext } from 'react';
import { getSubjects,getActivitiesBySubject,addActivity,getFeedbackByActivity } from "../api/api";
import { RootContext } from "../routes/RootProvider";
import { useNavigate } from "react-router-dom"; 

const TeacherPage = () => {
  const [subjects, setSubjects] = useState([])
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  
  const navigate = useNavigate();
  const { user,setUser,setTypeUser } = useContext(RootContext)
  
  function logout() {
    localStorage.removeItem('JWTToken');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
  
    setUser(null);
    setTypeUser(null);
    navigate('/login');
  }

  const handleSaveActivity = async (activity) => {
    try {
      const response = await addActivity(activity,selectedSubject.subjectId);
      const updatedActivitiesResponse = await getActivitiesBySubject(selectedSubject.name, selectedSubject.typeOfSubject);
      if (updatedActivitiesResponse.status === 200) {
        setActivities(updatedActivitiesResponse.data);
      }
      setIsModalOpen(false);
      setSelectedActivity(null);
      setFeedbackData(null);
    } catch (error) {
      console.error('Failed to add activity:', error.message);
    }
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedActivity(null); // Adaugă această linie pentru a reseta activitatea selectată
    setFeedbackData(null);
    console.log(selectedSubject)// Și această linie pentru a reseta feedback-ul
  };

  useEffect(() => {
    getSubjects()
      .then((response) => {
        if (response.status === 200) {
            const subjectsByTeacher = response.data.filter(subject => subject.teacherId == user.userId);
            setSubjects(subjectsByTeacher);
            
          }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      getActivitiesBySubject(selectedSubject.name, selectedSubject.typeOfSubject)
        .then((response) => {
          if (response.status === 200) {
            setActivities(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedSubject]);

  const SubjectsList = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Select Your Subject
          <div className="logout-button" style={{ alignItems: 'auto' }}>
        {user && (
          <button onClick={logout}>Logout</button>
        )}
      </div>
        </h1>
        <ul>
          {subjects.map((subject) => (
            <li key={subject.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedSubject(subject)}>
              {subject.name} - {subject.typeOfSubject}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!selectedSubject) {
    return <SubjectsList />;
  }

  const handleActivityClick = async (activity) => {
    // Aici deschidem pagina de feedback pentru activitatea selectată
    setSelectedActivity(activity);
    try {
      const feedbackResponse = await getFeedbackByActivity(activity.activityId);

      console.log("feedback by activity",feedbackResponse)
      if (feedbackResponse.status === 200) {
        setFeedbackData(feedbackResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const AddActivityModal = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [accessCode, setAccessCode] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      const activityData = {
        name: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        accessCode:accessCode
      }
      handleSaveActivity(activityData);
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
          <label htmlFor="title">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label htmlFor="date">Set start data:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <label htmlFor="date">Set end data:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
  const formattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleString(undefined, options);
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Teacher's Page</h1>
      <a
        style={{
          position: 'absolute',
          top: '30px', 
          left: '10px', 
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
        <h2 style={{textAlign: 'center'}}>Subject: {`${selectedSubject.name} - ${selectedSubject.typeOfSubject}`}</h2>
      {(activities || []).map((activity, index) => (
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
          <p>Titlu: {activity.name}</p>
          <p>description: {activity.description}</p>
          <p>start date: {formattedDate(activity.startDate)}</p>
          <p>end date: {formattedDate(activity.endDate)}</p>
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

      {selectedActivity&&feedbackData &&feedbackData.length > 0 ? (
        
      <div>
        { <h2>Feedback for activity: {selectedActivity.name}</h2> }
            {feedbackData.map((feedback, index) => (
              <div key={index}>
                <p>countSmiley: {feedback.countSmiley}</p>
                <p>countFrowny: {feedback.countFrowny}</p>
                <p>countConfused: {feedback.countConfused}</p>
                <p>countSurprised: {feedback.countSurprised}</p>
                <p>createdAt: {feedback.createdAt}</p>
              </div>
            ))}
          </div>
          ) : (
            selectedActivity ? (
              <p>No feedback available for this activity.</p>
            ) : null
          )}
    </div>
  );
};

export default TeacherPage;
