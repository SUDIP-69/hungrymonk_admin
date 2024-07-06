import React, { useEffect, useState } from "react";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { Tooltip } from "@mui/material";

const RowTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getTableData");
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    // <tbody className="divide-y divide-gray-200">
    //   {tableData.map((row) => (

    //   ))}
    // </tbody>
    <thead>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm hover:cursor-pointer font-medium text-rose-500">
          <Tooltip title="delete">
            <DeleteOutlineTwoToneIcon className="bg-white w-fit mix-blend-multiply" />
          </Tooltip>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
          {/* {row.table} */}gh
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          {/* {row.status} */}nbn
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          {/* {row.waiter} */}bn
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          {/* ₹{row.order} */}nb
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
          <button
            type="button"
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            View Profile Photo
          </button>
        </td>
      </tr>
    </thead>
  );
};

export default RowTable;
