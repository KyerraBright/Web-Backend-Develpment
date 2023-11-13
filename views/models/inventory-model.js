const pool = require("../Database/index.js");

/* ***************************
 *  Get all classification data
 * ************************** */
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

module.exports = { getInventoryByClassificationId };
