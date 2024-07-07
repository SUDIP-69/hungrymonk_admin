import React from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import Page from "../page";

async function page({ params }) {
  const { restaurantid } = params;
  let restaurantinfo;
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/getrestaurantdetails",
      { restaurantid }
    );
    restaurantinfo = data.data;
  } catch (e) {
    console.log("Error fetching restaurant details", e);
    return <><Page/></>
  }

  return (
    <div>
      <Dashboard restaurantinfo={restaurantinfo} />
    </div>
  );
}

export default page;
