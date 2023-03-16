require("dotenv").config();

let PORT = 3000;
let MONGODB_URI ="mongodb+srv://saddam:wmgkosdj!#Sad1990@ascapcluster.nhfu8.mongodb.net/?retryWrites=true&w=majority";
if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.REMOT_TEST_URL;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
