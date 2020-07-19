"use strict";
const LogModel = require('../models/log');
const mongoose = require('mongoose');

const getRecentRecords = (req, res) => {
    LogModel.aggregate([{$match: {userId: mongoose.Types.ObjectId(req.userId)}}, //select logs with userId
            {$sort: {date: -1}},
            {$group: {_id: '$recordId',}}, // no duplicates
            {$lookup: {from: 'records', localField: '_id', foreignField: '_id', as: 'records'}}, //join with records to get name
            {$unwind: "$records"}, // 1 output for each record
            {
                "$project": { // structure output
                    "_id": 0,
                    "recordId": "$records._id",
                    "name": "$records.name"

                }
            }
        ],
        function (err, logs) {
            if (err)
                res.status(400).json({
                    error: 'Internal server error',
                    message: err.message,

                });
            else {
                res.status(200).json(logs.slice(0, 4));

            }

        });
}


module.exports = {
    getRecentRecords,
};