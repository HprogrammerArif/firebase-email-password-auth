import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register = () => {

  const [registerError, setRegisterError] =useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = e => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    //reset error & success
    setRegisterError('');
    setSuccess('');

    if (password.length < 6) {
      setRegisterError('Password should be at least 6 character or longer!!');
      return;
    } else if(!/[A-Z]/.test(password)){
      setRegisterError('Your Password should have at least one uppercase character!!');
      return;
    }

    

    // Create user
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setSuccess('User Created Successfully');
    })
    .catch(error => {
      console.error(error);
      setRegisterError(error.message);
    })
  }


  return (
    <div className=" mx-auto w-1/2 text-center">
      <h2 className="text-3xl text-center font-bold my-8">Please Register</h2>
      <form onSubmit={handleRegister}>
        <input
          className="mb-4 w-3/4 py-2 px-4 bg-gray-400 rounded-md placeholder-black"
          type="email"
          name="email"
          id=""
          placeholder="Email Address"
          required
        />
        <br />
        <input
          className="mb-4 relative w-3/4 py-2 px-4 bg-gray-400 rounded-md placeholder-black"
          type={showPassword?"text":"password"}
          name="password"
          placeholder="Password"
          id=""
          required
        />
        <span className="absolute text-xl" onClick={() => setShowPassword(!showPassword)}>{
          showPassword? <FaEyeSlash />: <FaEye></FaEye>
        }</span>
        <br />
        <input
          className="btn btn-primary mb-4 w-3/4   text-2xl font-semibold rounded-xl"
          type="submit"
          value="Register"
        />
      </form>
      {
        registerError && <p className="text-red-600">{registerError}</p>
      }
      {
        success && <p className="text-green-600 text-xl font-bold">{success}</p>
      }
    </div>
  );
};

export default Register;
