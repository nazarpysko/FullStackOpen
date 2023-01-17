import mongoose from "mongoose";
mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    name: String,
    passwordHash: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

export default User