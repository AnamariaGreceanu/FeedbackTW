import React, { useState ,useContext} from "react";
import { login } from "../api/api";
import {useNavigate} from "react-router-dom";
// import Cookies from "universal-cookie";

import { RootContext } from "../routes/RootProvider";

function Login() {
    let role;
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    
    const userContext = useContext(RootContext)
    const { setUser, setTypeUser } = userContext

    const navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault()
        const userData = {
            mail,
            password
        }
        try {
            const user = await login(userData, role)
              localStorage.setItem("resetToken", user.resetToken)
            setUser(user)
            setTypeUser(user.typeUser)
            navigate("/")
        } catch (error) {
            console.log(error)
            alert("Credentiale invalide")
        }
    }

    const handleTeacherClick = () => {
         role = 'teacher';
        console.log('Role selected:', role);
    };
    
    const handleStudentClick = () => {
         role = 'student';
        console.log('Role selected:', role);
    };
  

    // const cookies = new Cookies();

    return (
        <div className="column items-center">
        <div className="form-title-class text-white text-center" style={{ border: '2.5px solid $secondary', maxWidth: '400px', marginTop: '40px', width: '100%' }}>
            <div className="text-h6">LOG IN</div>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="mail"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
         />
        <div>
            <button onClick={handleTeacherClick}>Teacher</button>
            <button onClick={handleStudentClick}>Student</button>
                </div>
                <div>
                <button type="submit">Login</button>
                <button onClick={() => navigate('/register')} style={{ width: '110%' }}>Register</button>
                </div>
        </form>
      
    </div>
    );
}
export default Login;
