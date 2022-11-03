const express = require('express'); //import express
const mongoose =require('mongoose'); //import mongoose to communicate with mongodb atlas
const bodyParser = require('body-parser'); //body parser used......
const cors = require('cors');
const multer = require('multer');
const Pusher = require("pusher");
var path = require("path");
const fileupload = require("express-fileupload");



const app = express(); //invoke express

//import routes
const empsalaryRoutes = require('./routes/salarymgmt');
const addiempsalaryRoutes = require('./routes/Addisalary');
const empsalaryperRoutes = require("./routes/percentageedit");
const employeeRoutes = require("./routes/employee");
const bankaccountRoute = require("./routes/bankaccount");
const departmentRoute = require("./routes/department");
const chatRoute = require("./routes/chat");
const projRoutes = require('./routes/Projects');
const taskRoutes = require('./routes/Tasks');
const empleave = require('./routes/empleave');
const emptimesheet = require('./routes/emptimesheet');
const shifts = require('./routes/shifts');
const emptimesheetuser = require('./routes/emptimesheetuser');



// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(fileupload());

//route middleware
app.use(empsalaryRoutes);
app.use(addiempsalaryRoutes);
app.use(empsalaryperRoutes);
app.use(employeeRoutes);
app.use(bankaccountRoute);
app.use(departmentRoute);
app.use(chatRoute);
app.use(projRoutes);
app.use(taskRoutes);
app.use(shifts);
app.use(empleave);
app.use(emptimesheet);
app.use(emptimesheetuser);

const pusher = new Pusher({
    appId: "1488965",
    key: "804e94585cde1b22f4d5",
    secret: "7bb2fcfb200e500caf2a",
    cluster: "ap2",
    useTLS: true,
  });
  
  const db = mongoose.connection;
  
  db.once("open", () => {
    console.log("Database connected");
  
    const msgCollection = db.collection("chats");
    const changeStream = msgCollection.watch();
  
    changeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
          chatId: messageDetails.chatId,
          message: messageDetails.message,
          arisedBy: messageDetails.arisedBy,
          sentTo: messageDetails.sentTo,
          timestamp: messageDetails.timestamp,
        });
      } else {
        console.log("Error triggering pusher");
      }
    });
  });
  
  pusher.trigger("my-channel", "my-event", {
    message: "hello world",
  });
  
  const PORT = 8400;
  const DB_URL =
    "mongodb://admin:12345@ac-aa2tjaz-shard-00-00.arxuhal.mongodb.net:27017,ac-aa2tjaz-shard-00-01.arxuhal.mongodb.net:27017,ac-aa2tjaz-shard-00-02.arxuhal.mongodb.net:27017/?ssl=true&replicaSet=atlas-111vzs-shard-0&authSource=admin&retryWrites=true&w=majority";
  
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => console.log("DB Connection error", err));
  
  app.post("/upload", (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    const destination = path.join(
      __dirname,
      "../frontend/src/Components/Employee/components/Images",
      Date.now() + file.name
    );
  
    file.mv(destination, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ filePath: destination, type: file.mimetype });
      console.log({ filePath: destination, type: file.mimetype });
    });
  });
  
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
  });