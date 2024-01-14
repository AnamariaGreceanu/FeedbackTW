import React, { useState} from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";

import '../assets/css/pages/Auth.css'

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

        console.log(typeUser)
        const userData = {
            username,lastName,firstName,password,mail,typeUser
        }
        console.log(userData)

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
        <div className="container">
            <div className="form-title-class">
                <div className="text">REGISTER</div>
                <div className="underline"></div>
            </div>
            <div className="handleUser">
                <button className="handle"onClick={handleTeacherClick}>Teacher</button>
                <button className="handle"onClick={handleStudentClick}>Student</button>
            </div>
            { typeUser && (
                <p style={{ textAlign: 'center', color: '#676767' }}>
                    You selected: {typeUser}
                </p>
            )}
            <form onSubmit={onSubmit}>
                <div className="input">
                    <IoPersonCircle />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username *"
                        required
                    />
                </div>
                <div className="input">
                    <MdDriveFileRenameOutline />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="lastName *"
                        required
                    />
                </div>
                <div className="input">
                    <MdDriveFileRenameOutline />
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="firstName *"
                        required
                    />
                </div>
                <div className="input">
                    <IoIosMail />
                    <input
                        type="mail"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="Mail"
                        required
                    />
                </div>
                <div className="input">
                    <IoIosMail />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <div className="register">
                <div> have an account already?</div>
                <div>
                    <button onClick={() => navigate('/login')} style={{ width: '100%' }}>LogIn</button>
                </div>
            </div>
        </div>
    );
}
export default Register;
