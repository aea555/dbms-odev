import axios from "axios";
import qs from "qs";
import { useState, useEffect } from "react";

function AddAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);

  const getDoctors = async () => {
    let config = {
      method: "get",
      url: "http://localhost:4000/doctors",
      headers: {},
    };
    const res = await axios(config);
    setDoctors(res.data);
  };

  const getHospitals = async () => {
    let config = {
      method: "get",
      url: "http://localhost:4000/hospitals",
      headers: {},
    };
    const res = await axios(config);
    setHospitals(res.data);
  };

  const getDepartments = async () => {
    let config = {
      method: "get",
      url: "http://localhost:4000/departments",
      headers: {},
    };
    const res = await axios(config);
    setDepartments(res.data);
  };

  const convertDate = (str) => {
    let idx = str.indexOf("T");
    let date = str.substring(0, idx);
    return date;
  };

  const submitData = async (date, hour, doctor, hospital, department) => {
    let data = {
      date: date,
      hour: hour,
      doctor: doctor,
      hospital: hospital,
      department: department,
    };
    console.log(data);
    let config = {
      method: "post",
      url: "http://localhost:4000/appointments/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    const res = await axios(config);
    window.location.reload();
  };

  useEffect(() => {
    getDoctors();
    getHospitals();
    getDepartments();
  }, []);

  return (
    <form className="mt-5 container-sm">
      <label>Date</label>
      <br />
      <input type="date" id="apmt_date" name="apmt_date"></input>
      <br />
      <label>Hour</label>
      <br />
      <input type="time" id="apmt_time" name="apmt_time"></input>
      <br />
      <label htmlFor="apmt_date">Hospital</label>
      <br />
      <select id="hospital" name="hospital" required>
        {hospitals.map((hospital) => {
          return (
            <option value={hospital.hospital_name} onSelect>
              {hospital.hospital_name}
            </option>
          );
        })}
      </select>
      <br />
      <label htmlFor="apmt_date">Department</label>
      <br />
      <select id="department" name="department" required>
        {departments.map((department) => {
          return (
            <option value={department.department_name} onSelect>
              {department.department_name}
            </option>
          );
        })}
      </select>
      <br />
      <label>Doctor Name</label>
      <br />
      <select id="doctors" name="doctors" required>
        {doctors.map((doctor) => {
          return (
            <option value={doctor.doctor_id} onSelect>
              {doctor.doctor_name +
                " " +
                doctor.doctor_surname +
                "\n" +
                "(" +
                doctor.department_name +
                ")"}
            </option>
          );
        })}
      </select>
      <br />
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          submitData(
            document.getElementById("apmt_date").value,
            document.getElementById("apmt_time").value,
            document.getElementById("doctors").value,
            document.getElementById("hospital").value,
            document.getElementById("department").value
          );
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default AddAppointment;
