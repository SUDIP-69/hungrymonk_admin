import mongoose from "mongoose";

export const restaurantdetailsSchema = new mongoose.Schema(
  {
    restaurantname: {
      type: String,
      required: true,
    },
    restaurantid: {
      type: String,
      required: true,
    },
    restaurantlocation: {
      type: String,
      required: true,
    },
    restaurantphoneNo: {
      type: String,
      required: true,
    },
    restaurantemail: {
      type: String,
      required: true,
    },
    restaurantwebsite: {
      type: String,
      required: true,
    },
    restaurantaddress: {
      type: String,
      required: true,
    },
    restaurantopeninghours: {
      type: String,
      required: true,
    },
    restaurantcrestaurantopeninghourslosinghours: {
      type: String,
      required: true,
    },
    restaurantdescription: {
      type: String,
      required: true,
    },
    restaurantimage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const RestaurantDetails =
  mongoose.models.RestaurantDetails ||
  mongoose.model("RestaurantDetails", restaurantdetailsSchema);

export default RestaurantDetails;
