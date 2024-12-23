const mongoose = require('mongoose');
const { Blog } = require('../models/blogModel');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isApproved: true });
    res.status(200).json({ message: 1, data: blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 0, error: 'Failed to fetch blogs' });
  }
};

exports.getData = async (req, res) => {
  try {
    const blog = await Blog.findById(req.query.id);
    if (!blog) {
      return res.status(404).json({ message: 0, error: 'Blog not found' });
    }
    res.status(200).json({ message: 1, data: blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 0, error: 'Failed to fetch blog data' });
  }
};

exports.getBlogData = async (req, res) => {
  try {
    const blog = await Blog.findById(req.query.id);
    if (!blog) {
      return res.status(404).json({ data: [] });
    }
    res.status(200).json({ data: blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: [] });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const result = await Blog.updateOne(
        { _id: req.query.blogid, isApproved: false },
        { name: req.query.name, title: req.query.title, blog: req.query.blog }
    );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: 1 });
    } else {
      res.status(400).json({ message: 2 });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 2, error: 'Failed to update blog' });
  }
};

exports.pending = async (req, res) => {
  try {
    const pendingBlogs = await Blog.find({ isApproved: false });
    res.status(200).json({ message: 1, data: pendingBlogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 0, error: 'Failed to fetch pending blogs' });
  }
};

exports.postblog = async (req, res) => {
  try {
    const data = req.query;
    const date = new Date();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dateNow = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const timeNow = `${hours}:${minutes} ${ampm}`;

    const newBlog = new Blog({
      isApproved: false,
      name: data.name,
      title: data.title,
      blog: data.blog,
      date: dateNow,
      time: timeNow,
      userId: data.userId,
      message: undefined,
    });

    await newBlog.save();
    res.status(201).json({ message: 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 2, error: 'Failed to create blog' });
  }
};

exports.approve = async (req, res) => {
  try {
    await Blog.updateOne(
        { _id: req.query.id },
        { isApproved: true, message: req.query.message }
    );

    const pendingBlogs = await Blog.find({ isApproved: false });
    res.status(200).json({ message: 1, data: pendingBlogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 0, error: 'Failed to approve blog' });
  }
};

exports.reject = async (req, res) => {
  try {
    await Blog.updateOne(
        { _id: req.query.id },
        { message: req.query.message }
    );

    const pendingBlogs = await Blog.find({ isApproved: false });
    res.status(200).json({ message: 2, data: pendingBlogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 0, error: 'Failed to reject blog' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.query.id });

    const pendingBlogs = await Blog.find({ isApproved: false });
    res.status(200).json({ message: 3, data: pendingBlogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 0, error: 'Failed to delete blog' });
  }
};
