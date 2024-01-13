import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { RootContext } from "./RootProvider";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Teacher from "../pages/Teacher"
import Student from "../pages/Student"

function Paths() {
    const rootContext = useContext(RootContext);

    const user = rootContext.user;
    const userType = rootContext.typeUser;

    if (user) {
        return (
            <>
                <Router>
                <Routes>
                    {userType === 'teacher' && <Route path="/teacher/*" element={<Teacher />} />}
                    {/* {userType === 'student' && <Route path="/student/*" element={<Student />} />} */}
                </Routes>
                </Router>
            </>
        )
    }else {
        return (
          <>
            <Router>
              <Routes>
              <Route path="/student" element={<Student />} ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
              </Routes>
            </Router>
          </>
        );
      }
}
export default Paths;