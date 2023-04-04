const express = require('express')
const router = express.Router()
const iceCream = require('../models/icecreamModel')

// Getting all
router.get('/', async (req, res)=>{
    try {
        let limit
        let sortBy 
        let avalible
        if (req.query.limit != null) {
            limit = req.query.limit
        }

        if (req.query.sort != null) {
            sortBy = req.query.sort
        } 

        if(req.query.avalible != null) {
            avalible = req.query.avalible
            const icecream = await iceCream.find({avalible: avalible}).limit(limit).sort({ name:sortBy })
            res.json(icecream)
            return
        }
        const icecream = await iceCream.find().limit(limit).sort({ name:sortBy })
        res.json(icecream)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/', async (req, res)=>{
    try {
        const icecream = await iceCream.find().limit(req.params.limit)
        res.json(icecream)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getIcecream, (req, res)=>{
    res.json(res.icecream)
})
// Creating one
router.post('/', async (req, res) => {
    
    const icecream = new iceCream( {
        name: req.body.name,
        description: req.body.description,
        rating: req.body.rating,
        flavour: req.body.flavour,
        avalible: req.body.avalible
    })

    try {
        const newIceCream = await icecream.save()
        res.status(201).json(newIceCream)  
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getIcecream, async (req, res) => {
    if (req.body.name != null) {
        res.icecream.name = req.body.name
    }

    if (req.body.description != null) {
        res.icecream.description = req.body.description
    }

    if (req.body.rating != null) {
        res.icecream.rating = req.body.rating
    }

    if (req.body.flavour != null) {
        res.icecream.flavour = req.body.flavour
    }

    if (req.body.avalible != null) {
        res.icecream.avalible = req.body.avalible
    }
    try {
        const updatedIcecream = await res.icecream.save()
        res.send(updatedIcecream)
    } catch(err) {
        res.send({message: err.message})
    }
    
})

// Deleting One
router.delete('/:id', getIcecream, async (req, res) => {
    try {
        await iceCream.findOneAndRemove(res.iceCream)
        res.send({message: "Deleted icecream"})
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
})

async function getIcecream(req,res,next) {
    let icecream
    try {
        icecream = await iceCream.findById(req.params.id)
        if (icecream == null) {
            return res.status(404).json({message: "Cannot find icecream"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.icecream = icecream
    next()
}

module.exports = router
