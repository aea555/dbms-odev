import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";

function Appointment(props) {
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

  const deleteAppointment = async (id) => {
    let data = {
      id: id,
    };
    let config = {
      method: "delete",
      url: "http://localhost:4000/appointments/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    const res = await axios(config);
    window.location.reload();
  };

  const updateAppointment = async (id, date, hour, doctor, hospital, department) => {
    let data = {
      id: id,
      date: date,
      hour: hour,
      doctor: doctor,
      hospital: hospital,
      department: department,
    };
    let config = {
      method: "put",
      url: "http://localhost:4000/appointments/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    console.log(id, date, hour, doctor, hospital, department);
    const res = await axios(config);
    console.log(res);
    window.location.reload();
  };

  useEffect(() => {
    getDoctors();
    getHospitals();
    getDepartments();
  }, []);

  return (
    <div className="apmts row justify-content-start">
      <div className="apmt col-sm-3 border p-5 align-items-center">
        <label htmlFor="apmt_date">Date</label>
        <br />
        <input
          disabled
          type="date"
          id="apmt_date"
          name="apmt_date"
          value={convertDate(props.date)}
        ></input>
        <br />
        <label htmlFor="apmt_date">Hour</label>
        <br />
        <input
          disabled
          type="time"
          id="apmt_time"
          name="apmt_time"
          value={props.hour}
        ></input>
        <br />
        <label htmlFor="apmt_date">Hospital</label>
        <br />
        <select disabled id="hospital" name="hospital" required>
          {hospitals.map((hospital) => {
            return hospital.hospital_name === props.hospital ? (
              <option value={hospital.hospital_name} selected>
                {hospital.hospital_name}
              </option>
            ) : (
              <option value={hospital.hospital_name}>{hospital.hospital_name}</option>
            );
          })}
        </select>
        <br />
        <label htmlFor="apmt_date">Department</label>
        <br />
        <select id="department" name="department" required disabled>
          {departments.map((department) => {
            return department.department_name === props.department ? (
              <option value={department.department_name} selected>
                {department.department_name}
              </option>
            ) : (
              <option value={department.department_name}>
                {department.department_name}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="apmt_date">Doctor Name</label>
        <br />
        <select id="doctors" name="doctors" required disabled>
          {doctors.map((doctor) => {
            return doctor.doctor_id === props.doctorid ? (
              <option value={doctor.doctor_id} selected>
                {doctor.doctor_name +
                  " " +
                  doctor.doctor_surname +
                  "\n" +
                  "(" +
                  doctor.department_name +
                  ")"}
              </option>
            ) : (
              <option value={doctor.doctor_id}>
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
        <div className="mt-3">
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              deleteAppointment(props.id);
            }}
          >
            Delete
          </button>
          &nbsp;
          <a className="btn btn-warning" href={`appointments/update?id=${props.id}`}>
            Update
          </a>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
