import axios from "axios";
import qs from "qs";
import { useState, useEffect } from "react";

function Prescriptions() {
  const [prescriptions, setprescriptions] = useState([]);

  const getPrescriptions = async () => {
    let data = qs.stringify({});
    let config = {
      method: "get",
      url: "http://localhost:4000/prescriptions",
      headers: {},
      data: data,
    };
    const res = await axios(config);
    console.log(res.data);
    setprescriptions(res.data);
  };

  useEffect(() => {
    getPrescriptions();
  }, []);

  return (
    <div className="container-sm mt-5 col-6 row ms-auto me-auto">
      <h3>Your Prescriptions</h3>
      <div className="col-6">
        <label className="mb-3">ID</label>
        {prescriptions.map((thing) => {
          return <p className="border border-1 border-dark">{thing.prescription_id}</p>;
        })}
      </div>
      <div className="col-6">
        <label className="mb-3">Drug</label>
        {prescriptions.map((thing) => {
          return <p className="border border-1 border-dark">{thing.drug_name}</p>;
        })}
      </div>
    </div>
  );
}
export default Prescriptions;
