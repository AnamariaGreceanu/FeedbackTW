import React, { useEffect, useState } from "react";
import { getSubjects,getActivitiesBySubject,handleAccess } from "../api/api";
import '../assets/css/pages/Student.css'
import { usePopper } from 'react-popper';

import { BiConfused } from "react-icons/bi";
import { FaRegSurprise } from "react-icons/fa";
import { HiOutlineFaceFrown } from "react-icons/hi2";
import { FaRegSmileBeam } from "react-icons/fa";

import AccessForm from '../components/AccessForm'

function Student() {
    const [subjects, setSubjects] = useState([])
    const [activities, setActivities] = useState([])
    const [currentSubject, setCurrentSubject] = useState({})
    const [accessCode, setAccessCode] = useState("");


    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: "offset", options: { offset: [10, 10] } }],
    });


    useEffect(() => {
        getSubjects()
          .then((response) => {
              if (response.status === 200) {
                  setSubjects(response.data);
                  console.log(response.data)
              }
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

    useEffect(() => {
        if (currentSubject.subjectId) {
            getActivitiesBySubject(currentSubject.name, currentSubject.typeOfSubject)
              .then((response) => {
                if (response.status === 200) {
                  setActivities(response.data);
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
    }, [activities,currentSubject])

    
    const changeCurrentSubject = (id) => {
        const index = subjects.findIndex((el) => el.subjectId === id)
        const object=subjects[index]
        setCurrentSubject(object)
        // const temp = getActivitiesBySubject(object.name, object.typeOfSubject)
        // setActivities(temp)
    }

    const handleFeedback = (activityId) => {
        // Handle feedback for the selected activity
        console.log(`Adding feedback for activity with ID ${activityId}`);
    };
    
    return (
        <div className="page-subjects">
            <h1>Subjects and activities</h1>
            <div className={"main-container"}>
                <div className={"subjectList"}>
                    {subjects.map((el) => {
                        return (<div className={'subject-item'} onClick={() => changeCurrentSubject(el.subjectId)}>
                            <span>{ el.name}</span>
                            <span>{ el.typeOfSubject}</span>
                        </div>)
                    })}
                </div>
                <div className={'subject-details'}>
                    <div className={'container-activities'}>
                        {activities.map((activity) => (
                            <div key={activity.activityId} className={"activity-item"}>
                                <span>{activity.name}</span>
                                <button
                                    ref={setReferenceElement}
                                    // className="absolute bottom-4 right-4 p-2 rounded-l-lg rounded-t-lg bg-blue-700 hover:bg-blue-600 shadow-md hover:shadow-lg text-white"
                                    onClick={() => handleFeedback(activity.activityId)}>
                                    Add Feedback
                                </button>
                                <div
                                    className="bg-white p-2 rounded-md shadow-lg"
                                    ref={setPopperElement}
                                    style={styles.popper}
                                    {...attributes.popper}>
                                    <AccessForm
                                        onSubmit={() => handleAccess(activity)}
                                        onCodeChange={(code) => setAccessCode(code)}
                                    />
               
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )

   
}
export default Student;