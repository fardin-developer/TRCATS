const express = require('express');
const SystemId = require('../Model/SystemId');
const router = express.Router();

router.post('/create-systemid', async (req, res) => {
    const { systemID } = req.body;
    try {
        const existsystemID = await SystemId.findOne({ systemID });
        if (!existsystemID) {
            const createSystemID = new SystemId({
                systemID: systemID
            });
            await createSystemID.save();
            res.json({
                success: true,
                message: "system id created successfully"
            });
        } else {
            res.json({
                success: false,
                message: "system id already exists"
            });
        }
    } catch (error) {
        console.error("Error in creating system ID:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
router.get('/get-all-systemid',async(req,res)=>{
    try {
        const systemid = await SystemId.find();
        res.json({
            success:true,
            data:systemid
        })

    } catch (error) {
        res.json({
            success:false,
            data:"something wrong"
        })
    }

})

module.exports = router;
