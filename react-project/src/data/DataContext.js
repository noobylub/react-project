import React, {useState, createContext, useEffect} from 'react';
import App from '../App';
import {AllUsers} from '../users/pages/AllUsers/Users'
export const DataContext = createContext();
 const DataContextProvider = (props) => {
  const [user, setUsers] = useState([
    {
      key: 1234,
      id:1234,
      image: "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg",
      name: "Agus",
      placeCount: 10,
      home: {
        longitude:49.301794335391556,
        latitude: 25.139696918328024,
      }
    },
    {
      key: 1235,
      id: 12345,
      image: "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg",
      name: "happy kid hello",
      placeCount: 10,
      home: {
       
        longitude: 105.60934978644092,
        latitude:  -5.620377696484667,
      }
    },
    
  ]);
 
  const [places, setPlaces] = useState([
    {
      id: "i1",
      title: "Bali",
      address:
        "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
      description: "Monumen nasional dari Indonesia ",
      imageURL:
        "https://loveandroad.com/wp-content/uploads/2020/11/Prices-in-Bali-tours.jpg",
      coordinates: {
        lat: 8.3405,
        long: 115.0920,
      },
      person: user[0].id,
    },
    {
      id: "i3",
      title: "Monas",
      address:
        "Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/b/b1/Merdeka_Square_Monas_02.jpg",
      coordinates: {
        lat: -6.174093505131075,
        long: 106.82712634035484,
      },
      person: user[0].id,
  },
  {
    id:"i6",
    title:"Jambi",
    address: "Neng Jambi",
    description: "Jambi iku apik banget lo",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/9/95/Gentala_arasy_saat_senja.jpg",
    coordinates:{
      lat:1.6101,
      long: 103.6131
    },
    person: user[1].id
  }
]);




  return (
   <DataContext.Provider value={{user, setUsers, places, setPlaces}}>
     {props.children}
   </DataContext.Provider>
  );
}
export default DataContextProvider;


