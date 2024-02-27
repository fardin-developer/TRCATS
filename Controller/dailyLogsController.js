const User = require('../Model/UserModel')
const DailyLog = require('../Model/dailyLogSchema')
const moment = require('moment-timezone');
const mongoose = require('mongoose')

exports.postDailyLog = async (req, res) => {
  const now = moment().tz('Asia/Kolkata')
  const formattedDate = now.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
  const formattedDateInDateObj = new Date(formattedDate)
  const todayIST = now.startOf('day')
  let actualtoday = todayIST.valueOf()
  // console.log(formattedDateInDateObj);
  const {
    SystemID,
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
  } = req.body
  let userId = req.userId
  console.log(userId)
  // const user = await User.findById(req.userId);
  let dailylogExist = await DailyLog.findOne({
    userID: userId,
    date: {
      $gte: actualtoday,
      $lt: actualtoday + 24 * 60 * 60 * 1000
    }
  })
  console.log(dailylogExist)
  if (dailylogExist) {
    return res.status(500).json({
      success: false,
      data: 'already exist'
    })
  } else {
    let dailyLog = new DailyLog({
      SystemID,
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

exports.lastSevenDaysScore = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const sevenDaysAgo = moment()
      .tz('Asia/Kolkata')
      .subtract(7, 'days')
      .startOf('day')

    // Aggregate scores for the last 7 days
    const scoreHistory = await DailyLog.aggregate([
      {
        $match: {
          date: { $gte: sevenDaysAgo.toDate() },
          userID:userId,
          scoreStatus: true
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          score: { $sum: '$score' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])
    let totalScore = 0

    scoreHistory.forEach(item => {
      totalScore += item.score
    })

    res.status(200).json({
      success: true,
      scoreHistory: scoreHistory,
      totalScore
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

exports.yourDailyData = async (req, res) => {
  try {
    const userID = req.userId // Assuming req.userId is correctly available

    const sevenDaysAgo = moment()
      .tz('Asia/Kolkata')
      .subtract(7, 'days')
      .startOf('day')
    console.log('Seven days ago:', sevenDaysAgo.toDate())

    const data = await DailyLog.find({
      date: { $gte: sevenDaysAgo.toDate() },
      userID
    })

    res.status(200).json({
        success:true,
        data:data
    }) // Assuming you're sending data back as JSON
  } catch (error) {
    res.status(500).json({
        success:false,
        data:"something wents wrong"
    }) // Proper error handling
  }
}
