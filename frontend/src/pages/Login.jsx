import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/nav/Navbar"
import PasswordInput from "../components/input/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!pass) {
      setError('Please enter the password.');
      return;
    }
    setError(null);
    //Login API call
    try {
      const res = await axiosInstance.post('/login', {
        email,
        password: pass
      });
      if (res.data && res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again!');
      }
    }
  }
  const demoLogin = import.meta.env.VITE_SHOW_DEMO_LOGIN;
  const [demoEmail,demoPass] = demoLogin && demoLogin.split('|');
  return (
		<>
			<Navbar />
      {demoEmail && demoPass && (
				<div className="flex-col justify-self-center mt-28 text-center text-wrap text-sm text-slate-600 font-semibold">
          <p>Demo Login:</p>
					<p>Email: {demoEmail} <b>|</b> Pass: {demoPass}</p>
				</div>
			)}
			<div className={`flex items-center justify-center ${demoEmail && demoPass ? '' : 'mt-28'}`}>
				<div className="w-96 border rounded bg-white px-7 py-10">
					<form onSubmit={handleLogin}>
						<h4 className="text-2xl mb-7">Login</h4>

						<input
							type="email"
							placeholder="Email"
							className="input-box"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<PasswordInput
							value={pass}
							onChange={(e) => setPass(e.target.value)}
						/>
						{error && (
							<p className="text-red-500 text-xs pb-1">{error}</p>
						)}
						<button type="submit" className="btn-primary">
							Login
						</button>

						<p className="text-sm text-center mt-4">
							Not registered yet?{' '}
							<Link
								to="/register"
								className=" font-medium text-primary underline"
							>
								Create and Account
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
  );
}

export default Login