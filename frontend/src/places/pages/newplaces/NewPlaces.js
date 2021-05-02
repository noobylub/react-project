import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./NewPlaces.css";
const NewPlaces = ({title}) => {
  //for the image display feature
  const [imageDisplay, setDisplay] = useState("");
  const changeDisplay = (v) => {
    setDisplay(v.target.value);
  };

  //Setting up formik form
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      latitude: null,
      longitude: null,
    },
    onSubmit: (values) => {
      setDisplay(values.image);
      console.log(values);
    },
    validationSchema: yup.object({
      title: yup.string().max(20, "Must be less than 20 characters"),
    }),
  });

  return (
    <div className="filling-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="title">
          <h1>Add your place</h1>
        </div>
        <div className="content">
          {" "}
          <input
            type="text"
            name="title"
            value={formik.values.title}
            className="title-style in"
            onChange={formik.handleChange}
          />
          <label className="lab" htmlFor="title">
            Title
          </label>
        </div>

        <div className="content">
          {" "}
          <input
            type="number"
            value={formik.values.latitude}
            onChange={formik.handleChange}
            className="lat-long"
            name="latitude"
          />
          <label htmlFor="latitude">Latitude</label>
        </div>
        <div className="content">
          <input
            type="number"
            value={formik.values.longitude}
            onChange={formik.handleChange}
            name="longitude"
            className="lat-long"
          />
          <label htmlFor="longitude">Longitude</label>
        </div>
        <div className="content">
          <input
            type="text"
            value={formik.values.image}
            onChange={changeDisplay}
            name="image"
            className="image"
          />
          <label htmlFor="image">iMAGE</label>
        </div>
        <div className="content">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description-style"
            cols="30"
            rows="10"
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
      <img src={imageDisplay} alt="" />
    </div>
  );
};

export default NewPlaces;
