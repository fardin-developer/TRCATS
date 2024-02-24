const multer = require('multer')
const multerconfig = ()=>{
    const upload = multer({
        dest: 'uploads/' // Destination folder for uploaded files
    })
}


module.exports = multerconfig