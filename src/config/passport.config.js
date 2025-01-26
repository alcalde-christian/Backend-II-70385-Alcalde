import passport from "passport"
import local from "passport-local"
import GithubStrategy from "passport-github2"
import userModel from "../models/user.js"
import { createHash, validatePassword } from "../utils/bcrypt.js"
import { application } from "express"

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

    passport.use("github", new GithubStrategy({
        clientID: "Iv23li6s2aEEYiF1UJXH",
        clientSecret: "f0570d6ba6b94e56ebadab0a4b999ad7bc8d9658",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("Github profile:\n", profile)
            console.log("Github access token:\n", accessToken)
            console.log("Github refresh token:\n", refreshToken)
            
            const user = await userModel.findOne({ email: profile._json.email})
            
            // N/A: Dato no proporcionado por Github

            if (!user) {
                const newUser = await userModel.create({
                    firstName: profile._json.name,
                    lastName: " ", // N/A
                    email: profile._json.email,
                    password: "1234", // N/A
                    age: 18 // N/A
                })
                return done(null, user)
            } else {
                return done(null, user)
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