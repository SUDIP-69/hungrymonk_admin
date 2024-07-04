"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import logo from "../assets/logo.svg";
import border from "../assets/border.png";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

export default function Home() {
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");

  const router = useRouter();

  const signin = async (event) => {
    event.preventDefault();

    // console.log(user, password);

    const {
      data: { success, token },
    } = await axios.post("/api/login", { username: user, password });
    console.log(success);
    if (success) {
      setpassword("");
      setuser("");
      toast.success("successfully logged in");
      localStorage.setItem("accessToken", token);
      setTimeout(() => {
        router.push("/Home");
      }, 1000);
    } else {
      setuser("");

      toast.error("successfully failed");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="relative lg:h-[97vh] h-[93vh]">
      <div className="absolute right-4 top-4 bottom-0 w-[2px] bg-gradient-to-b to-[#F0D17A] from-[#8f660e]"></div>
      <div className="absolute  left-4 top-4 bottom-0 w-[2px] bg-gradient-to-b from-[#F0D17A] to-[#8f660e]"></div>
      <div className="absolute  bottom-0 h-[2px] left-4 right-4 bg-gradient-to-l from-[#F0D17A] to-[#8f660e]"></div>
      <div className="absolute  top-4 h-[2px] left-4 right-4 bg-gradient-to-r from-[#F0D17A] to-[#8f660e]"></div>

      <div className="absolute right-[10px] top-[10px] -bottom-[7.2px] w-[1px] bg-gradient-to-b to-[#F0D17A] from-[#8f660e]"></div>
      <div className="absolute  left-[10px] top-[10px] -bottom-[7.2px] w-[1px] bg-gradient-to-b from-[#F0D17A] to-[#8f660e]"></div>
      <div className="absolute  -bottom-[7.2px] h-[1px] left-[10px] right-[10px] bg-gradient-to-l from-[#F0D17A] to-[#8f660e]"></div>
      <div className="absolute  top-[10px] h-[1px] left-[10px] right-[10px] bg-gradient-to-r from-[#F0D17A] to-[#8f660e]"></div>


      <div className="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">
        <Toaster/>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image className="mx-auto h-30" src={logo} alt="logo" />
            <div>
              <p className="uppercase text-white tracking-wide text-2xl lg:ml-0 -ml-2 -mt-32 mb-20 px-32">
                arabikas
              </p>
            </div>
            <h2 className=" text-center text-2xl font-light tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto lg:w-1/3 w-full px-5">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium  text-white"
                >
                  UserName
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    onChange={(e) => setuser(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="Enter username/phone number"
                    autoComplete="email"
                    required=""
                    className="block w-full rounded-md  py-1.5 px-2 text-white bg-transparent border-[1px] border-[#FFF9EA] shadow-sm placeholder:text-white placeholder:opacity-40 sm:text-sm sm:"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium  text-white "
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-[#FFF9EA]"
              >
                Forgot password?
              </a>
            </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    onChange={(e) => setpassword(e.target.value)}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required=""
                    className="block w-full rounded-md bg-transparent border-[1px] border-[#FFF9EA] placeholder:text-white placeholder:opacity-40 py-1.5 px-2 text-white shadow-sm sm:text-sm sm:"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={signin}
                  className="flex w-full justify-center rounded-md bg-[#FFF9EA] px-3 py-1.5 text-md font-bold  text-[#440129] tracking-tight shadow-smocus-visible:outline"
                >
                  Sign in &nbsp;
                  <LoginRoundedIcon />
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-white tracking-wider">
              Forgot Password? &nbsp;
              <a
                href="#"
                className="font-semibold underline  text-[#FFF9EA] tracking-tighter"
              >
                Connect with team
              </a>
            </p>
          </div>
      </div>
    </div>
  );
}
