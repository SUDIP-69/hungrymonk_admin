import Image from "next/image";
import React from "react";
import rest from "../../assets/rest.jpg";
import Tooltip from "@mui/material/Tooltip";
import HelpSharpIcon from "@mui/icons-material/HelpSharp";
import QrCodeScannerSharpIcon from "@mui/icons-material/QrCodeScannerSharp";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import {
  Edit,
  Facebook,
  Instagram,
  X,
  TableRestaurant,
} from "@mui/icons-material";
import logo from "../../assets/logo.png";
function SettingsComponent({ changesection, restaurantinfo }) {
  const conversations = [
    { tableno: 1, waiter: "joe doe" },
    { tableno: 2, waiter: "john doe" },
    { tableno: 10, waiter: "jade doe" },
    { tableno: 9, waiter: "jar doe" },
    { tableno: 5, waiter: "javed doe" },
  ];
  const handlelogout = () => {
    if (confirm("want to log out?")) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <Image
          src={rest}
          width={1000}
          height={1000}
          className="w-full h-[50%] object-cover object-right-bottom z-0 rounded-xl"
        />
        <div className="pb-20">
          <div className="relative   h-[400px]   ">
            <div className="bg-white centered-axis-x z-20 py-2 -top-10 h-fit w-[98%] rounded-lg relative">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h1 className="lg:text-3xl text-[1rem] font-semibold text-gray-800 capitalize">
                    {restaurantinfo?.restaurantname}
                  </h1>
                  <p className="text-sm  tracking-tight">
                    <LocationOnSharpIcon className="size-" />
                    {restaurantinfo?.restaurantaddress}
                  </p>
                </div>
                <div className="flex justify-center lg:space-x-2 space-x-1 lg:flex-row  items-center">
                  <Tooltip title="Download qrcode">
                    <QrCodeScannerSharpIcon className="text-[#440129] size-8" />
                  </Tooltip>

                  <button
                    onClick={handlelogout}
                    className="border-[2px] border-[#440129] rounded-lg px-4 py-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="w-full max-w-screen justify-items-start   grid-cols-1 grid lg:grid-cols-2 gap-4">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold">
                      Restaurant Information
                    </h2>
                    <Edit className="cursor-pointer" />
                  </div>
                  <p className="mt-2">
                    {restaurantinfo?.restaurantdescription}
                  </p>
                  <div className="mt-4">
                    <p>
                      <strong>Mobile:</strong> (+91){" "}
                      {restaurantinfo?.restaurantphoneNo}
                    </p>
                    <p>
                      <strong>Email:</strong> {restaurantinfo?.restaurantemail}
                    </p>
                    <p>
                      <strong>Location:</strong> USA
                    </p>
                  </div>
                  <h2 className="font-semibold">follow us :</h2>
                  <div className="flex space-x-2 mt-2">
                    <Tooltip title="facebook">
                      <a
                        href="#"
                        className="text-[#440129] hover:scale-110 duration-300  "
                      >
                        <Facebook />
                      </a>
                    </Tooltip>
                    <Tooltip title="Twitter">
                      <a
                        href="https://x.com/baksish24?t=ZkrxibakZ_mMIuljSb9oHw&s=08"
                        className="text-[#440129] hover:scale-110 duration-300 "
                      >
                        <X />
                      </a>
                    </Tooltip>
                    <Tooltip title="Instagram">
                      <a
                        href="https://www.instagram.com/amaderinsta?igsh=MTMyZWJzMWg2bWRt"
                        className="text-[#440129] hover:scale-110 duration-300 "
                      >
                        <Instagram />
                      </a>
                    </Tooltip>
                  </div>
                </div>
                <div className="p-2 lg:w-[45%] w-full">
                  <h2 className="text-lg font-semibold">Table Status</h2>
                  <ul className="mt-2">
                    {conversations.map((conv, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center py-2 border-b"
                      >
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setCurrentSection("tableRestaurant")}
                            className={`h-10 w-10 duration-300  rounded-full bg-[#fff9ea] shadow-lg text-[#440129]`}
                          >
                            <TableRestaurant />
                          </button>

                          <div>
                            <p className="font-medium">
                              Table No: {conv.tableno}
                            </p>
                            <p className="text-sm text-gray-500 capitalize pl-1">
                              waiter assigned : {conv.waiter}
                            </p>
                          </div>
                        </div>
                        <Tooltip title="Edit">
                          <button className="text-[#440129] hover:scale-110 duration-300 ">
                            <Edit />
                          </button>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mx-auto px-10 flex justify-center space-x-2 lg:space-x-10">
                <button
                  onClick={() => changesection("personSearch")}
                  type="button "
                  className="bg-orange-400 lg:text-base flex justify-center items-center space-x-2 capitalize font-semibold text-[#fff9ea] p-2  rounded-lg"
                >
                  <PersonAddAlt1Icon />
                  <span>add waiter</span>
                </button>
                <button
                  type="button "
                  onClick={() => changesection("menuBook")}
                  className="bg-orange-400 flex justify-center items-center space-x-2 capitalize font-semibold text-[#fff9ea] p-2  rounded-lg"
                >
                  <EditNoteOutlinedIcon />
                  <span>edit menu</span>
                </button>
              </div>
              <div className="flex  justify-center items-center absolute -bottom-10 left-0 w-full">
                <span>powered by </span>
                <Image src={logo} alt="logo" width={100} height={100} />
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default SettingsComponent;
