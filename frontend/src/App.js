import React, { createContext, useCallback, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  
} from "react-router-dom";
import { AllUsers } from "./users/pages/AllUsers/Users";
import Header from "./shared/pages/Heading/Header";
import NewPlaces from "./places/pages/newplaces/NewPlaces";
import UserPlaces from "./places/pages/UserPlaces/UserPlaces";
import Datas from "./data/DataContext";
import "mapbox-gl/dist/mapbox-gl.css";
import EditPlace from "./places/pages/newplaces/EditPlace";

import Authenticate from "./users/pages/Authentication/signin/authenticate";
import SignUp from "./users/pages/Authentication/signup/SignUp";

export const ProviderContext = createContext();

function App() {
 
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setuserID] = useState(null);
  const logIn = useCallback((ID) => {
    setLoggedIn(true);
    setuserID(ID);
    
  });
  const logOut = useCallback(() => {
    setLoggedIn(false);
    setuserID(null);
  });

  return (
    <ProviderContext.Provider value={{ loggedIn, logIn, userID }}>
      <Datas>
        <BrowserRouter>
          <Header></Header>
          <main>
            <Switch>
              <Route path="/" exact>
                <AllUsers></AllUsers>
              </Route>
              <Route path="/places/edit/:id">
                <EditPlace></EditPlace>
              </Route>
              <Route path="/:userId/places">
                <UserPlaces></UserPlaces>
              </Route>
              <Route path="/new-place">
                <NewPlaces></NewPlaces>
              </Route>
              <Route path="/authenticate">
                <Authenticate></Authenticate>
              </Route>
              <Route path="/signup">
                <SignUp></SignUp>
              </Route>
              <Redirect to="/"></Redirect>
            </Switch>
          </main>
        </BrowserRouter>
      </Datas>
    </ProviderContext.Provider>
  );
}

export default App;
