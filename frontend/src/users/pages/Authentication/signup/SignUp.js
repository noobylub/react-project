import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./SignUp.css";
const SignUp = () => {
  const [imageURL, setImageURL] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMes, seterrorMes] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const formik = useFormik({
    initialValues: {
      Name: "",
      Password: "",
      imageURL: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: values.imageURL,
            name: values.Name,
            password: values.Password,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        console.log(data);
        console.log("sent");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        
        seterrorMes(err.message);
        console.log(err.message);
      }
    },
  });
  const changeDisplay = (image) => {
    setImageURL(image.target.value);
    console.log(imageURL);
  };
  const toggleError = () => {
    seterrorMes("");
  };

  return (
    <div className="entire-content">
      <Modal isOpen={loading} style={customStyles} portalClassName="modal">
        <div className="content">
          <h1>Loading</h1>
          <img
            src="https://i.pinimg.com/236x/8e/e1/d7/8ee1d7b8d6ee8d10526c736da2d117d2--funny-texts-gag.jpg"
            alt=""
          />
        </div>
      </Modal>

      {errorMes.length > 0 && (
        <div className="error">
          <div className="content">
            <h1>Something went Wrong</h1>
            <p>{errorMes}</p>
          </div>
          <button onClick={toggleError}><h4>Go away</h4></button>
        </div>
      )}
      <div className="form-part">
        <div className="previewIMG">
          <h5>Preview your Image</h5>
          <label htmlFor="ImageURL">
            <p>Paste URL link below</p>
          </label>
          <input
            type="text"
            name="ImageURL"
            onChange={changeDisplay}
            value={imageURL}
          />
          <img src={imageURL} alt="" />
        </div>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="data">
            <label htmlFor="name" className="name label">
              <h2>Name</h2>
            </label>
            <input
              type="text"
              onChange={formik.handleChange}
              className="input name"
              value={formik.values.Name}
              name="Name"
            />
          </div>
          <div className="data">
            <label htmlFor="password">
              <h2>Create Password</h2>
            </label>
            <input
              type="text"
              className="password input"
              onChange={formik.handleChange}
              value={formik.values.Password}
              name="Password"
            />
          </div>
          <div className="data">
            <label htmlFor="Image">
              <h2>Image for Profile</h2>
            </label>
            <input
              type="text"
              className="input image"
              name="imageURL"
              value={formik.values.imageURL}
              onChange={formik.handleChange}
            />
          </div>
          <button type="submit">
            <h2>Submit</h2>
          </button>
        </form>
        <Link className="linkLogIn" to="/authenticate">
          <h2>Login</h2>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
