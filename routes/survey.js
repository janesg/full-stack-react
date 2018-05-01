const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const hasCredit = require('../middlewares/hasCredit');

// Testing frameworks can sometimes experience issues
// if same mongoose schema is required multiple times
// therefore we ask mongoose for the schema instead
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, hasCredit, (req, res) => {
        // Using ES6 destructuring
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            // Note: in map function JS interpreter needs () around
            // returned object so it doesn't think it's an arrow function
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,     // Mongoose-generated id
            dateSent: Date.now()
        });
    });
};
