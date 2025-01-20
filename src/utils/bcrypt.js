import { hashSync, compareSync, genSaltSync } from "bcrypt"; 

export const createHash = (password) => hashSync(password, genSaltSync(5))

export const isValidPassword = (enteredPass, savedPass) => compareSync(enteredPass, savedPass)


// Testeo via nodemon src/utils/bcrypt.js
const testPass = createHash("coderhouse")
console.log(testPass)
console.log(isValidPassword("coderhouse", testPass))