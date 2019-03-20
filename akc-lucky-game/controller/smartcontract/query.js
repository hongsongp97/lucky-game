var util = require('util');
var helper = require('../common/helper');
var logger = helper.getLogger('Query');

var queryChaincode = (peer, channelName, chaincodeName, args, fcn, username, org_name) => new Promise(async (resolve, reject) => {
	try {
		// first setup the client for this org
		var client = await helper.getClientForOrg(org_name, username);
		logger.debug('Successfully got the fabric client for the organization "%s"', org_name);
		var channel = client.getChannel(channelName);
		if(!channel) {
			let message = util.format('Channel %s was not defined in the connection profile', channelName);
			logger.error(message);
			throw new Error(message);
		}

		// send query
		var request = {
			targets : [peer], //queryByChaincode allows for multiple targets
			chaincodeId: chaincodeName,
			fcn: fcn,
			args: args
		};
		let response_payloads = await channel.queryByChaincode(request);
		if (response_payloads) {
			for (let i = 0; i < response_payloads.length; i++) {
				logger.info(response_payloads[i].toString('utf8'));
			}

			if (response_payloads[0].message) {
				let err = JSON.parse(response_payloads[0].message)
				logger.error(util.format('Failed to query due to error: %j', err));
				reject(new Error(err.msg))
			}
			resolve(response_payloads[0].toString('utf8'));
		} else {
			logger.error('response_payloads is null');
			reject('response_payloads is null')
		}
	} catch(error) {
		logger.error('Failed to query due to error: ' + error.stack ? error.stack : error);
		reject(error)
	}
});

exports.queryChaincode = queryChaincode;