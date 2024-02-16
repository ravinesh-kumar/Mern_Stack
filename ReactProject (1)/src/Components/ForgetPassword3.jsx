import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Forgetpassword3() {
  let [data, setData] = useState({
    password: "",
    cpassword: "",
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

    if(data.password===data.cpassword){
      let response = await fetch("/api/user/forget-password-3", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("password-reset-username"),
          password:data.password
        }),
      });
      response = await response.json();
      if (response.status === 200) {
        localStorage.removeItem("password-reset-username")
        navigate("/login");
      } else {
        setShow(true);
        setMessage(response.message);
      }
    }
    else{
      setShow(true);
      setMessage("Password doesnot match")
    }
  }
  useEffect(()=>{
    if(!localStorage.getItem("password-reset-username")){
      navigate("/login")
    }
  },[])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="w-75 m-auto">
          <h5 className="text-center bg-primary p-2 text-light">
            <span className="text-warning fs-3">Enter Password</span>
          </h5>

          <form onSubmit={postData}>
            <div className="mb-3">
              <label>password</label>
              <input
                type="text"
                name="password"
                onChange={getInputData}
                placeholder="Password"
                className="form-control"
              />

              {show ? (
                <p className="text-danger text-center p-2">{message}</p>
              ) : (
                ""
              )}
              <label>Confirm password</label>
              <input
                type="text"
                name="cpassword"
                onChange={getInputData}
                placeholder="Confirm Password"
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
                {/* <Link to="/login" className="btn btn-success">
                  Login
                </Link> */}
                <button type="submit" className="btn btn-success">
                  Submit
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
