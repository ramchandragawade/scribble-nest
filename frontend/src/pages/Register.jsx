import { useState } from "react";
import Navbar from "../components/nav/Navbar"
import PasswordInput from "../components/input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!name) {
      setError('Please enter your name.');
      return;
    }
    if(!pass) {
      setError('Please enter the password.');
      return;
    }
    if(!validateEmail(email)){
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    //Register API call
    try {
      const res = await axiosInstance.post('/register', {
        fullName:name,
        email,
        password: pass
      });
      if (res.data && res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        return navigate('/dashboard');
      }
      if (res.data?.error) {
        setError(res.data.message);
        return;
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again!');
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">

          <form onSubmit={handleRegister}>
            <h4 className="text-2xl mb-7">Register</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)} />

            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <PasswordInput
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            {
              error && <p className="text-red-500 text-xs pb-1">{error}</p>
            }
            <button type="submit" className="btn-primary">Create Account</button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className=" font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register