import React, { useEffect, useState,useContext } from "react";
import { getSubjects,getActivitiesBySubject,checkAccessCode,getFeedbackByActivity } from "../api/api";
import '../assets/css/pages/Student.css'
import { useNavigate } from "react-router-dom"; 
import Button from '@mui/material/Button';
import AccessForm from '../components/AccessForm'
import FeedbackModal from '../components/FeedbackModal';
import { RootContext } from "../routes/RootProvider";


function Student() {
  const [subjects, setSubjects] = useState([])
  const [activities, setActivities] = useState([])
  const [currentSubject, setCurrentSubject] = useState({})
  const [codeFields, setCodeFields]=useState(false)
  const [feedbackData, setFeedbackData] = useState({});
  const [modalOpen, setModalOpen] = React.useState(false);

  const { user,setUser,setTypeUser } = useContext(RootContext)
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('JWTToken');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
  
    setUser(null);
    setTypeUser(null);
    navigate('/login');
  }

  useEffect(() => {
      getSubjects()
        .then((response) => {
            if (response.status === 200) {
                setSubjects(response.data);
                console.log("subjects",response.data)
            }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  useEffect(() => {
    setActivities([])
    console.log("currr",currentSubject.subjectId)
      if (currentSubject.subjectId) {
          getActivitiesBySubject(currentSubject.name, currentSubject.typeOfSubject)
            .then((response) => {
              console.log(response.data)

              if (response.status === 200) {
                setActivities(response.data);
                // console.log(activities[0])
              }
              else {
               setActivities([])
                
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
  }, [currentSubject])
  useEffect(() => {
    console.log("Activ[0]",activities[0]); // This will reflect the updated state
  }, [activities]);
  // useEffect(() => {
  //   if (activities.length > 0) {
  //     console.log(activities[0].activityId);
  //     setActivities(activities)
  //     // Other actions related to the updated activities state
  //   }
  // }, [activities]);

  useEffect(() => {
    setFeedbackData([]); 
    if (currentSubject.subjectId && activities.length > 0) {
        const selectedActivity = activities[0];
        getFeedbackByActivity(selectedActivity.activityId)
          .then((response) => {
            console.log("Response from getFeedbackByActivity:", response);

              if (response.status === 200) {
                console.log("ff activity",response.data)
                const filteredFeedbacks = response.data.filter(feedback => feedback.studentId == user.userId);
                console.log("ff user",filteredFeedbacks)
                  setFeedbackData(filteredFeedbacks);
            }
            else{ setFeedbackData([]); }
            })
            .catch((error) => {
                console.error(error);
            });
    }
  }, [ activities]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const togglePop=(activityId) => {
    setCodeFields((prevCodeFields) => ({
        ...prevCodeFields,
        [activityId]: !prevCodeFields[activityId],
    }));
  }
  
  const changeCurrentSubject = (id) => {
      const index = subjects.findIndex((el) => el.subjectId === id)
      const object=subjects[index]
    setCurrentSubject(object)
    console.log("este acum ales",object)
  }

  const handleFeedback = async (activityId, enteredCode) => {
      try {
        const response = await checkAccessCode(activityId, enteredCode);
        if (response.status === 200 && response.data) {
          navigate(`/feedback/${activityId}`);
        } else {
          console.error("Invalid access code. Please try again.");
        }
      } catch (error) {
        console.error("Error checking access code:", error);
      }
    };

  const handleLogout = () => {
    logout();
  };

  return (
      <div className="page-subjects">
          <h1>Subjects and activities</h1>
          <div className={"main-container"}>
              <div className={"subjectList"}>
                  {subjects.map((el) => {
                      return (<div className={'subject-item'} onClick={() => changeCurrentSubject(el.subjectId)}>
                          <span>Subject: { el.name}</span>
                          <span>{ el.typeOfSubject}</span>
                          <span>teacherId: { el.teacherId}</span>
                      </div>)
                  })}
              </div>
              <div className={'subject-details'}>
                  <div className={'container-activities'}>
                      {activities.map((activity) => (
                          <div key={activity.activityId} className={"activity-item"}>
                          <span>Id:{activity.activityId} Name:{activity.name}</span>
                            <span>Desciption: {activity.description}</span>
                          <span>Is still available: {activity.isActive==true ? 'Yes' : 'No'}</span>
                            <div>
                              <Button onClick={handleOpenModal}>Show feedback</Button>
                              <FeedbackModal
                                open={modalOpen}
                                handleClose={handleCloseModal}
                                feedbackData={feedbackData}
                              />
                            </div>
                            <div>
                              <button
                                onClick={() => togglePop(activity.activityId)}
                                disabled={!activity.isActive}
                              >
                                {activity.isActive ? "Enter the code" : "Activity is not available"}
                              </button>
                              {codeFields[activity.activityId] && activity.isActive ? (
                                <AccessForm
                                  open={codeFields[activity.activityId]}
                                  onClose={() => togglePop(activity.activityId)}
                                  onSubmit={(enteredCode) => handleFeedback(activity.activityId, enteredCode)}
                                  activityId={activity.activityId}
                                />
                              ) : null}
                            </div>
                          </div>
                      ))}
                  </div>
              </div>
      </div>
      {user && (
        <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      </div>
  )
}
export default Student;