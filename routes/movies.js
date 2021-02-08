const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// All movies route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !==''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    const movies = await Movie.find(searchOptions).catch(error => {
        res.status(400).redirect('/')
    })
    res.render('movies/index', {
        movies: movies,
        searchOptions: req.query
    })
})

// New Movie route
router.get('/new', (req, res) => {
    res.render('movies/new', {movie: new Movie()})
})

// Create Movie route 
router.post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name
    })
    
    const newMovie = await movie.save().catch(error => {
        res.status(400).render('movies/new', {
            movie: movie,
            errorMessage: "Error creating movie"
        })
    })
    res.status(201).redirect(`movies`)
    //res.status(201).redirect(`movies/${newMovie.id}`)
   
})

module.exports = router