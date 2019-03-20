// Project: AKACHAIN
// Desc: 	Handle api call from front end then invoke function of smart contract
//			to CRUD ledger's user table
// History: Create new 2019/03/06
// 

const express = require('express');
const router = express.Router();
const socketIO = require('../app');

const invoke = require('../controller/smartcontract/invoke');
const query = require('../controller/smartcontract/query');

// Create a User
router.post('/createUser', async function (req, res) {
	// Checking secretkey 
	if (req.headers['secretkey'] != CFG_SECRETKEY) {
		logger.error('Secretkey is invalid!')
		res.send({
			status: 500,
			message: 'Secretkey is invalid!'
		});
		return
	}

	// Invoke to chaincode to create user
	logger.debug('==================== INVOKE ON CHAINCODE TO CREATE USER ==================');

	// To prepare agrs
	const user = req.body.user;
	let args = [];
	args.push(JSON.stringify(user));
	const fcn = CC_USER_CREATE;

	// To Call chaincode function to create new user record
	let transactionHash;
	try {
		transactionHash = await invoke.invokeChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, fcn, args, CFG_USER_NAME, CFG_ORG_NAME);
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: 'Creating failed!',
			err: err.message
		});
		return
	}

	// Check transaction hash
	if (!transactionHash || (transactionHash.length != TRANSACTION_LENGTH)) {
		logger.error("TransactionHash isn't correct!")
		res.send({
			status: 500,
			message: 'Creating failed!',
			err: "TransactionHash isn't correct!"
		});
		return
	}

	logger.debug('==================== SUCCESS INVOKE ON CHAINCODE TO CREATE USER ==================');
	// Response transaction hash to client show notify
	res.send({
		status: 200,
		transactionHash: transactionHash
	});

	// luckyGameController.sendMailTo(user.email, "DayLaID")
});

// Create a Lucky User
router.post('/createLuckyUser', async function (req, res) {
	// Checking secretkey 
	if (req.headers['secretkey'] != CFG_SECRETKEY) {
		logger.error('Secretkey is invalid!')
		res.send({
			status: 500,
			message: 'Secretkey is invalid!'
		});
		return
	}

	// Invoke to chaincode to create user
	logger.debug('==================== INVOKE ON CHAINCODE TO CREATE USER ==================');

	// To prepare agrs
	const user = req.body.user;
	let args = [];
	args.push(JSON.stringify(user));
	const fcn = CC_LUCKY_USER_CREATE;

	// To Call chaincode function to create new user record
	let transactionHash;
	try {
		transactionHash = await invoke.invokeChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, fcn, args, CFG_USER_NAME, CFG_ORG_NAME);
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: 'Creating failed!',
			err: err.message
		});
		return
	}

	// Check transaction hash
	if (!transactionHash || (transactionHash.length != TRANSACTION_LENGTH)) {
		logger.error("TransactionHash isn't correct!")
		res.send({
			status: 500,
			message: 'Creating failed!',
			err: "TransactionHash isn't correct!"
		});
		return
	}

	logger.debug('==================== SUCCESS INVOKE ON CHAINCODE TO CREATE LUCKY USER ==================');
	// Response transaction hash to client show notify
	res.send({
		status: 200,
		transactionHash: transactionHash
	});

	// luckyGameController.sendMailTo(user.email, "DayLaID")
});

// Get one User by User ID
router.get('/getUserByID/:userId', async function (req, res) {
	// Checking secretkey 
	if (req.headers['secretkey'] != CFG_SECRETKEY) {
		logger.error('Secretkey is invalid!')
		res.send({
			status: 500,
			message: 'Secretkey is invalid!'
		});
		return
	}

	// To Prepare agrs
	const userId = req.params.userId;
	if (!userId) {
		logger.error('Request params are invalid!')
		res.send({
			status: 500,
			message: 'Request params are invalid!',
			err: err.message
		});
		return
	}
	let args = [];
	args.push(userId);

	// Start get user by ID
	logger.debug('==================== GET USER INFOR BY ID ==================');

	const fcn = CC_GETUSERINFOBYID;
	try {
		// To Call chaincode function to create new user record
		let result = await query.queryChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, args, fcn, CFG_USER_NAME, CFG_ORG_NAME);
		let obj = JSON.parse(result);
		res.send(obj);
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: 'Getting User by ID failed!',
			err: err.message
		});
		return
	}

	logger.debug('==================== SUCCESS GET USER INFOR BY ID ==================');
	// Response transaction hash to client show notify
});

