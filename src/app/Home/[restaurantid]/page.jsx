import React from "react";
import Dashboard from "../Dashboard";
import axios from "axios";

async function page({ params }) {
  const { restaurantid } = params;
  const {data} = await axios.post(
    "http://localhost:3000/api/getrestaurantdetails",
    { 'restaurantid': "TOC123456" }
  );

  const restaurantinfo = data.data;

  return (
    <div>
      <Dashboard restaurantinfo={restaurantinfo} />
    </div>
  );
}

export default page;
