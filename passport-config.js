const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/User')

function initialize(passport, getUserbyId){

    const authenticateUser = async (email, password, done)=>{
        const user = await User.findOne({ email: email })
        if(user == null){
            return done(null, false, {message: 'No user with that email'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            else{
                return done(null, false, {message: 'Password incorrect'})
            }
        }
        catch (e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    passport.serializeUser((user, done)=>{ done(null, user.id) })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (e) {
            done(e);
        }
    });
}

module.exports = initialize