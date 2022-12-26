import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";

import UserInfos from "../Partials/UserInfos";
import LinkList from "../Partials/LinkList";

function Home() {
  const [datas, setDatas] = useState("");

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
    <div className="home row  mt-5">
      <div className="col-sm-6">
        <UserInfos
          name={datas.user_name + " " + datas.user_surname}
          weight={datas.weight}
          height={datas.height}
          age={datas.age}
          bmi={parseInt(datas.bmi * 100) / 100}
        />
      </div>
      <div className="col-sm-6">
        <LinkList />
      </div>
    </div>
  );
}
export default Home;
