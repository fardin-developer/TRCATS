const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    OperatorName: {
        type: String,
        required: true
    },
    Temperature_C: {
        type: Number,
        required: true
    },
    pH_of_the_reaction_zone: {
        type: Number,
        required: true
    },
    Feedstock_quantity_fed_kg: {
        type: Number,
        required: true
    },
    Amount_of_water_mixed_liters: {
        type: Number,
        required: true
    },
    Feedstock_source: {
        type: String,
        required: true
    },
    Feedstock_type: {
        type: String,
        required: true
    },
    Height_of_floating_dome_before_use_of_gas_cm: {
        type: Number,
        required: true
    },
    Duration_of_gas_utilization_in_stove_minutes: {
        type: Number,
        required: true
    },
    Slurry_Produced_kg: {
        type: Number,
        required: true
    },
    Slurry_pH: {
        type: Number,
        required: true
    },
    Slurry_used_for: {
        type: String,
        required: true
    },
    Remarks_if_any: {
        type: String
    }
});

const DailyLog = mongoose.model('DailyLog', dailyLogSchema);

module.exports = DailyLog;
