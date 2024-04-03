import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    //reset error & success
    setRegisterError("");
    setSuccess("");

    //Add validation

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        
        if(user.emailVerified){
          setSuccess("User Logged In Successfully");
        } else{
          alert('Please verify your email address!!')
        }
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log('Please Provide an email', emailRef.current.value);
      return;
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
       console.log('Please write a valid email');
       return;
    }

    // Send validation email
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Please check your email');
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {registerError && <p className="text-red-600">{registerError}</p>}
          {success && (
            <p className="text-green-600 text-xl font-bold">{success}</p>
          )}
          
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
              <label className="label">
                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <a>New to this website? please <Link className="underline" to='/register'>Register</Link> </a>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
