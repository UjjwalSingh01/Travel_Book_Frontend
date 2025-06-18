import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Alert from "@/common_components/Alert";

  
export interface LoginType {
  email: string;
  password: string;
}

const Login: React.FC = () => {  
  const { checkAuth } = useAuth();
  const [open , setOpen] = useState(false)
  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setShowAlert(true);
      setAlertType('warning')
      setMessage('All Fields Are Required');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData,
        { withCredentials: true }
      );

      if(response.data.success){
        await checkAuth();

        setMessage(response.data.message);
        setAlertType("success");
        setShowAlert(true);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("userRole", response.data.user.roles);

        setFormData({
          email: "",
          password: ""
        })
      }
      
      setTimeout(() => {
        setOpen(false);
      }, 2000);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Sign-Up error:", error.response?.data);
        setMessage(error.response?.data?.message);
      } else {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occurred.");
      }
      setAlertType("error");
      setShowAlert(true);
    }
  };


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`text-black hover:text-gray-700`}
        aria-label="Profile"
      >
        <GoPerson className="h-8 w-8 md:h-10 lg:h-12 xl:h-16 md:w-10 lg:w-12 xl:w-16" />
      </button>

    {open && (
      <div
        id="modal-overlay"
        className="fixed inset-0 z-20 flex items-center justify-center bg-opacity-10 backdrop-blur-sm"
        onClick={handleOutsideClick}
      >
        <div className="bg-white text-black flex flex-col justify-center items-center space-y-6 w-full md:w-[60%] lg:w-[50%] rounded-lg py-8 relative">
          <button
            onClick={() => {setOpen(false)}}
            className="absolute top-4 right-6 text-gray-500 text-2xl hover:text-gray-800"
          >
            <RxCrossCircled />
          </button>

          <div className="flex flex-col text-left w-[80%]">
            <p className="mt-5 font-nunito text-black font-bold text-3xl">Customer Log in</p>
            <p className="text-base font-montserrat mt-4 text-[#656565]">Continue your discovery journey.
            <br />Please enter your email and password to log in</p>
          </div>

          <form className="w-full flex flex-col items-center font-montserrat" onSubmit={handleSubmit}>

            {/* Email Address */}
            <div className="mb-6 w-[80%]">
              <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Type your email"
                className="w-full text-black text-sm bg-transparent py-4 px-3 border border-gray-300 rounded-[30px] focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-2 relative w-[80%]">
              <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Type your password"
                className="w-full text-black text-sm bg-transparent py-4 px-3 border border-gray-300 rounded-[30px] focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-5 bottom-5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="mb-4 text-left">
              <Link href="#" className="text-sm hover:underline">Forgot Your Password?</Link>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-[80%] mt-2 bg-[#13361C] text-white py-3 rounded-full text-base font-montserrat font-medium shadow-xl"
            >
              LOGIN
            </button>
          </form>

          <span className="font-montserrat">
            New to Travel Book? {" "}
            <Link 
              href={'/register'}
              onClick={() => {setOpen(false)}}
            >
              Register
            </Link>  
          </span>
        </div>
      </div>
    )}
    {(showAlert) && (
      <Alert
        message={message}
        type={alertType}
        onClose={() => setShowAlert(false)}
      />
    )}
   </>
  );
};

export default Login;