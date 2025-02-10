const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/cli", (req, res) => {
  const { command } = req.body;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.json({ output: `Error: ${stderr || error.message}` });
    }
    res.json({ output: stdout || "Command executed successfully!" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
