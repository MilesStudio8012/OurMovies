const express = require('express')
const router = express.Router()
const Channel = require('../models/channel')
const User = require('../models/user')

// All channels route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !==''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    const channels = await Channel.find(searchOptions).catch(error => {
        res.status(400).redirect('/')
    })
    res.render('channels/index', {
        channels: channels,
        searchOptions: req.query
    })
})

// New channel route
router.get('/new', (req, res) => {
    res.render('channels/new', {channel: new Channel()})
})

// Create Movie route 
router.post('/', async (req, res) => {
    const channel = new Channel({
        name: req.body.name
    })
    
    const newChannel = await channel.save().catch(error => {
        res.status(400).render('channels/new', {
            channel: channel,
            errorMessage: "Error creating movie"
        })
    })
    res.status(201).redirect(`channels`)
    //res.status(201).redirect(`movies/${newMovie.id}`)
   
})

module.exports = router