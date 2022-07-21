import './Signup.css';
import { useForm } from "react-hook-form";

function Signup(props) {
  const {registration} = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    registration(data);
  }; // your form submit function which will invoke after successful validation

  return (
    <div >
       <form onSubmit={handleSubmit(onSubmit)}>
            <span className="input input--hoshi">
                  <input className="input__field input__field--hoshi" type="text" id="name" {...register("name", { required: true })} />
                  <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="name">
                    <span className="input__label-content input__label-content--hoshi">Name</span>
                  </label>
                </span>
                {errors.name && <p className='redText'>Please enter a valid Name</p>}
                <span className="input input--hoshi">
                  <input className="input__field input__field--hoshi" type="text" id="email" {...register("email", { required: true, pattern:{ value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}})}/>
                  <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="email">
                    <span className="input__label-content input__label-content--hoshi">E-mail</span>
                  </label>
                </span>
                {errors.email && <p className='redText'>Please enter a valid Email Address</p>}
                <span className="input input--hoshi">
                  <input className="input__field input__field--hoshi" type="password" id="password" {...register("password", { required: true })}/>
                  <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="password" >
                    <span className="input__label-content input__label-content--hoshi">Password</span>
                  </label>
                </span>
                {errors.password && <p className='redText'>Please enter a valid password</p>}
                <span className="input input--hoshi">
                  <input className="input__field input__field--hoshi" type="password" id="password1" {...register("confirm_password", { required: true, validate: (val) => {if (watch('password') != val) { return "Your passwords do no match";}}})}/>
                  <label className="input__label input__label--hoshi input__label--hoshi-color-3" for="password1">
                    <span className="input__label-content input__label-content--hoshi">Repeat Passowrd</span>
                  </label>
                </span>
                {errors.confirm_password && <p className='redText'>{errors.confirm_password.message? errors.confirm_password.message : "Please enter a valid password"}</p>}
                <div className="cta"><button className="btn btn-primary pull-left" type="submit">Sign-Up Now</button></div>
          </form>
</div> 
  );
}

export default Signup;