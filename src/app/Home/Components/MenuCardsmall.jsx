import React, { useState } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit"; // Import MUI icon
import foodimg from "../../../assets/roti.jpg";

const MenuCardsmall = ({ foodItem, handleOpen }) => {
  return (
    <div className="border-2 border-[#966729] p-2 rounded-lg shadow-md w-56">
      <div className="relative h-24 w-full rounded-md overflow-hidden mb-4">
        <Image
          src={foodItem.image || foodimg}
          className="object-cover object-bottom"
          alt={foodItem.name ?? "alt tag"}
          objectFit="cover"
          width={1000}
          height={1000}
        />
      </div>
      <h3 className="text-sm font-semibold text-[#441029]">{foodItem.name}</h3>
      <p className="text-[0.65rem] text-zinc-400 mb-2">
        {foodItem.description.slice(0,90)}...
      </p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-[#44109]">
          ₹{foodItem.price}
        </span>
        <button
          onClick={() => handleOpen(foodItem)}
          id="editbutton"
          className="bg-[#966729] editbutton h-7 w-7 rounded-full text-white"
        >
          <EditIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};
export default MenuCardsmall;