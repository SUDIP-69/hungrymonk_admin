import React, { useState } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit"; // Import MUI icon
import foodimg from "../../../assets/roti.jpg";
import MenuItemForm from "./EditMenuItemModal";

const MenuCardsmall = ({open,handleopen,handleclose}) => {

  return (
    <div className="border-2 border-[#966729] p-2  rounded-lg shadow-md w-64">
       {open&& <MenuItemForm handleclose={handleclose}/>}
      <div className="relative h-32 w-full rounded-md overflow-hidden mb-4">
        <Image
          src={foodimg}
          className="object-cover object-bottom"
          alt="Pepper Barbecue Chicken" 
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-sm font-semibold text-[#441029]">
        Pepper Barbecue Chicken
      </h3>
      <p className="text-[0.65rem] text-zinc-400 mb-2">
        Hand sorted mushroom tossed in a spicy chilly sauce and indie pepper
      </p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-[#44109]">₹255</span>
        <button onClick={handleopen} id='editbutton' className="bg-[#966729] editbutton h-7 w-7 rounded-full text-white">
          <EditIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

function Menucard({open,handleopen,handleclose}) {
  
  return (
    <div className="p-4 ">
        <div className="flex mb-2 items-center justify-start space-x-2"> 
      <h1 className="text-[#440129] text-xl font-semibold ">Tandoori</h1>
      <div onClick={handleopen} className="bg-[#440129] px-1.5 py-1 text-xs rounded-xl cursor-pointer  text-[#fff9ea]">Edit <EditIcon className="size-3  "/></div>
      </div>
      <MenuCardsmall open={open} handleopen={handleopen} handleclose={handleclose} />
    </div>
  );
}

export default Menucard;
