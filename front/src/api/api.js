import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8081/api/';

export async function login(userData, role) {
    let typeUser=role
    const response = await axios(`user/login/${role}`, {
        method: "post",
        withCredentials: true,
        data: {
          mail: userData.mail,
          password: userData.password,
        },
    });
    if (response.status === 200) {
        localStorage.setItem('JWTToken', response.data.access_token)
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data.user;
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
    return axios.get(
        "subject/",
        { "Content-Type": "application/json" }
    )
}
export async function getActivitiesBySubject(name, typeOfSubject) {
    return axios.get(
        `/getActivities/${name}/${typeOfSubject}`,
        { "Content-Type": "application/json" }
    )
}

// ----------REFAC TRY ACCESS
export async function handleAccess(currentActivity) {
    try {
        // Perform the API request to check the access code
        const response = await axios.post(
        //   `/tryAccessCode/${currentActivity.activityId}`,
          `/feedback/tryCode/${currentActivity.activityId}`,
          { accessCode },
          {
            headers: {
              "Content-Type": "application/json",
            //   Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
            },
          }
        );
    
        if (response.status === 200) {
          // Access code is valid, you can proceed with your logic
          console.log("Access code is valid!");
        } else {
          // Access code is invalid, handle the error
          console.error("Access code is invalid!");
        }
      } catch (error) {
        console.error("Error checking access code:", error);
      }
}

  
