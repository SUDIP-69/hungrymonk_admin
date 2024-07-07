import connDB from "../../../middleware/connDB";
import RestaurantDetails from "../../../model/RestaurantDetails";
import User from "../../../model/User";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const {
        restaurantname,
        restaurantid,
        restaurantlocation,
        restaurantphoneNo,
        restaurantemail,
        restaurantwebsite,
        restaurantaddress,
        restaurantopeninghours,
        restaurantclosinghours,
        restaurantdescription,
        restaurantimage,
        noofchef,
        noofemployees,
        nooftables,
        noofwaiters,
        noofseatingcapacity,
        username,
        password,
        email,
        phoneNo,
        name,
      } = req.body;

      // Create a new RestaurantDetails object
      const newRestaurantDetails = new RestaurantDetails({
        restaurantname,
        restaurantid,
        restaurantlocation,
        restaurantphoneNo,
        restaurantemail,
        restaurantwebsite,
        restaurantaddress,
        restaurantopeninghours,
        restaurantclosinghours,
        restaurantdescription,
        restaurantimage,
        noofchef,
        noofemployees,
        nooftables,
        noofwaiters,
        noofseatingcapacity,
      });

      // Save the new RestaurantDetails to the database
      const restaurantResult = await newRestaurantDetails.save();

      // Create a new User object
      const newUser = new User({
        username,
        password,
        email,
        phoneNo,
        name,
        restaurantid,
      });

      // Save the new User to the database
      const userResult = await newUser.save();

      // Return a success response
      res.json({
        success: true,
        restaurantData: restaurantResult,
        userData: userResult,
      });
    } else {
      res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Error occurred while adding details" });
  }
};

export default connDB(handler);
