const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = (passport, userProfile) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: process.env.callbackURL,
      },
      (token, refreshToken, profile, done) => {
        userProfile = profile;
        return done(null, userProfile);
        // return done(null, {
        //   profile: profile,
        //   token: token,
        // });
      }
    )
  );
};
