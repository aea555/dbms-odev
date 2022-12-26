const info = {
  user: "postgres",
  host: "localhost",
  database: "HIS",
  password: "123",
  port: 5432,
};

const { Client } = require("pg");
const client = new Client(info);

const Connect = () => {
  client.connect((err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      console.log("connected");
    }
  });
};

const putQuery = (q) => {
  client.query(q, (err, res) => {
    if (err) throw err;
    client.end();
    return res;
  });
};

module.exports = { Client, Connect, putQuery };
