import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";

function EditUserInfo() {
  const [datas, setDatas] = useState("");

  const setUserData = async (w, h, a) => {
    let data = {
      weight: w,
      height: h,
      age: a,
    };
    console.log(w);
    let config = {
      method: "post",
      url: "http://localhost:4000/user/edit-info",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    console.log(config);
    const response = await axios(config);
    window.location.reload();
  };

  const getUserData = async () => {
    let data = qs.stringify({});
    let config = {
      method: "get",
      url: "http://localhost:4000/",
      headers: {},
      data: data,
    };
    const response = await axios(config);
    const datas = response.data;
    console.log(datas);
    setDatas(datas);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="edit-user-info mt-5 container-sm">
      <form>
        <div className="mb-3">
          <label className="form-label">Weight</label>
          <input
            type="number"
            name="weight"
            className="form-control"
            aria-describedby="emailHelp"
            id="weight"
            placeholder={datas.weight}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Height</label>
          <input
            type="number"
            name="height"
            className="form-control"
            id="height"
            placeholder={datas.height}
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label">Age</label>
          <br />
          <input
            type="number"
            name="age"
            id="age"
            className="form-control"
            placeholder={datas.age}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setUserData(
              document.getElementById("weight").value,
              document.getElementById("height").value,
              document.getElementById("age").value
            );
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditUserInfo;
