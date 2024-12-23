const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const nodemailer = require("nodemailer");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const bodyParser = require("body-parser");
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to MongoDB");
});

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "astronomyclub@vnit.ac.in",
    pass: process.env.EMAILPASS,
  },
});
const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "development") {
  app.use(cors());
}
else{
  app.use(
      cors({
        origin: ["https://astrovnit.in", "http://localhost:3000"],
      })
  );
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(morgan("dev"));
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/admin", adminRoutes);
app.use("/resources", resourceRoutes);

app.post("/contact", (req, res) => {
  let mailOptions = {
    from: req.query.email,
    to: "astronomyclub@vnit.ac.in",
    subject: "From Astronomy Website",
    text: req.query.name + " " + req.query.email + " " + req.query.text,
  };

  transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
      res.send({ message: 0 });
    } else {
      console.log("Email sent successfully");
      res.send({ message: 1 });
    }
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server initialised on PORT ${PORT}`);
});
