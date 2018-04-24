const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    // Ensure requireLogin middleware is used for this route
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // Express gotcha : when make post request to express server,
        // express does not, by default, parse the request header
        //  - use body-parser middleware to parse and set req.body property
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id     // this is the token
        });

        // Passport ensures user is a request property
        req.user.credits += 5;
        const user = await req.user.save();

        // Send back the user with updated credits
        res.send(user);
    });
};
