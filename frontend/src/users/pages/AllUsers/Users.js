import React, { useEffect } from "react";
import "./Users.css";

import IndividualUser from "../IndividualUser/IndividualUser";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../../../data/DataContext";
import { ProviderContext } from "../.../../../../App";
import useHttpHook from "../../../hook/useHttpHook";

export const AllUsers = () => {
  const { error, loading, sendBackEnd, clearError } = useHttpHook();
  const data = useContext(DataContext);
  const [users, setusers] = useState();
  const { userID, loggedIn } = useContext(ProviderContext);

  const signal = new AbortController();

  useEffect(() => {
    const getData = async function () {
      const response = await sendBackEnd(
        "http://localhost:3001/users/all-users",
        signal.signal
      );
      setusers(response.allusers)
    };
    getData(); 
  }, []);
  console.log(users)
  
  if (data.user.length === 0) {
    return (
      <div className="center">
        <h1>No user found</h1>
      </div>
    );
  }
  return (
    <div className="users">
      {loggedIn && <div className="content">{userID}</div>}
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