// Get a random User
router.get('/getRandomUser', async function (req, res) {
	// Checking secretkey 
	if (req.headers['secretkey'] != CFG_SECRETKEY) {
		logger.error('Secretkey is invalid!')
		res.send({
			status: 500,
			message: 'Secretkey is invalid!'
		});
	}

	logger.debug('==================== GET A RANDOM USER ==================');

	let args = [];
	const fcn = CC_GETRANDOMUSER;
	try {
		// To Call chaincode function to create new user record
		let result = await query.queryChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, args, fcn, CFG_USER_NAME, CFG_ORG_NAME);
		let obj = JSON.parse(result);
		res.send(obj);

		logger.debug('==================== START CREATE A LUCKY USER ==================');

		// To prepare agrs
		let user = obj.rows
		logger.info(user)
		args.push(JSON.stringify(user));
		const fcn2 = CC_LUCKY_USER_CREATE;

		// To Call chaincode function to create new user record
		let transactionHash;
		try {
			transactionHash = await invoke.invokeChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, fcn2, args, CFG_USER_NAME, CFG_ORG_NAME);
			// Send socket
			socketIO.io.emit("new-lucky-guy", user)
		} catch (err) {
			logger.error(err)
			res.send({
				status: 500,
				message: 'Creating failed!',
				err: err.message
			});
			return
		}

		// Check transaction hash
		if (!transactionHash || (transactionHash.length != TRANSACTION_LENGTH)) {
			logger.error("TransactionHash isn't correct!")
			res.send({
				status: 500,
				message: 'Creating failed!',
				err: "TransactionHash isn't correct!"
			});
			return
		}

		logger.debug('==================== SUCCESS INVOKE ON CHAINCODE TO CREATE LUCKY USER ==================');

		logger.debug('==================== SUCCESS CREATE A LUCKY USER ==================');

	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: 'Get a random User failed!',
			err: err.message
		});
		return
	}

	logger.debug('==================== SUCCESS GET USER INFO BY ID ==================');
});

// Get a User by Email
router.get('/getUserByEmail/:email', async function (req, res) {
	// Checking secretkey 
	if (req.headers['secretkey'] != CFG_SECRETKEY) {
		logger.error('Secretkey is invalid!')
		res.send({
			status: 500,
			message: 'Secretkey is invalid!'
		});
		return
	}

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

	// To Prepare args
	let args = [];
	args.push(email);
	let fcn = CC_GETUSERINFOBYEMAIL;

	logger.debug('==================== GET USER INFOR BY EMAIL ==================');

	try {
		// To Call chaincode function to create new user record
		let result = await query.queryChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, args, fcn, CFG_USER_NAME, CFG_ORG_NAME);
		let obj = JSON.parse(result);
		res.send(obj);
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: 'Get User by ID failed!',
			err: err.message
		});
		return
	}

	logger.debug('==================== SUCCESS GET USER INFOR BY EMAIL ==================');
	// Response transaction hash to client show notify
});

// Get all User
router.get('/getAllUser', async function (req, res) {
	// Checking secretkey 
	if (req.headers['secretkey'] != CFG_SECRETKEY) {
		logger.error('Secretkey is invalid!')
		res.send({
			status: 500,
			message: 'Secretkey is invalid!'
		});
		return
	}

	logger.debug('==================== GET ALL USER ==================');

	// To Prepare args
	const fcn = CC_GETALLUSER;
	try {
		// To Call chaincode function to create new user record
		let result = await query.queryChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, ' ', fcn, CFG_USER_NAME, CFG_ORG_NAME);
		let obj = JSON.parse(result);
		res.send(obj);
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: 'Get all user failed!',
			err: err.message
		});
		return
	}

	logger.debug('==================== SUCCESS GET ALL USER ==================');
	// Response transaction hash to client show notify

});

// Get all Lucky User
router.get('/getAllLuckyUser', async function (req, res) {
	// Checking secretkey 
	if (req.headers['secretkey'] != CFG_SECRETKEY) {
		logger.error('Secretkey is invalid!')
		res.send({
			status: 500,
			message: 'Secretkey is invalid!'
		});
		return
	}

	logger.debug('==================== GET ALL USER ==================');

	// To Prepare args
	const fcn = CC_GETALLLUCKYUSER;
	try {
		// To Call chaincode function to create new user record
		let result = await query.queryChaincode(CFG_PEER, CFG_CHANNEL_NAME, CFG_CC_NAME, ' ', fcn, CFG_USER_NAME, CFG_ORG_NAME);
		let obj = JSON.parse(result);
		res.send(obj);
	} catch (err) {
		logger.error(err)
		res.send({
			status: 500,
			message: 'Get all lucky user failed!',
			err: err.message
		});
		return
	}

	logger.debug('==================== SUCCESS GET ALL USER ==================');
	// Response transaction hash to client show notify

});

module.exports = router;