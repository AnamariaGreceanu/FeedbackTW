import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8000/api/';

export async function login(userData, role) {
  try {
    const response = await axios.post(`user/login/${role}`, {
        mail: userData.mail,
        password: userData.password,
      },
    );

    if (response.status === 200) {
      console.log(response)
      localStorage.setItem('JWTToken', response.data.accessToken)
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response.data.user)
      return response.data.user;
    } 
  } catch (err) {
    console.log(err)
  }
}

export async function registerUser(userData) {
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error("incomplete values");
    }
  
    try {
        const response = await axios.post("user/register/", userData,{
            withCredentials: true, 
        });
    
        if (!response.ok) {
            const errorData = await response.json();
          throw new Error(response.data.error || 'Registration failed');
        }
    
        return true; // Registration successful
    } catch (error) {
        throw new Error("Registration failed");
    }
}
export async function getSubjects() { 
const token = localStorage.getItem('JWTToken');

    return await axios.get(
        "subject/",
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
    )
}
export async function getActivitiesBySubject(name, typeOfSubject) {
const token = localStorage.getItem('JWTToken');

    return axios.get(
        `activity/getActivities/${name}/${typeOfSubject}`,
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
    )
}
export async function checkAccessCode(id, code) {
const token = localStorage.getItem('JWTToken');

  try {
    const response = await axios.post(`activity/checkAccesCode/${id}`, {
        accessCode: code,
      },{headers: {
        Authorization: `Bearer ${token}`,
      }}
    );

    if (response.status === 200) {
      return response;
    } 
  } catch (err) {
    console.log(err)
  }
}

export async function postFeedback(feedbackData, activityId) {
const token = localStorage.getItem('JWTToken');
const user = localStorage.getItem('user');

  console.log("useru",user)
    try {
      const response = await axios.post(`feedback/addFeedback/${activityId}`, {
        countSmiley:feedbackData.countSmiley,
        countFrowny:feedbackData.countFrowny,
        countSurprised:feedbackData.countSurprised,
        countConfused: feedbackData.countConfused,
        activityId: activityId,
      },
      {headers: {
        Authorization: `Bearer ${token}`,
      }}
      );
  
      if (response.status === 201) {
        return response
      } 
    } catch (err) {
      console.log(err)
    }
}
export async function getFeedbackByActivity(activityId) {
const token = localStorage.getItem('JWTToken');

  return axios.get(
      `feedback/getFeedbacks/${activityId}`,
      {headers: {
        Authorization: `Bearer ${token}`,
      }}
  )
}

// // ----------REFAC TRY ACCESS
// export async function handleAccess(currentActivity) {
//     try {
//         // Perform the API request to check the access code
//         const response = await axios.post(
//         //   `/tryAccessCode/${currentActivity.activityId}`,
//           `/feedback/tryCode/${currentActivity.activityId}`,
//           { accessCode },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             //   Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
//             },
//           }
//         );
    
//         if (response.status === 200) {
//           // Access code is valid, you can proceed with your logic
//           console.log("Access code is valid!");
//         } else {
//           // Access code is invalid, handle the error
//           console.error("Access code is invalid!");
//         }
//       } catch (error) {
//         console.error("Error checking access code:", error);
//       }
// }

  
