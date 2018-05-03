const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const hasCredit = require('../middlewares/hasCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// Testing frameworks can sometimes experience issues
// if same mongoose schema is required multiple times
// therefore we ask mongoose for the schema instead
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thank you voting !');
    });

    app.post('/api/surveys', requireLogin, hasCredit, async (req, res) => {
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

        // Send an email !!!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            // Async function
            await mailer.send();

            // Save the survey & credit count on user
            await survey.save();

            req.user.credits  -= 1;
            const user = await req.user.save();

            // Respond with updated user
            res.send(user);
        } catch (err) {
            // Lots of different errors could occur, but using generic 422
            // 422 : Unprocessable Entity
            //       Request well-formed but was unable to be followed due to semantic errors
            res.status(422).send(err);
        }
    });
};
