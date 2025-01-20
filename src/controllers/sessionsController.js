import userModel from "../models/user.js"

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email: email})
        
        if ((user) && (password == user.password)) {
            req.session.firstName = user.firstName
            req.session.lastName = user.lastName
            req.session.email = user.email
            req.session.age = user.age
            req.session.role = user.role

            return res.status(200).json({success: true, payload: "Usuario logueado correctamente"})
        } else {
            return res.status(400).json({success: false, payload: "Ups! Algún dato no es correcto"})
        }

        if (email == "test@test.com" && password == "test") {
            req.session.email = email
            req.session.role = "admin"
            return res.status(200).json({success: true, payload: "Usuario logueado"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, payload: "Error al loguear usuario"})
    }
}


export const register = async (req, res) => {
    const {firstName, lastName, email, age, password} = req.body

    try {
        const newUser = await userModel.create({firstName, lastName, email, password, age})

        return res.status(201).json({success: true, payload: newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, error: "Error al registrar usuario"})
    }
}