import { hashSync, compareSync, genSaltSync } from "bcrypt"; 

export const createHash = (password) => hashSync(password, genSaltSync(5))

export const validatePassword = (enteredPass, savedPass) => compareSync(enteredPass, savedPass)


// Testeo
// const testPass = createHash("coderhouse")
// console.log(testPass)
// console.log(isValidPassword("coderhouse", testPass))