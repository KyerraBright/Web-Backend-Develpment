const pool = require("../Database/index.js");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );

    return data.rows;
  } catch (error) {
    console.error("Error in getInventoryByClassificationId:", error);
    throw error; // Re-throw the error to propagate it to the caller or higher-level error handling
  }
}

const InventoryModel = {
  getCarsByType: async function (carType) {
    try {
      const query = 'SELECT * FROM public.inventory WHERE classification_id = ?'; // Example SQL query
      const cars = await db.query(query, [classification_id]);
      return cars;
    } catch (error) {
      console.error('Error fetching cars by type:', error);
      throw error;
    }
  },
};

module.exports = { getInventoryByClassificationId, getClassifications, InventoryModel };