import React, { useState, useContext } from "react";
import "./IndividualPlaces.css";
import { DataContext } from "../../../data/DataContext";
import Modal from "react-modal";
import {NavLink} from 'react-router-dom'
import ReactMapGL from "react-map-gl";
const IndividualPlaces = ({
  id,
  title,
  address,
  description,
  imageURL,
  coordinates,
  person,
}) => {
  const data = useContext(DataContext);
  const [popMap, setPopMap] = useState(false);

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
  const toggleModal = () => {
    setPopMap((prev) => !prev);
  };

  return (
    <div className="one-place">
      <Modal portalClassName="modal" isOpen={popMap} onRequestClose={toggleModal} style={customStyles}>
      
       <div className="content">
       <h1>Delete Option</h1>
        <div className="yesno">
          <button onClick={toggleModal} className="yes button">Yes</button>
          <button onClick={toggleModal} className="no button">No</button>
          
        </div>
       </div>
       
       
      </Modal>

      <img src={imageURL} alt="" />
      <div className="content">
        <h2 className="title">{title}</h2>
        <div className="extra-content">
          <p>{description}</p>
          <div className="buttons">
            <div className="edit button" onClick>
              <NavLink to={`/places/edit/${id}`}>edit</NavLink>
            </div>
            <div className="delete button" onClick={toggleModal}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPlaces;
