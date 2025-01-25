import passport from "passport"
import local from "passport-local"
import userModel from "../models/user.js"
import { createHash, validatePassword } from "../utils/bcrypt.js"

const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use("register", new localStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
        
        try {
            const {firstName, lastName, email, age, password} = req.body

            const userExists = await userModel.findOne({ email: email })

            if (!userExists) {
                const newUser = await userModel.create({
                    firstName,
                    lastName,
                    email,
                    password: createHash(password),
                    age
                })
                console.log("Datos del nuevo usuario registrado:\n", newUser)
                return done(null, newUser)
            } else {
                return done(null, false)
            }
        } catch (error) {
            console.log(error)
            return done(error)
        }
    }))

    passport.use("login", new localStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username })

            if (user && validatePassword(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (error) {
            console.log(error)
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport