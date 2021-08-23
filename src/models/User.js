import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    name: {type: String, require: true}
});

userSchema.pre('save', async function() {
	this.password = await bcrypt.hash(this.password, 5);
})

const User = mongoose.model("User", userSchema);

export default User;