
const ApiError = require('../models/apierror.model')
const pool = require('../config/db')
const config = require('../config/config')
const jwt = require('')

module.exports = {

	register(req, res, next) {
		console.log('AuthController.register called')

		const query = 'INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES (?, ? ,?, ?)'

		pool.query(query, 
			[req.body.firstname, req.body.lastname, req.body.email, req.body.password], 
			function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err.sqlMessage)
				return next(new ApiError(err.sqlMessage, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
	},

	login(req, res, next) {
		console.log('AuthController.register login')

		const email = req.body.email || ''
		const password = req.body.password || ''

		// For pool initialization, see above
		pool.query("SELECT * FROM games", function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if (err) {
				console.log(err)
				return next(new ApiError(err, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
	},

	validateJWT(req,res,next){
		const token = req.header('x-access-token')
		if(!token)
		return next(new ApiError('Token missing', 420))

		jwt.verify(token, config.secretKey, (err, payload) =>{

			if(err){
				return next(new ApiError('Token invalid', 421))
			}
			console.log('Token valid')
			console.dir(payload)
			// Save user and next
			next()
		})
	}

}