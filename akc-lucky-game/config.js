var util = require('util');
var path = require('path');
var hfc = require('fabric-client');

var file = 'network-config%s.yaml';

var env = process.env.TARGET_NETWORK;
if (env)
    file = util.format(file, '-' + env);
else
    file = util.format(file, '');
// indicate to the application where the setup file is located so it able
// to have the hfc load it to initalize the fabric client instance
hfc.setConfigSetting('network-connection-profile-path',path.join(__dirname, 'artifacts' ,file));
hfc.setConfigSetting('akc-connection-profile-path',path.join(__dirname, 'artifacts', 'akc.yaml'));
// some other settings the application might need to know
hfc.addConfigFile(path.join(__dirname, 'config.json'));

// Blockchain network constant defination
global.CFG_PEER = 'network-akc-peer0.akc.com';
global.CFG_CHANNEL_NAME = 'akcchannel';
global.CFG_CC_NAME = 'lucky_game';
global.CFG_USER_NAME = 'akc';
global.CFG_ORG_NAME = 'akc';

// Chaincode function constant defination for USER
global.CC_USER_CREATE = 'CreateUser';
global.CC_LUCKY_USER_CREATE = 'CreateLuckyUser';
global.CC_USER_UPDATE = 'UpdateUser';
global.CC_DELETEUSERBYID = 'DeleteUser';
global.CC_GETUSERINFOBYID = 'getUserByID';
global.CC_GETUSERINFOBYEMAIL = 'getUserByEmail';
global.CC_GETALLUSER = 'getAllUser';
global.CC_GETALLLUCKYUSER = 'getLuckyUser';
global.CC_GETRANDOMUSER = 'getRandomUser';


// Length constant
global.USER_MODEL_LENGTH = 7;
global.TRANSACTION_LENGTH = 64;

// secretkey constant
global.CFG_SECRETKEY = "391090"

