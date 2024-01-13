import React, { useState ,useContext} from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
// import Cookies from "universal-cookie";
import '../assets/css/pages/Auth.css'
import { RootContext } from "../routes/RootProvider";

function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    
    const userContext = useContext(RootContext)
    const { setUser, setTypeUser } = userContext
    const [role, setRole] = useState("");
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
        setRole('teacher');
        console.log('Role selected:', role);
    };
    
    const handleStudentClick = () => {
        setRole('student'); 
        console.log('Role selected:', role);
    };
  

    // const cookies = new Cookies();

    return (
        <div className="container">
            <div className="form-title-class">
                <div className="text">LOG IN</div>
                <div className="underline"></div>
            </div>
            <div className="handleUser">
                <button className="handle"onClick={handleTeacherClick}>Teacher</button>
                <button className="handle"onClick={handleStudentClick}>Student</button>
            </div>
            { role && (
                <p style={{ textAlign: 'center', color: '#676767' }}>
                    You selected: {role}
                </p>
            )}
            <form onSubmit={onSubmit}>
                <div className="input">
                    <IoIosMail />
                    <input
                        type="mail"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="mail"
                        required />
                </div>
                <div className="input">
                    <RiLockPasswordLine />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="register">
                <div> dont have an account?</div>
            <div>
                <button onClick={() => navigate('/register')} >Register</button>
            </div>
        </div>
    </div>
    );
}
export default Login;
