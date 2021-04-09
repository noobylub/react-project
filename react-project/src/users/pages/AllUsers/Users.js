import React from "react";
import "./Users.css";

import IndividualUser from "../IndividualUser/IndividualUser";
import { NavLink } from 'react-router-dom';
import { useContext, useState } from "react";
import {DataContext} from '../../../data/DataContext';
export const AllUsers = ( ) => {
  const data = useContext(DataContext);
  






  if (data.user.length === 0) {
    return (
      <div className="center">
        <h1>No user found</h1>
      </div>
    );
  }
  return (
    <div className="users">
     
      {data.user.map((user) => (
        <NavLink to={`/${user.id}/places`}>
          <IndividualUser
            key={user.key}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.placeCount}
          ></IndividualUser>
        </NavLink>
      ))}
    </div>
  );
};
