import userModel from "../models/user.js"
import { createHash, validatePassword } from "../utils/bcrypt.js"

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email: email})
        
        if ((user) && (validatePassword(password, user.password))) {
            req.session.firstName = user.firstName
            req.session.lastName = user.lastName
            req.session.email = user.email
            req.session.age = user.age
            req.session.role = user.role

            return res.status(200).json({success: true, payload: "Usuario logueado correctamente"})
        } else {
            return res.status(400).json({success: false, payload: "Ups! Algún dato no es correcto"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, payload: "Error al loguear usuario"})
    }
}


export const register = async (req, res) => {
    const {firstName, lastName, email, age, password} = req.body

    try {
        const newUser = {
            firstName,
            lastName,
            email,
            password: createHash(password),
            age
        }
        const registerNewUser = await userModel.create(newUser)
        console.log("Datos del nuevo usuario registrado:\n", registerNewUser)

        return res.status(201).redirect("/login")
        //.json({success: true, payload: newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, error: "Error al registrar usuario"})
    }
}