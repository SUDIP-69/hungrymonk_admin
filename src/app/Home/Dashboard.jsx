"use client";
import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import Tooltip from "@mui/material/Tooltip";

// Example components for each section
import HomeSection from "./HomeSection";
import SettingsComponent from "./SettingsComponent";
import TableRestaurantSection from "./Menupage";
import PersonSearchSection from "./WaiterView";
import WaiterDetails from "./WaiterDetails";
import { CurrencyRupeeOutlined, LibraryAddCheck } from "@mui/icons-material";

function Dashboard({ restaurantinfo }) {
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    // Load the saved section from localStorage on client side
    const savedSection = localStorage.getItem("currentSection");
    if (savedSection) {
      setCurrentSection(savedSection);
    }
  }, []);

  const changesection = (section) => {
    setCurrentSection(section);
    // Save the current section to localStorage
    localStorage.setItem("currentSection", section);
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
      case "ConfirmedOrders":
        return <HomeSection restaurantinfo={restaurantinfo} />;
      default:
        return <HomeSection restaurantinfo={restaurantinfo} />;
    }
  };

  return (
    <div className="bg-[#fff9ea] min-h-screen w-screen flex">
      <div className="w-28">
        <div className="h-[95vh] w-[42px] lg:w-[52px] fixed z-50 top-4 bg-[#44012922] py-10 lg:mx-4 mx-2 lg:ml-10 rounded-[20px]">
          <div className="h-full relative">
            <div className="flex flex-col items-center justify-start space-y-10">
              <Tooltip title="Home" arrow>
                <button
                  onClick={() => changesection("home")}
                  className={`h-10 w-10 duration-300 rounded-full flex items-center justify-center ${
                    currentSection === "home"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                  }`}
                  aria-label="Home"
                >
                  <HomeIcon />
                </button>
              </Tooltip>
              <Tooltip title="Menu Card" arrow>
                <button
                  onClick={() => changesection("menuBook")}
                  className={`h-10 w-10 duration-300 rounded-full flex items-center justify-center ${
                    currentSection === "menuBook"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                  }`}
                  aria-label="Menu Card"
                >
                  <MenuBookIcon />
                </button>
              </Tooltip>
              <Tooltip title="Current Orders" arrow>
                <button
                  onClick={() => changesection("tableRestaurant")}
                  className={`h-10 w-10 duration-300 rounded-full flex items-center justify-center ${
                    currentSection === "tableRestaurant"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                  }`}
                  aria-label="Current Orders"
                >
                  <TableRestaurantIcon />
                </button>
              </Tooltip>
              <Tooltip title="Waiter Details" arrow>
                <button
                  onClick={() => changesection("personSearch")}
                  className={`h-10 w-10 duration-300 rounded-full flex items-center justify-center ${
                    currentSection === "personSearch"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                  }`}
                  aria-label="Waiter Details"
                >
                  <PersonSearchIcon />
                </button>
              </Tooltip>
              <Tooltip title="M" arrow>
                <button
                  onClick={() => changesection("ConfirmedOrders")}
                  className={`h-10 w-10 duration-300 rounded-full flex items-center justify-center ${
                    currentSection === "ConfirmedOrders"
                      ? "bg-[#440129] text-white"
                      : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                  }`}
                  aria-label="Confirmed Orders"
                >
                  <CurrencyRupeeOutlined />
                </button>
              </Tooltip>
            </div>
            <Tooltip title="Settings" arrow>
              <button
                onClick={() => changesection("settings")}
                className={`h-10 w-10 duration-300 rounded-full flex items-center justify-center absolute bottom-2 lg:left-[6px] left-[1px] ${
                  currentSection === "settings"
                    ? "bg-[#440129] text-white"
                    : "hover:scale-95 hover:bg-[#440129] bg-white text-[#440129] hover:text-white"
                }`}
                aria-label="Settings"
              >
                <SettingsSharpIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <section
        className={`w-full ${
          currentSection === "home" ||
          currentSection === "personSearch" ||
          currentSection === "settings"
            ? "h-[95vh] max-h-[150vh]"
            : "h-full"
        }  lg:mr-4 lg:ml-0 -ml-8 relative`}
      >
        {renderSection(currentSection)}
      </section>
    </div>
  );
}

export default Dashboard;
