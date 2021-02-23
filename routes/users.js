const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const User = require('../models/user')
const uploadPath = path.join('public', User.pictureBasePath)
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
const Channel = require('../models/channel')
const upload = multer({
    destination: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// All User route
router.get('/', async (req, res) => {
    let query = User.find()
    if (req.query.name != null && req.query.name != '') {
        query = query.regex('title', new RegExp(req.query.name, 'i'))
    }
    try {
        const users = await query.exec()
        res.render('users/index', { 
            users: users,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New User route
router.get('/new', async (req, res) => {
    renderNewPage(res, new User())
})

// Create User route 
router.post('/', upload.single('picture'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        description: req.body.description,
        pseudo: req.body.pseudo,
        email: req.body.email,
        pictureName: fileName,
        channel: req.body.channel   
    })
    
    try {
        const newUser = await user.save()
    } catch {
        renderNewPage(res, new User(), true)
    }
    
})


async function renderNewPage(res, user, hasError = false) {
    try {
        const channels = await Channel.find({})
        const params = {
            channels: channels, 
            user: user
        }
        if (hasError) params.errorMessage = 'Error Creating User'
        res.render('users/new', params)
    } catch {
        renderNewPage(res, new User(), true)
    }
}
module.exports = router