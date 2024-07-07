import connDB from "../../../middleware/connDB";
import Waiter from "../../../model/Waiter";

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const {
        name,
        phoneNo,
        email,
        restaurant_id,
        age,
        image,
        address,
        gender,
        occupation
      } = req.body;

      // Create a new waiter object
      const newWaiter = new Waiter({
        name,
        phoneNo,
        email,
        restaurant_id,
        age,
        image,
        address,
        gender,
        occupation
      });

      // Save the new waiter to the database
      const result = await newWaiter.save();

      // Return a success response
      res.json({ success: true, data: result });
    } else {
      res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({ success: false, error: "Error occurred while adding waiter" });
  }
};

export default connDB(handler);
