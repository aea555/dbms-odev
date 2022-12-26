import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Partials/Header";
import Home from "./Components/Pages/Home";
import Appointments from "./Components/Pages/Appointments";
import EditUserInfo from "./Components/Pages/EditUserInfo";
import AddAppointment from "./Components/Pages/AddAppointment";
import EditAppointment from "./Components/Pages/EditAppointment";
import Prescriptions from "./Components/Pages/Prescriptions";
function App() {
  return (
    <>
      <Header />
      <div id="content">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/appointments" element={<Appointments />} />
            <Route path="/user/prescriptions" element={<Home />} />
            <Route path="/user/edit-info" element={<EditUserInfo />} />
            <Route path="/user/appointments/new" element={<AddAppointment />} />
            <Route path="/user/appointments/update" element={<EditAppointment />} />
            <Route exact path="/user/prescriptions/" element={<Prescriptions />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
