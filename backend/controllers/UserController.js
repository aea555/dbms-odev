function getUser(client) {
  client.query("SELECT * FROM USER", (err, res) => {
    if (err) throw err;
    client.end();
    return res.rows;
  });
}

module.exports = { getUser };
