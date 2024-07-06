"use client"
import Image from "next/image";
import React, { useState } from "react";
import rest from "../../assets/rest.jpg";
import logo from "../../assets/logo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Menucard from "./Components/Menucard";
import MenuItemForm from "./Components/EditMenuItemModal";

const TableRestaurantSection = () => {
  const [open, setopen] = useState(false);
  const handleclose = () => setopen(false);
  const handleopen = () => setopen(true);
  return (
    <div className="w-full h-full  relative">
   
      <Image
        src={rest}
        width={1000}
        height={1000}
        className="w-full h-[35%] object-cover object-right-bottom z-0 rounded-xl"
      />
      <div className="flex justify-between items-center relative p-4">
        <SearchRoundedIcon className="absolute left-6" />

        <input
          type="text"
          name="menu"
          id="menu"
          placeholder="Enter a dish"
          className="p-2 pl-10 rounded-md border-[1px] border-[#440129] bg-transparent outline-none focus:ring-[1px] focus:ring-[#440129] focus:border-[#440129]"
        />
        <button onClick={handleopen} className="ml-2 p-2 bg-[#440129] text-white rounded-md hover:bg-[#6f0143]">
          <AddRoundedIcon /> Add Category
        </button>
      </div>
      <hr className="border border-[#440129] " />
      <section>
      <Menucard open={open} handleopen={handleopen} handleclose={handleclose} />
      </section>

      <div className="flex justify-center items-center absolute bottom-0 left-0 w-full">
        <span>powered by </span>
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
    </div>
  );
};
export default TableRestaurantSection;
