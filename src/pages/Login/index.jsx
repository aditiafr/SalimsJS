import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log(formData);
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/auth/login`, formData);
      console.log(response.data);

      Cookies.set('access_token', response.data.access_token, { expires: 7 });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen max-w-screen mx-auto flex items-center justify-center bg-gray-100">
      <div className="max-h-screen-lg max-w-screen-lg w-full flex drop-shadow-md">

        <div className="w-1/2 bg-cover bg-center rounded-s-xl hidden lg:block" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/039/302/250/small_2x/ai-generated-back-to-school-science-lab-excitement-highlight-the-excitement-of-a-science-experiment-in-a-laboratory-setting-background-image-generative-ai-photo.jpg')" }} />

        <div className="bg-white py-6 lg:py-10 px-8 lg:px-14 w-full lg:w-1/2 lg:rounded-e-xl mx-4 lg:mx-0">
          {/* <img src="/assets/images/logo.png" alt="Logo Icon" className="w-20 md:w-28 h-20 md:h-28" /> */}
          {/* <p className="text-4xl drop-shadow-md font-bold">SA-CRMS</p> */}
          <img className="w-44" src="/assets/images/salims.png" alt="logo" />
          <div className="py-6">
            <h1 className="text-[42px] md:text-[58px] text-primary-500 leading-none">Hello, <span className="font-bold">Welcome!</span></h1>
          </div>
          <div className="my-2">
            <form onSubmit={handleSubmit} method="POST">
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      autoComplete="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Username"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-500 hover:text-gray-700 absolute right-2 top-1.5"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </button>
                  </div>
                </div>
              </div>

              <Link to="">
                <p className="text-right pt-2 text-primary-500 hover:text-indigo-400">Forget password?</p>
              </Link>

              <div className="flex gap-4">
                <button type="submit" className={`${isLoading ? 'bg-primary-400' : 'bg-primary-500'} hover:bg-primary-400 text-white py-2 max-w-32 w-full rounded-md mt-8`}>
                  {isLoading ?
                    "Loading..."
                    :
                    "Login"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
