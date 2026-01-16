import bcrypt from "bcrypt"

const solt_rounds=10

export function hashPassword(password){
    return bcrypt.hash(password,solt_rounds)

}

export function comparePassword(password){
    return bcrypt.compare(password,solt_rounds)

}
