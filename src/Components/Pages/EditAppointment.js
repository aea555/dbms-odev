import axios from "axios";
import qs from "qs";
import { useState, useEffect } from "react";

function EditAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [hour, sethour] = useState("");
  const [date, setdate] = useState("");
  const [hospitalst, sethospital] = useState("");
  const [departmentst, setdepartment] = useState("");
  const [doctorst, setdoctor] = useState("");

  const SETID = () => {
    let url = window.location.href;
    let idx = url.indexOf("?id") + 4;
    let id = url.substring(idx, url.length);
    id = parseInt(id);
    return id;
  };

  const getAppointment = async () => {
    const data = qs.stringify({
      id: SETID(),
    });
    const config = {
      method: "post",
      url: "http://localhost:4000/appointmentbyid",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    const res = await axios(config);
    const datas = res.data[0];
    console.log(datas);
    sethour(datas.appointment_hour);
    setdate(convertDate(datas.appointment_date));
    sethospital(datas.hospital_name);
    setdepartment(datas.department_name);
    setdoctor(datas.doctor_id);
  };

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

  const submitData = async () => {
    let data = {
      id: SETID(),
      date: date,
      hour: hour,
      doctor: doctorst,
      hospital: hospitalst,
      department: departmentst,
    };
    console.log(data);
    let config = {
      method: "put",
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
    getAppointment();
    getDoctors();
    getHospitals();
    getDepartments();
  }, []);

  return (
    <>
      <form className="mt-5 container-sm">
        <h3>Update</h3>
        <label>Date</label>
        <br />
        <input
          type="date"
          id="apmt_date"
          name="apmt_date"
          value={date}
          onChange={(e) => {
            setdate(e.target.value);
          }}
        ></input>
        <br />
        <label>Hour</label>
        <br />
        <input
          type="time"
          id="apmt_time"
          name="apmt_time"
          value={hour}
          onChange={(e) => {
            sethour(e.target.value);
          }}
        ></input>
        <br />
        <label htmlFor="apmt_date">Hospital</label>
        <br />
        <select
          id="hospital"
          name="hospital"
          required
          onChange={(e) => {
            sethospital(e.target.value);
          }}
        >
          {hospitals.map((hospital) => {
            return hospital.hospital_name === hospitalst ? (
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
        <select
          id="department"
          name="department"
          required
          onChange={(e) => {
            setdepartment(e.target.value);
          }}
        >
          {departments.map((department) => {
            return department.department_name === departmentst ? (
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
        <label>Doctor Name</label>
        <br />
        <select
          id="doctors"
          name="doctors"
          required
          onChange={(e) => {
            setdoctor(e.target.value);
          }}
        >
          {doctors.map((doctor) => {
            return doctor.doctor_id === doctorst ? (
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
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            submitData();
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default EditAppointment;
