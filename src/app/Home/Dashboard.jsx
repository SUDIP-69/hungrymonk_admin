"use client";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import Tooltip from "@mui/material/Tooltip";

const authors = [
  {
    name: "John Michael",
    email: "john@creative-tim.com",
    function: "Manager",
    organization: "Organization",
    status: "ONLINE",
    employed: "23/04/18",
    img: "/path/to/image", // Replace with the actual image path
  },
  {
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    function: "Programator",
    organization: "Developer",
    status: "OFFLINE",
    employed: "11/01/19",
    img: "/path/to/image", // Replace with the actual image path
  },
  // Add more authors as needed
];
// Example components for each section
import HomeSection from "./HomeSection";
import MenuBookSection from "./MenuBookSection";
import SettingsComponent from "./SettingsComponent";
import TableRestaurantSection from "./Menupage";
import PersonSearchSection from "./WaiterView";
import WaiterDetails from "./WaiterDetails";


function Dashboard({ restaurantinfo }) {
  //console.log(restaurantinfo);
  const [currentSection, setCurrentSection] = useState("home");
  const changesection = (section) => {
    setCurrentSection(section);
  };

  const renderSection = (currentSection) => {
    switch (currentSection) {
      case "home":
        return <HomeSection restaurantinfo={restaurantinfo} />;
      case "menuBook":
        return <TableRestaurantSection restaurantinfo={restaurantinfo} />;
      case "tableRestaurant":
        return <PersonSearchSection restaurantinfo={restaurantinfo} />;
      case "personSearch":
        return <WaiterDetails restaurantinfo={restaurantinfo} />;
      case "settings": 
        return (
          <SettingsComponent
            restaurantinfo={restaurantinfo}
            changesection={changesection}
          />
        );
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="bg-[#fff9ea] min-h-screen w-screen flex items-center">
      <div className="w-28">
        <div className="h-[95vh] w-[42px] lg:w-[52px] fixed z-50 top-4 bg-[#44012922] py-10 lg:mx-4 mx-2 lg:ml-10 rounded-[20px]">
          <div className="h-full relative">
            <div className="flex flex-col items-center justify-start space-y-10">
              <Tooltip title="Home">
                <button
                  onClick={() => setCurrentSection("home")}
                  className={`h-10 w-10 duration-300  rounded-full ${
                    currentSection === "home"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                  }`}
                >
                  <HomeIcon />
                </button>
              </Tooltip>
              <Tooltip title="Menu Book">
                <button
                  onClick={() => setCurrentSection("menuBook")}
                  className={`h-10 w-10 duration-300 rounded-full ${
                    currentSection === "menuBook"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white  text-[#440129] hover:text-white"
                  }`}
                >
                  <MenuBookIcon />
                </button>
              </Tooltip>
              <Tooltip title="Table Restaurant">
                <button
                  onClick={() => setCurrentSection("tableRestaurant")}
                  className={`h-10 w-10 duration-300  rounded-full ${
                    currentSection === "tableRestaurant"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                  }`}
                >
                  <TableRestaurantIcon />
                </button>
              </Tooltip>
              <Tooltip title="Person Search">
                <button
                  onClick={() => setCurrentSection("personSearch")}
                  className={`h-10 w-10 duration-300  rounded-full ${
                    currentSection === "personSearch"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                  }`}
                >
                  <PersonSearchIcon />
                </button>
              </Tooltip>
            </div>

            <Tooltip title="Settings">
              <button
                onClick={() => setCurrentSection("settings")}
                className={`h-10 w-10 duration-300  rounded-full absolute bottom-2 lg:left-[6px] left-[1px] ${
                  currentSection === "settings"
                    ? "bg-[#440129] text-white"
                    : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                }`}
              >
                <SettingsSharpIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <section className={`w-full ${(currentSection === "home" ||currentSection === "personSearch" ||currentSection === "settings") ? 'h-[95vh] max-h-[150vh]':'h-full'}  lg:mr-4 lg:ml-0 -ml-8 relative`}>
        {renderSection(currentSection)}
      </section>
    </div>
  );
}

export default Dashboard;
