const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// To avoid the possibility of a test suite creating the users
// collection multiple times, we ask mongoose for the UserSchema
const User = mongoose.model('users');

// Generate the cookie token from user
// Mongo User model instance -> id (used as cookie token)
passport.serializeUser((user, done) => {
    // Uses the MongoDB user _id.$oid
    //  - passport takes .id as a shortcut to internal user id
    // We don't use the googleId because:
    //  - it's only relevant to the Google OAuth flow
    //  - we might have users authenticated using alternative mechanisms
    //      - i.e. Facebook, Twitter, etc.
    done(null, user.id);
});

// Generate the user from cookie token
// id (cookie token) -> Mongo User model instance
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
})

// Passport setup for Google OAuth
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // console.log(`access token : ${accessToken}`);
            // console.log(`refresh token : ${refreshToken}`);

            // This doesn't print out the profile Object
            //  console.log(`profile : ${profile}`);
            // ...but this does !
            //  console.log('profile :', profile);

            User.findOne({ googleId: profile.id })
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({ googleId: profile.id })
                            .save()
                            .then(user => {
                                done(null, user);
                            });
                    }
                });
        }
    )
);
