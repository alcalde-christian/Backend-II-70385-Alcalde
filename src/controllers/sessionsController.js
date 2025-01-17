export const login = (req, res) => {
    const {email, password} = req.body

    if (email == "test@test.com" && password == "test") {
        req.session.email = email
        req.session.role = "admin"
        res.status(200).json({success: true, payload: "Usuario logueado"})
    }
}

export const register = (req, res) => {
    const {firstName, lastName, email, age, password} = req.body

    
}