const _ = require('lodash');
const Path = require('path-parser').default;
// ES6 destructuring to just pick out what we need from module exports
const { URL } = require('url');
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

    // Get the list of current user's surveys
    app.get('/api/surveys', requireLogin, async (req, res) => {
        // Survey.find returns a Query that we can further tailor
        // to exclude the recipients subdocument collection
        const surveys =
            await Survey.find({ _user: req.user.id })
                .select({ recipients: false });

        res.send(surveys);
    });

    // Email template redirect
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thank you for voting !');
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

    app.post('/api/surveys/webhooks', (req, res) => {

        const pParser = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = pParser.test(new URL(url).pathname);

                // 'match' will either be null or an object with
                // surveyId and choice properties
                if (match) {
                    // Create new object with email property and those from match
                    // Another option is use the Object spread operator
                    // return { email, ...match };
                    return Object.assign({ email }, match);
                }
            })
            .compact()      // Removes 'undefined' elements
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                // MongoDB: find & update in one go on the Mongo server
                //      - this architectural choice means we don't have to:
                //          - pull all survey data (with all recipients) to express server
                //              - potentially big saving in network traffic
                //          - iterate through recipients looking for correct one
                //          - change survey and recipient values
                //          - save the changed data back to Mongo
                //              - potentially big saving in network traffic
                // Don't bother using async for this asynchronous update call
                // as no need to return anything to SendGrid
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice + 'Count']: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();       // Finally, we terminate the chain processing

        // Logic above doesn't handle case where user has clicked multiple times on both
        // yes & no ... could use timestamp to determine which was clicked first

        // Prevent webhook from hanging...
        res.send({});
    });
};
