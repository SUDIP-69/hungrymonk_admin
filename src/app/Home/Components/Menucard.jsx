import React from "react";
import MenuCardsmall from "./MenuCardsmall";
import MenuItemForm from "./EditMenuItemModal";
import { Edit } from "@mui/icons-material";
const Menucard = ({
  menus,
  open,
  selectedFoodItem,
  handleOpen,
  handleClose,
}) => {
  const categories = menus.food_items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      {open && (
        <MenuItemForm foodItem={selectedFoodItem} handleclose={handleClose} />
      )}
      {Object.keys(categories).map((category) => (
        <div key={category}>
          <div className="flex  my-4 items-center justify-start space-x-2">
            <h1 className="text-[#440129] text-xl font-semibold">{category}</h1>
            <div
              onClick={() => handleOpen({category: category})}
              className="bg-[#440129] px-1.5 py-1 text-xs rounded-xl cursor-pointer text-[#fff9ea]"
            >
              Edit <Edit className="size-3" />
            </div>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
            {categories[category].map((foodItem) => (
              <MenuCardsmall
                key={foodItem._id}
                foodItem={foodItem}
                handleOpen={handleOpen}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menucard;
