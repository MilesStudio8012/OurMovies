const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    creationDate: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    pictureName: {
        type: String
    },
    usersIn: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = mongoose.model('Channel', channelSchema)