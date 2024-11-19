const mongoose = require("mongoose");
let blogSchema = mongoose.Schema({
  isApproved: Boolean,
  name: String,
  title: String,
  blog: String,
  date: String,
  time: String,
  userId: String,
  message: String,
});
const Blog = mongoose.model("blog", blogSchema);

module.exports = { Blog };

// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema({
//   isApproved: { type: Boolean, default: false },
//   name: { type: String, required: true },
//   title: { type: String, required: true },
//   blog: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   time: { type: Date, default: Date.now },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   message: { type: String },
// });

// const Blog = mongoose.model("Blog", blogSchema);

// module.exports = { Blog };

