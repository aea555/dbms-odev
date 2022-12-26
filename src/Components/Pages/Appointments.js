import Appointment from "../Partials/Appointment";
import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";

function Appointments() {
  const [datas, setDatas] = useState([]);

  const getAppointments = async () => {
    let data = qs.stringify({});
    let config = {
      method: "get",
      url: "http://localhost:4000/user/appointments",
      headers: {},
      data: data,
    };
    const response = await axios(config);
    const datas = response.data;
    console.log(datas);
    setDatas(datas);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const stuff = datas.map((appointment) => {
    return (
      <Appointment
        id={appointment.appointment_id}
        date={appointment.appointment_date}
        hour={appointment.appointment_hour}
        hospital={appointment.hospital_name}
        department={appointment.department_name}
        doctorid={appointment.doctor_id}
      />
    );
  });
  return (
    <div>
      <a className="mt-2 mb-2" href="appointments/new">
        <i class="fa-solid fa-circle-plus fa-2x"></i> &nbsp; Add New Appointment
      </a>
      {stuff}
    </div>
  );
}

export default Appointments;
