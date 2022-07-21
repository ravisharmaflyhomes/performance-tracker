import './Logout.css';
function Logout(props) {
  const {user} =  props;
  const logOut = ()=>{
      localStorage.removeItem('loggedInUser');
  }
  return (
    <div className='logoutPos'>
        Welcome {user.name} <a href="" onClick={logOut}>Logout</a>
   </div> 
  );
}

export default Logout;
