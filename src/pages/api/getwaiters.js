import connDB from "../../../middleware/connDB";
import Waiter from "../../../model/Waiter";

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      // Fetch all waiters from the database
      const {restaurant_id} = req.body;
      const waiters = await Waiter.find({restaurant_id});
      
      // Return the list of waiters
      res.json({ success: true, data: waiters });
    } else {
      res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({ success: false, error: "Error occurred while fetching waiters" });
  }
};

export default connDB(handler);
