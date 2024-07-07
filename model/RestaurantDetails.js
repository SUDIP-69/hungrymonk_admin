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
    restaurantclosinghours: {
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
    noofchef: {
      type: String,
    },
    noofemployees: {
      type: String,
    },
    nooftables: {
      type: String,
    },
    noofwaiters: {
      type: String,
    },
    noofseatingcapacity: {
      type: String,
    },
  },
  { timestamps: true }
);

const RestaurantDetails =
  mongoose.models.RestaurantDetails ||
  mongoose.model("RestaurantDetails", restaurantdetailsSchema);

export default RestaurantDetails;
