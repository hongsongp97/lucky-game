// Project: AKACHAIN
// Desc: 	Handle api call from front end then invoke function of smart contract
//			to CRUD ledger's user table
// History: Create new 2019/03/06
// 

const express = require('express');
const router = express.Router();

const luckyGameController = require('../controller/luckygame/luckyGameController');

// Send email to
router.get('/sendEmailTo/:email', async (req, res) => {
	// Checking params
	let email = req.params.email;
	if (!email) {
		logger.error('Request params are invalid!')
		res.send({
			status: 500,
			message: 'Request params are invalid!'
		});
		return
	}

	// Send email
	try {
		let result = await luckyGameController.sendMailTo(email, "Con zai bo an shit.")
		logger.info(result)
		res.send({
			status: 200,
			message: result
		});
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: "Sending email failed!",
			err: err.message
		});
	}
})

module.exports = router;