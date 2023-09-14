import Calendar from "./components/Calendar/Calendar";
import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from "./pages/Authentication/Authentication";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import DayPage from "./pages/DayPage/DayPage";
import AddTask from "./pages/AddTask/AddTask";


function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path='/calendar' element={<Calendar />} />
                  <Route path='/' element={<Authentication />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/registration' element={<Registration />} />
                  <Route path='/dayPage' element={<DayPage />} />
                  <Route path='/addTask' element={<AddTask />} />
              </Routes>
          </div>
      </Router>

  );
}

export default App;
