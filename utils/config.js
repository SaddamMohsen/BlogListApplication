require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.REMOTE_URL;
if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.REMOT_TEST_URL;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
