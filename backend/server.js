//EXPRESS
const express = require("express");
const app = express();
app.use(express.static("public"));
const cors = require("cors");
app.use(cors({}));

//ENV
require("dotenv").config();

//ROUTER
const router = express.Router();

//BODY PARSER
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// sql parser
const { Parser } = require("node-sql-parser");
const parser = new Parser();
// const ast = parser.astify("SELECT * FROM t");

//ERROR HANDLER
const { errorHandler } = require("./middleware/errMW");
app.use(errorHandler);

//POSTGRESQL CONNECTION
const info = {
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

const { Client } = require("pg");
const client = new Client(info);
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

//DENEME
app.get("/", (request, response) => {
  client.query(`SELECT * FROM "UserInfos" WHERE "username" = 'aea555'`, (err, res) => {
    if (err) throw err;
    response.send(res.rows[0]);
  });
});

app.post("/user/edit-info/", (request, response) => {
  let { weight, age, height } = request.body;
  if (weight && age && height) {
    weight = Number(weight);
    age = Number(age);
    height = Number(height);
    if (
      typeof weight === "number" &&
      typeof age === "number" &&
      typeof height === "number"
    ) {
      console.log(typeof weight);
      console.log(weight, age, height);
      client.query(
        `UPDATE "UserInfos" SET "weight" = ${weight}, "height" = ${height}, "age" = ${age} WHERE "username" = 'aea555'`,
        (err, res) => {
          if (err) throw err;
          response.send("Success!");
        }
      );
    } else {
      console.log("Update operation failed1");
      response.send(400);
    }
  } else {
    console.log("Update operation failed2");
    response.send(400);
  }
});

app.get("/user/appointments", (request, response) => {
  client.query(
    `SELECT * FROM "UserAppointments" WHERE "username" = 'aea555'`,
    (err, res) => {
      if (err) throw err;
      response.send(res.rows);
    }
  );
});

app.post("/appointmentbyid", (request, response) => {
  let { id } = request.body;
  if (id) {
    client.query(
      `SELECT * FROM "UserAppointments" WHERE "appointment_id" = ${id}`,
      (err, res) => {
        if (err) throw err;
        response.send(res.rows);
      }
    );
  }
});

app.get("/doctors", (request, response) => {
  client.query(
    `SELECT "doctor_id", "doctor_name", "doctor_surname", "department_name" FROM "Doctors"`,
    (err, res) => {
      if (err) throw err;
      response.send(res.rows);
    }
  );
});

app.get("/hospitals", (request, response) => {
  client.query(`SELECT "hospital_name" FROM "Hospitals"`, (err, res) => {
    if (err) throw err;
    response.send(res.rows);
  });
});

app.get("/departments", (request, response) => {
  client.query(`SELECT "department_name" FROM "Departments"`, (err, res) => {
    if (err) throw err;
    response.send(res.rows);
  });
});

app.delete("/appointments", (request, response) => {
  let { id } = request.body;
  if (id) {
    client.query(
      `DELETE FROM "UserAppointments" WHERE "appointment_id" = ${id}`,
      (err, res) => {
        if (err) throw err;
        response.send("Deletion Successful");
      }
    );
  } else {
    throw Error("id is undefined!");
  }
});

app.put("/appointments", (request, response) => {
  let { id, date, hour, doctor, hospital, department } = request.body;
  if (id && date && hour && doctor && hospital && department) {
    client.query(
      `UPDATE "UserAppointments" SET "appointment_date" = '${date}', "appointment_hour" = '${hour}', "doctor_id" = ${doctor}, "doctor_name" = getdoctorname(${doctor}), "doctor_surname" = getdoctorsurname(${doctor}), "hospital_name" = '${hospital}', "department_name" = '${department}'  WHERE "appointment_id" = ${id};`,
      (err, res) => {
        if (err) throw err;
        response.send("Update Successful");
      }
    );
  } else {
    throw Error("some fields are undefined!");
  }
});

app.post("/appointments", (request, response) => {
  let { date, hour, department, hospital, doctor } = request.body;
  if (date && hour && doctor && hospital && department) {
    client.query(
      `SELECT create_appointment('${date}', '${hour}'); INSERT INTO "UserAppointments" ("appointment_id", "appointment_date", "appointment_hour", "username", "doctor_id", "doctor_name", "doctor_surname", "hospital_name", "department_name") VALUES (create_appointment_id(), '${date}','${hour}', 'aea555', ${doctor}, getdoctorname(${doctor}), getdoctorsurname(${doctor}), '${hospital}', '${department}');`,
      (err, res) => {
        if (err) throw err;
        response.send("Insertion Successful!");
      }
    );
  } else {
    throw Error("some fields are undefined!");
  }
});

app.get("/prescriptions", (request, response) => {
  client.query(
    `SELECT "UserPrescriptions"."prescription_id", "drug_name" FROM "UserPrescriptions" INNER JOIN "Prescriptions" ON "UserPrescriptions"."prescription_id" = "Prescriptions"."prescription_id" WHERE "username" = 'aea555';`,
    (err, res) => {
      if (err) throw err;
      response.send(res.rows);
    }
  );
});

//CONNECT TO SERVER
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
