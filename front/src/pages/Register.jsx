import React, { useState} from "react";
import { registerUser } from "../api/api";
import {useNavigate} from "react-router-dom";
// import Cookies from "universal-cookie";

function Register() {
    const [username, setUsername] = useState('');
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [typeUser, setTypeUser] = useState(''); 
    
    const navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault()

        const userData = {
            username,lastName,firstName,password,mail,typeUser
        }

        try {
            const user = await registerUser(userData)

            //   localStorage.setItem("resetToken", user.resetToken)
  
            navigate("/login")
        } catch (error) {
            console.error(error)
            alert("Credentiale invalide")
        }
    }

    const handleTeacherClick = () => {
        setTypeUser('teacher');
    };
    
    const handleStudentClick = () => {
        setTypeUser('student');
    };
  
    // const cookies = new Cookies();

    return (
        <div className="column items-center">
        <div className="form-title-class text-white text-center" style={{ border: '2.5px solid $secondary', maxWidth: '400px', marginTop: '40px', width: '100%' }}>
            <div className="text-h6">REGISTER</div>
        </div>
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username *"
                required
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="lastName *"
                required
            />
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="firstName *"
                required
            />
            <input
                type="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Mail"
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
            <button type="submit">Register</button>
            <button onClick={() => navigate('/login')} style={{ width: '110%' }}>LogIn</button>
            </div>
        </form>
        
    </div>
    );
}
export default Register;