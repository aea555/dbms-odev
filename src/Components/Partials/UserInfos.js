function UserInfos(props) {
  return (
    <div className="userInfos row justify-content-start">
      <div className="col-sm-3">
        <img className="userImg" src="bospp.webp"></img>
      </div>
      <div className="col-sm-9">
        <h2 className="mb-3">Welcome, {props.name}</h2>
        <div className="infoList">
          <h4 className="mb-3">Your Infos</h4>
          <p>
            <i class="fa-solid fa-ruler fa-2x"></i> &nbsp; Height: {props.height} cm
          </p>
          <p>
            <i class="fa-solid fa-weight-scale fa-2x"></i> &nbsp; Weight: {props.weight}{" "}
            kg
          </p>
          <p>
            <i class="fa-solid fa-percent fa-2x"></i> &nbsp; BMI: {props.bmi}
          </p>
          <p>
            <i class="fa-solid fa-calendar fa-2x"></i> &nbsp; Age: {props.age}
          </p>
          <button className="btn btn-primary">
            <a href="/user/edit-info">Edit Info</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfos;
