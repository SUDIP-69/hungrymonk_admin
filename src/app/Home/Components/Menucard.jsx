import React, { useState } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit"; // Import MUI icon
import foodimg from "../../../assets/roti.jpg";
import MenuItemForm from "./EditMenuItemModal";

const MenuCardsmall = ({ foodItem, open, handleopen, handleClose }) => {
  return (
    <div className="border-2 border-[#966729] p-2 rounded-lg shadow-md w-64">
      {open && <MenuItemForm handleclose={handleClose} />}
      <div className="relative h-32 w-full rounded-md overflow-hidden mb-4">
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
        {foodItem.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-[#44109]">
          ₹{foodItem.price}
        </span>
        <button
          onClick={handleopen}
          id="editbutton"
          className="bg-[#966729] editbutton h-7 w-7 rounded-full text-white"
        >
          <EditIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

function categorizeFoodItems(foodItems) {
  return foodItems?.reduce((acc, item) => {
    const category = item?.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category]?.push(item);
    return acc;
  }, {});
}

function Menucard({ open, handleOpen, handleClose, menus }) {
  const categories = menus.food_items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      
      {Object.keys(categories).map((category) => (
        <div key={category}>
          <div className="flex  my-4 items-center justify-start space-x-2">
        <h1 className="text-[#440129] text-xl font-semibold">{category}</h1>
        <div
          onClick={handleOpen}
          className="bg-[#440129] px-1.5 py-1 text-xs rounded-xl cursor-pointer text-[#fff9ea]"
        >
          Edit <EditIcon className="size-3" />
        </div>
      </div>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
            {categories[category].map((foodItem) => (
              <MenuCardsmall
                key={foodItem._id}
                foodItem={foodItem}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menucard;
