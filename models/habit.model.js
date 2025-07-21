const mongoose = require("mongoose");

const habitSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        goal: {
            type: Number,
            default: 1
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        streak: {
            type: Number,
            default: 0
        },

        habitType: {
            type: String,
            enum: ["daily", "weekly", "monthly"],
            default: "daily"
        },

        history: [
        {
            date: {
            type: Date,
            required: true
            },
            completed: {
            type: Boolean,
            default: false
            }
        }
        ],

        isActive: {
            type: Boolean,
            default: true
        },

        daysOfWeek: [
        {
            type: String,
            enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
        ]
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Habit",habitSchema)