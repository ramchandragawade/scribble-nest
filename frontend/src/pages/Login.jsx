import { React, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/nav/Navbar"
import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../utils/helper";

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError('Please enter a valid email address.');
      return;
    }
    if(!pass) {
      setError('Please enter the password.');
      return;
    }
    setError(null);
    //Login API call
  }
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">

          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            
            <input type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
        
            <PasswordInput
              value={pass}
              onChange={(e)=>setPass(e.target.value)}
              />
            {
              error && <p className="text-red-500 text-xs pb-1">{error}</p>
            }
            <button type="submit" className="btn-primary">Login</button>
            
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/register" className=" font-medium text-primary underline">
                Create and Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login