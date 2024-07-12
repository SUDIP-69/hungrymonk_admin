import React, { useState } from "react";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import WaiterDetailModal from "@/app/Home/Components/WaiterDetailsModle";

const RowTable = ({ waiterdata, onDelete }) => {
  const [selectedWaiter, setSelectedWaiter] = useState(null);

  const handleDelete = (waiterId) => {
    if (window.confirm("Are you sure you want to delete this waiter?")) {
      onDelete(waiterId);
    }
    
  };

  const handleRowClick = (waiter) => {
    setSelectedWaiter(waiter);
  };

  const handleClose = () => {
    setSelectedWaiter(null);
  };

  return (
    <>
      <thead>
        {waiterdata?.map((waiter, i) => (
          <tr key={i} onClick={() => handleRowClick(waiter)} className="cursor-pointer">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-500">
              <Tooltip title="delete">
                <DeleteOutlineTwoToneIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(waiter._id);
                  }}
                  className="bg-white w-fit mix-blend-multiply cursor-pointer"
                />
              </Tooltip>
            </td>
            <td className="px-6 py-4 whitespace-nowrap w-fit text-sm font-medium text-gray-800">
              <img src={waiter.image} alt="profilepic" className="h-10 w-10 bg-slate-100 rounded-full border-2 border-[#4410298d]" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
              {waiter.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {waiter.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {waiter.phoneNo}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {waiter.profession}
            </td>
          </tr>
        ))}
      </thead>
      {selectedWaiter && (
        <WaiterDetailModal waiter={selectedWaiter} handleClose={handleClose} />
      )}
    </>
  );
};

export default RowTable;
