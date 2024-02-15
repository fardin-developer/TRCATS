exports.instructionGet = (req,res)=>{
    try {
        res.status(200).json({
            "img_link":"https://res.cloudinary.com/glide/image/fetch/f_auto,w_525,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2FkoRARL1DhFChyhkGXkks%2Fpub%2FQxHJv6MKJI84AcYyZXre.png",
            "btn_link":"https://drive.google.com/file/d/1eVG88sPTnC5tbld7j2HKugU5in3Ha5WO/view"
        })
    } catch (error) {
        
    }
}