const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    // Doing validation on express
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimum password length 6 characters')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            //Check if we already have one Email in req.body
            if (candidate) {
                return res.status(400).json({message: 'Such user already exists'})
            }

            // If there is no Email then we can register a new user
            // hashing the password and create user
            const hashedPassword = await bcrypt.hash(password, 6)

            const user = new User({email, password: hashedPassword})

            await user.save()

            // when the user was save, we make a response about the creation of the status code 201
            res.status(201).json({message: 'User created'})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, please try again'})
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login information'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }

            //Checking if passwords match
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong password, please try again' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, please try again' })
        }
    })

module.exports = router