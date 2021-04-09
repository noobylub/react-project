import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
const Authenticate = () => {
    const formik = useFormik({
        initialValues: {
            Email:" ",
            Password:" "
        }
    })
    return (
        <div className="Authenticate">
           <div className="content">

           </div>
        </div>
    );
}

export default Authenticate;
