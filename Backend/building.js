const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

// Create a connection to the MySQL database in XAMPP
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "design",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint to fetch designs based on the user input
app.post("/api/getDesign", (req, res) => {
  const { squareFeet, floor, facing } = req.body;

  const [lower_square_feet, upper_square_feet] = squareFeet.split("-");

  const sql = `
        SELECT image,id 
        FROM m_design 
        WHERE facing = ? 
        AND square_feet BETWEEN ? AND ?
        AND no_of_floors = ?
    `;

  db.query(
    sql,
    [facing, lower_square_feet, upper_square_feet, floor],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(result);
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
