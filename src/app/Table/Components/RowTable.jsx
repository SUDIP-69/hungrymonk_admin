import React, { useState } from "react";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { Tooltip } from "@mui/material";
import Image from "next/image";

const RowTable = ({ waiterdata, onDelete }) => {
  const handleDelete = (waiterId) => {
    if (window.confirm("Are you sure you want to delete this waiter?")) {
      onDelete(waiterId);
    }
  };

  return (
      <thead>
        {waiterdata?.map((waiter, i) => (
          <tr key={i}>
            <td className="px-6 py-4 whitespace-nowrap text-sm hover:cursor-pointer font-medium text-rose-500">
              <Tooltip title="delete">
                <DeleteOutlineTwoToneIcon
                  onClick={() => handleDelete(waiter._id)}
                  className="bg-white w-fit mix-blend-multiply cursor-pointer"
                />
              </Tooltip>
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
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
              <button
                type="button"
                onClick={() => window.open(waiter.image, '_blank')}
                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
              >
                View Profile Photo
              </button>
            </td>
          </tr>
        ))}
      </thead>
  );
};

export default RowTable;
