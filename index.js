require("dotenv").config();

const server = require("./src/server");
const dbConnect = require("./src/lib/db");

const PORT = process.env.PORT || 8080;

dbConnect()
  .then(() => {
    console.log("Chaan database connected :D");
    server.listen(PORT, () => {
      console.log("Server running on port 8080 <3");
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
