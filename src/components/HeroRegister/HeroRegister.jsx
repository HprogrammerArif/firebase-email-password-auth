import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const HeroRegester = () => {
  const [heroError, setHeroError] = useState("");
  const [heroSuccess, setHeroSuccess] = useState("");
  const [heroShowPassword, setHeroShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Submiting Form");
    const email = e.target.email.value;
    const accepted = e.target.terms.checked;
    const password = e.target.password.value;
    console.log(email, password, accepted);

    //reset error & success
    setHeroError("");
    setHeroSuccess("");

    if (password.length < 6) {
      setHeroError("Password should be at least 6 character or longer!!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setHeroError(
        "Your Password should have at least one uppercase character!!"
      );
      return;
    } else if (!accepted) {
      setHeroError("Please accept terms and condition");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setHeroSuccess("Register Successfull");
      })
      .catch((error) => {
        console.error(error);
        setHeroError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {heroError && <p className="text-red-900">{heroError}</p>}
          {heroSuccess && <p className="text-green-900">{heroSuccess}</p>}
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="relative ">
                <input
                  type={heroShowPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input w-full input-bordered "
                  required
                />

                <span
                  className="absolute right-2 top-3 text-xl"
                  onClick={() => setHeroShowPassword(!heroShowPassword)}
                >
                  {heroShowPassword ? <FaEyeSlash /> : <FaEye></FaEye>}
                </span>
              </div>

              <div>
                <input
                  className="mr-4 mb-6"
                  type="checkbox"
                  name="terms"
                  id="terms"
                />
                <label htmlFor="terms">
                  Accept our <a href="">terms and condition</a>
                </label>
              </div>

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
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

export default HeroRegester;
