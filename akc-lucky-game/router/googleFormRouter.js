// Project: AKACHAIN
// Desc: 	Handle api call from front end then invoke function of smart contract
//			to CRUD ledger's user table
// History: Create new 2019/03/06
// 

const express = require('express');
const router = express.Router();

const invoke = require('../controller/smartcontract/invoke');
const luckyGameController = require('../controller/luckygame/luckyGameController');
const Promise = require('bluebird')

// Get Google Form Data
router.get('/getData', async (req, res) => {
	try {
		// Get data from Google Form
		logger.debug('==================== START GETTING DATA FROM GOOGLE FORM ==================');

		let data = await luckyGameController.getGoogleFormData()
		// End get data from Google Form
		logger.debug('==================== SUCCESS GET DATA FROM GOOGLE FORM ==================');

		res.send({
			status: 200,
			data: data
		})
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: "Getting data failed!",
			err: err.message
		})
	}
})

// Get Google Form Data then Create users correspondingly
router.get('/getData/createUser', async (req, res) => {
	// Checking secretkey 
	if (req.headers['secretkey'] != CFG_SECRETKEY) {
		logger.error('Secretkey is invalid!')
		res.send({
			status: 500,
			message: 'Secretkey is invalid!'
		});
		return
	}

	try {
		// Get data from Google Form
		logger.debug('==================== START GETTING DATA FROM GOOGLE FORM ==================');

		let data = await luckyGameController.getGoogleFormData()
		// End get data from Google Form
		logger.debug('==================== SUCCESS GET DATA FROM GOOGLE FORM ==================');

		// Invoke to chaincode to create gotten users
		logger.debug('==================== INVOKE ON CHAINCODE TO CREATE USERS ==================');

		await Promise.mapSeries(data, async element => {
			// To Prepare agrs
			let user = {
				name: element.name,
				email: element.email
			}
			let args = [];
			args.push(JSON.stringify(user));
			const fcn = CC_USER_CREATE;

			// To Call chaincode function to create new user record
			let transactionHash;
			try {
				transactionHash = await invoke.invokeChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, fcn, args, CFG_USER_NAME, CFG_ORG_NAME);
			} catch (err) {
				logger.error(err)
				return
			}

			// Check transaction hash
			if (!transactionHash || (transactionHash.length != TRANSACTION_LENGTH)) {
				logger.error("TransactionHash isn't correct!")
				return
			}
		})
		// End invoke to create users
		logger.debug('==================== SUCCESS INVOKE ON CHAINCODE TO CREATE USER ==================');

		res.send({
			status: 200,
			data: data
		})
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: 'Creating failed!',
			err: err.message
		})
	}
})

module.exports = router;