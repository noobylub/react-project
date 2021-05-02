import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import "./authenticate.css";
import {useHistory} from "react-router-dom";
import  {ProviderContext} from "../../../../App";
import useHttpHook from "../../../../hook/useHttpHook";
const Authenticate = () => {
  const {loggedIn, logIn, userID} = useContext(ProviderContext);
  const { error, loading, sendBackEnd, clearError } = useHttpHook();
  const history = useHistory();
  const Thissignal = new AbortController();
  const formik = useFormik({
    initialValues: {
      Name: "",
      Password: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await sendBackEnd(
          "http://localhost:3001/users/login",
          "POST",
          JSON.stringify({
            name: values.Name,
            password: values.Password,
          }),
          {
            "Content-Type": "application/json",
          },
          Thissignal.signal
        );
        console.log(data)
        logIn(data.user._id);
        history.push("/")
      } catch (err) {}
    },
  });
  console.log(loggedIn, userID);
 


  return (
    <div className="Authenticate">
      <div className="content">
        {loading && (

          <h1>Loading</h1>
        )}
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="data">
            <label htmlFor="name" className="NameClass">
              <h3>Name</h3>
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.Name}
              name="Name"
              className="input"
            />
          </div>
          <div className="data">
            <label htmlFor="password" className="PassWordClass">
              <h3>Password</h3>
            </label>
            <input
              type="text"
              className="input"
              onChange={formik.handleChange}
              name="Password"
            />
          </div>

          {error ? (
            <div className="error">
              <h1>Something wrong</h1>
              <h1>{error}</h1>
              <button onClick={clearError}><h5>Press to clear</h5></button>
            </div>
          ) : (
            <button type="submit" className={`logInSubmit `}>
              <h2>Submit</h2>
            </button>
          )}
          {}
        </form>
        <NavLink to="/signup" className="signup">
          <button>
            <h5>Sign Up</h5>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Authenticate;
