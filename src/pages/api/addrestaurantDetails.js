import connDB from "../../../middleware/connDB";
import RestaurantDetails from "../../../model/RestaurantDetails";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const restaurantDetails = req.body;
      const resr = new RestaurantDetails(restaurantDetails);
      const result = await resr.save();
      if (result) res.json({ success: true, data: result });
      else throw new Error();
    } else {
      res.status(405).json({ success: false, data: "Method not allowed" });
    }
  } catch (error) {
    res
      .status(200)
      .json({ success: false, data: "Failed to fetch restaurant details" });
  }
};
export default connDB(handler);
