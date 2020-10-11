const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//Validation
const { validateUserData } = require('../util/validate')




router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;

	const { valid, errors } = validateUserData(name, email, password);
	if (!valid) return res.status(400).json(errors);
	///check email in mdb
	const emailExist = await User.findOne({ email })
	if (emailExist) return res.status(400).send('Email already exists.')
	///hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt)
	try {
		///		Example 1
		// const user = await User.create({ name, email, password });
		// res.status(201).json(user)
		///       Example 2
		const user = new User({
			name, email, password: hashedPassword,
		});
		const savedUser = await user.save()
		res.status(201).json({ created_user_id: savedUser._id })
	} catch (err) {
		// const { valid, errors } = validateUserData(name, email, password);
		// if (!valid) return res.status(400).json({ errors, err });
		res.status(400).send(err)
	}
})
///		LOGIN
router.post('/login', async (req, res) => {
	const { name, email, password } = req.body;
	const { valid, errors } = validateUserData(name, email, password);
	if (!valid) return res.status(400).json(errors);
	///check email in mdb
	const user = await User.findOne({ email })
	if (!user) return res.status(400).send('Email or password is wrong')
	///Password is correct
	const validPassword = await bcrypt.compare(password, user.password)
	if (!validPassword) return res.status(400).send('Invalid password.')

	///Create and sign token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
	res.header('auth-token', token).send(token)

})

module.exports = router
