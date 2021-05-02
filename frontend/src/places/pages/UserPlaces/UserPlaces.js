import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import "./UserPlaces.css";
import "./IndividualPlaces";

import IndividualPlaces from "./IndividualPlaces";
import { DataContext } from "../../../data/DataContext";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { HiHeart } from "react-icons/hi";
import Modal from "react-modal";
const UserPlaces = () => {
  //getting from the data context or the database
  const data = useContext(DataContext);
  const userID = useParams().userId;
  const [popUp, setPopUp] = useState(null);

  //Still a work in progress, don't know what to do frankly
  const [infoDisplay, setDisplay] = useState(false);
  var toShow;
  const toggle = (name, imageURL, description) => {
    setDisplay((e) => !e);
   // toShow= <Modal isOpen={infoDisplay} onRequestClose={toggle}><h1>Hello there</h1></Modal>
    
  };
  //getting specific datas
  const loaded = data.places.filter((pla) => pla.person == userID);
  const user = data.user.filter((person) => person.id == userID);

  //setting up map
  const [mapView, setMapView] = useState({
    latitude: user[0].home.latitude,
    longitude: user[0].home.longitude,
    width: "100vw",
    height: "75vh",
    zoom: 1,
  });

  //if there is no place
  if (loaded.length == 0) {
    return (
      <div className="no-place">
        <h1>{user[0].name}</h1>
        <h1>No places to Show here</h1>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="container">
        {toShow}

        <h1>{user[0].name}</h1>
        <div className="map-below">
          <ReactMapGL
            {...mapView}
            mapStyle="mapbox://styles/noobylub/ckmk9onqc31ai17ofw0csrvoa"
            className="map"
            onViewportChange={(viewChange) => setMapView(viewChange)}
            mapboxApiAccessToken={
              "pk.eyJ1Ijoibm9vYnlsdWIiLCJhIjoiY2ttam0wZnF6MHNnMTJ2cGY2bm1uMXM5eSJ9.GKfl7_q8KLwJlwn8PiHAGQ"
            }
          >
            {loaded.map((place) => (
              <Marker
                key={place.id}
                latitude={place.coordinates.lat}
                longitude={place.coordinates.long}
              >
               
                <HiHeart
                  className="Icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setPopUp(place);
                  }}
                ></HiHeart>
              </Marker>
            ))}
            ;
            {popUp ? (
              <Popup
                latitude={popUp.coordinates.lat}
                longitude={popUp.coordinates.long}
                onClose={() => {
                  setPopUp(null);
                }}
              >
                <div className="pop-up">
                  <h3>{popUp.title}</h3>
                  <div className="content">
                    <img src={popUp.imageURL} alt="" />
                  </div>
                  <h6>Button</h6>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </div>
        <div className="all-places">
          {loaded.map((place) => (
            <IndividualPlaces
            id={place.id}
              key={place.id}
              title={place.title}
              description={place.description}
              imageURL={place.imageURL}
              coordinates={place.coordinates}
              person={place.person}
            ></IndividualPlaces>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserPlaces;
