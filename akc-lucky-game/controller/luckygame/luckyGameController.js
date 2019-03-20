const nodemailer = require('nodemailer');
var googleApi = require('../googleapi/googleSheetApi');

const sendMailTo = async (email, id) => new Promise((resolve, reject) => {
    let host = 'dev.akachain.io';
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'longnv1a@gmail.com',
            pass: 'Ahihi@321'
        }
    });

    // setup e-mail data
    let mailOptions = {
        from: '"Akachain " <noreply@akachains.io>', // sender address (who sends)
        to: email, // list of receivers (who receives)
        subject: 'BLOCKCHAIN KNOWLEDGE SHARING', // Subject line
        html: `
      <label style="font-weight: 600">Welcome to Akachain!</label>
      <br><br>Chỉ là test phát thôi :))
	  <br><br><b 
            style="
            display: block;
            width: 200px;
			padding: 10px;
			background: #465294;
			text-align: center;
			border-radius: 5px;
			color: white;
            ">
            ${id}
            </b>
	  <br><br>Thank you,
	  <br>Akachain Team
	  `
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            reject(err)
        } else {
            resolve("Sent an email to: " + info.accepted)
        }
    });
})

// Get data from Google Form
const getGoogleFormData = async () => new Promise((resolve, reject) => {
    googleApi.getFormResponse((err, res) => {
        if (err) {
            reject(err)
        } else {
            resolve(res)
        }
    })
})

module.exports = {
    sendMailTo,
    getGoogleFormData
}