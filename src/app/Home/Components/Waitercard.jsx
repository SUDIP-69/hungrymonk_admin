import React, { useState } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit"; // Import MUI icon
import foodimg from "../../../assets/roti.jpg";
import MenuItemForm from "./AddWaiterModal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const MenuCardsmall = ({ open, handleopen, handleclose }) => {
  return (
    <div className="">{open && <MenuItemForm handleclose={handleclose} />}</div>
  );
};

function Menucard({ open, handleopen, handleclose }) {
  return (
    <div className="p-4 ">
      <button
        onClick={handleopen}
        className="ml-2 p-2 bg-[#440129] text-white rounded-md hover:bg-[#6f0143]"
      >
        <AddRoundedIcon /> Add Waiter
      </button>
      <MenuCardsmall
        open={open}
        handleopen={handleopen}
        handleclose={handleclose}
      />
    </div>
  );
}

export default Menucard;
