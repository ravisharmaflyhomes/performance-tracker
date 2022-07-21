import React, { useState, useEffect } from 'react';
import Signin from '../Signin/Signin';
import PerformanceForm from '../PerformanceForm/PerformanceForm';
import Signup from '../Signup/Signup';
import './Layout.css';
import {DBConfig} from '../db/DBConfig';
import { initDB, useIndexedDB } from 'react-indexed-db';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
initDB(DBConfig)
function Layout() {

  const { getByIndex, add } = useIndexedDB('User');
  const [showSignIn, setShowSignIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
   let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
   var isTrueSet = (loggedInUser?.isLoggedIn === true);
   if(isTrueSet){
     setLoggedIn(isTrueSet);
     setUserDetails(loggedInUser);
   }
  }, []);

  const signupCB = (data) =>{
    if(data && data.password && data.confirm_password && data.password === data.confirm_password){
      delete data.confirm_password;
      add(data).then(
        event => {
          toast.success("Signed up Successfully !", {
            position: toast.POSITION.TOP_CENTER
          });
          setShowSignIn(true);
        },
        error => {
          toast.error("Invalid Username & Password !", {
            position: toast.POSITION.TOP_CENTER
          });
        }
      );
    }
  }

  const signinCb = (data) =>{
    if(data && data?.email && data?.password){
      getByIndex('email', data.email).then(userFromDB => {
        if(data.password === userFromDB.password){
          const {email, name} = userFromDB;
          setUserDetails({email, name})
          localStorage.setItem("loggedInUser", JSON.stringify({email, name, isLoggedIn: true}));
          toast.success("Login Successful!", {
            position: toast.POSITION.TOP_CENTER
          });
          setLoggedIn(true);
        }else{
          toast.error("Invalid Username & Password !", {
            position: toast.POSITION.TOP_CENTER
          });
        }
      }, error =>{
        toast.error("Invalid Username & Password !", {
          position: toast.POSITION.TOP_CENTER
        });
      });
    }
  }



  return (
    <div >
       {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
    {!loggedIn && <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 left-side">
          <header>
            <span>Flyhomes</span>
            <h3>Performance Tracker<br/></h3>
            <h4>One stop solution for employee performance tracking</h4>
          </header>
        </div>
        <div className="col-md-6 right-side">
          {showSignIn &&<Signin login={signinCb}/>}
          {!showSignIn && <Signup registration={signupCB}/>}
          <div className="cta">
            {!showSignIn && <span><a href="#" onClick={()=>{
              setShowSignIn(!showSignIn)
            }}>I am already a member</a></span>}
            {showSignIn && <span><a href="#" onClick={()=>{
              setShowSignIn(!showSignIn)
            }}>First time user?</a></span>}
          </div>
          <ul className="social list-inline">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Linkedin</a></li>
          </ul>
        </div>
      </div>
    </div> || <PerformanceForm user={userDetails}/>}

</div> 
  );
}

export default Layout;