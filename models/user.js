const mongoose = require('mongoose')

const pictureBasePath = 'uploads/UserPictures'

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    pseudo: {
        type: String, 
        required: true
    },
    creationDate: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    email: {
        type: String, 
        required: true
    },
    pictureName: {
        type: String
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Channel'
    }
})

module.exports = mongoose.model('User', userSchema)
module.exports.pictureBasePath = pictureBasePath