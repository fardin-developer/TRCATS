const User = require('../Model/UserModel');
const DailyLog = require('../Model/dailyLogSchema')
const moment = require('moment-timezone')
exports.postDailyLog = async (req, res) => {
    const now = moment().tz("Asia/Kolkata");
    const formattedDate = now.format("YYYY-MM-DDTHH:mm:ss.SSS") + 'Z';
    const formattedDateInDateObj = new Date(formattedDate);
    const todayIST = now.startOf('day');
    let actualtoday = todayIST.valueOf();
    // console.log(formattedDateInDateObj);
    const {
        OperatorName,
        Temperature_C,
        pH_of_the_reaction_zone,
        Feedstock_quantity_fed_kg,
        Amount_of_water_mixed_liters,
        Feedstock_source,
        Feedstock_type,
        Height_of_floating_dome_before_use_of_gas_cm,
        Duration_of_gas_utilization_in_stove_minutes,
        Slurry_Produced_kg,
        Slurry_pH,
        Slurry_used_for,
        Remarks_if_any
    } = req.body;
    let userId = req.userId
    // const user = await User.findById(req.userId);
    let dailylogExist = await DailyLog.findOne({
        userID: userId,
        date: {
            $gte: actualtoday,
            $lt: actualtoday + (24 * 60 * 60 * 1000)
        }
    })
    console.log(dailylogExist);
    if (dailylogExist) {
        return res.status(500).json({
            success: false,
            data: " Already exist"
        })
    } else {
        let dailyLog = new DailyLog({
            userID: req.userId,
            date: formattedDateInDateObj,
            OperatorName,
            Temperature_C,
            pH_of_the_reaction_zone,
            Feedstock_quantity_fed_kg,
            Amount_of_water_mixed_liters,
            Feedstock_source,
            Feedstock_type,
            Height_of_floating_dome_before_use_of_gas_cm,
            Duration_of_gas_utilization_in_stove_minutes,
            Slurry_Produced_kg,
            Slurry_pH,
            Slurry_used_for,
            Remarks_if_any

        })
        await dailyLog.save()

        return res.status(200).json({
            success: true,
            data: dailyLog
        })
    }


}