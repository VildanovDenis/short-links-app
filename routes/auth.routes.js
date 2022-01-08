const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const config = require('config')

const router = Router()

// api/auth/register
router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password. Min password length 6').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid registration data'
                })
            }

            const { email, password } = req.body
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Cant register user with this email' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'User created '})
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
)

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Invalid password').exists()
    ],
    async (req, res) => {
        try {
            console.log(1)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login data'
                })
            }

            const { email, password } = req.body

            console.log(2)
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User  isnt exist' })
            }

            console.log(3)
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' })
            }

            const authToken = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '2h' }
            )

            res.json({ token: authToken, userId: user.id })
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
)

module.exports = router
