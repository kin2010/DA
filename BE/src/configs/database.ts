import mongoose, { Error } from "mongoose";
import configs from "./appConfig";
import log from "../utils/logger";
// //, {
//       // useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
const connectToDb = async () => {
  try {
    log.info("Connect to database successfully", configs.dbUri);
    return await mongoose.connect(configs.dbUri);
  } catch (e: any) {
    log.error("Can not connect to database", e);
    // process.exit(1);
  }
};

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'yourusername',
//   password: 'yourpassword',
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected!');
// });
export default connectToDb;
