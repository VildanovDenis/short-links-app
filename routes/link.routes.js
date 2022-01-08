const { Router } = require('express')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const Link = require('../models/Link')
const shortid = require('shortid')

const router = Router()

// api/link/generate
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body

        const linkFromDatabase = await Link.findOne({ from })

        if (linkFromDatabase) {
            return res.json({ link: linkFromDatabase })
        }

        const code = shortid.generate()
        const to = `${baseUrl}/t/${code}`

        const link = new Link({
            code, from, to, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

// api/link/:id
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})


// api/link/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

module.exports = router
