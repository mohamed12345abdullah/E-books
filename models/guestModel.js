const mongoose = require('mongoose');


const GuestSchema = new mongoose.Schema({

    ip: {
        type: String,
        required: true
    },
    numberOfVisits: {
        type: Number,
        default: 1
    },
    history: [
        {
            startTime: { type: Date, default: Date.now },
            endTime: { type: Date, default: Date.now },
            timeSpent: { type: Number, default: 0 },    
        }
    ]

})

const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;
