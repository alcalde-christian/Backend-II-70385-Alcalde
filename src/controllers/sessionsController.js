export const login = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({success: false, payload: "Ups! Algún dato no es correcto"})
        } else {
            req.session.user = {
                email: req.user.email,
                firstName: req.user.firstName
            }
            res.status(200).json({success: true, payload: "Usuario logueado correctamente"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, payload: "Error al loguear usuario"})
    }
}


export const register = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({success: false, payload: "El mail ya se encuentra registrado"})
        } else {
            res.status(201).json({success: true, payload: "Usuario registrado correctamente"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, payload: "Error al registrar usuario"})
    }
}


export const githubLogin = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(400).json({success: false, payload: "Ups! Algún dato no es correcto"})
        } else {
            req.session.user = {
                email: req.user.email,
                firstName: req.user.firstName
            }
            res.status(200).redirect("/")
        }
    } catch (error) {
        console.log(error)
    }
}