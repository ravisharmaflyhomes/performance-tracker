import './Signin.css';
import { useForm } from "react-hook-form";
function Signin(props) {
  const {login} = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  }; // your form submit function which will invoke after successful validation

  return (
    <div >
       <form onSubmit={handleSubmit(onSubmit)}>
    <span className="input input--hoshi">
            <input className="input__field input__field--hoshi" type="text" id="email-signin" {...register("email", { required: true, pattern:{ value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}})}/>
            <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="email-signin">
              <span className="input__label-content input__label-content--hoshi">E-mail</span>
            </label>
          </span>
          {errors.email && <p className='redText'>Please enter a valid Email Address</p>}
          <span className="input input--hoshi">
            <input className="input__field input__field--hoshi" type="password" id="password-signin" {...register("password", { required: true })}/>
            <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="password-signin">
              <span className="input__label-content input__label-content--hoshi">Password</span>
            </label>
          </span>
          {errors.password && <p className='redText'>Please enter a valid password</p>}
          <div className="cta"><button className="btn btn-primary pull-left" type="submit">Sign-In</button></div>
          </form>
</div> 
  );
}

export default Signin;