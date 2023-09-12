import Calendar from "./components/Calendar/Calendar";
import Button from "./components/Buttons/Button";
import React from "react";
import Header from "./components/Header/Header";
import Authentication from "./pages/Authentication/Authentication";
function App() {
  return (
    <div className="App">
        {/*<Authentication/>*/}
        <Header/>
        <Calendar/>
    </div>
  );
}

export default App;
