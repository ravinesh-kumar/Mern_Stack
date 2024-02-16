import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Forgetpassword2() {
  let [data, setData] = useState({
    otp: "",
  });
  let [show, setShow] = useState(false);
  let [message, setMessage] = useState("");
  let navigate = useNavigate();
  function getInputData(e) {
    var { name, value } = e.target;
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  async function postData(e) {
    e.preventDefault();

    let response = await fetch("/api/user/forget-password-2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("password-reset-username"),
        otp: data.otp,
      }),
    });
    response = await response.json();
    if (response.status === 200) {
      navigate("/forget-password-3");
    } else {
      setShow(true);
      setMessage("Invalid OTP");
    }
  }
  useEffect(()=>{
    if(!localStorage.getItem("password-reset-username")){
      navigate("/forget-password-1")
    }
  },[])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="w-75 m-auto">
          <h5 className="text-center bg-primary p-2 text-light">
            <span className="text-warning fs-3">OTP</span>
          </h5>

          <form onSubmit={postData}>
            <div className="mb-3">
              <label>OTP</label>
              <input
                type="text"
                name="otp"
                onChange={getInputData}
                placeholder="User Name"
                className="form-control"
              />

              {show ? (
                <p className="text-danger text-center p-2">{message}</p>
              ) : (
                ""
              )}
            </div>
            {/* <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={getInputData}
                placeholder="Password"
                className="form-control"
              />
            </div> */}
            <div className="mb-3">
              <div className="btn-group w-100">
                <Link to="/login" className="btn btn-success">
                  Login
                </Link>
                <button type="submit" className="btn btn-primary">
                  Send OTP
                </button>
              </div>
              {/* <Link to="#">Forget Password</Link> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
