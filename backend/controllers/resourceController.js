const mongoose = require('mongoose');
const { Resource } = require('../models/resModel');

exports.getResources = async (req, res) => {
    try {
        const data = await Resource.find({});
        res.status(200).json({ message: 1, data: data });
    } catch (err) {
        console.error('Error fetching resources:', err);
        res.status(500).json({ message: 0, error: 'Internal Server Error' });
    }
};
