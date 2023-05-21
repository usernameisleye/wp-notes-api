const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const userSchema = new Schema({
    avatar:{
        type: String,
        required: false
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, { 
    timestamps: true 
});

// Hash
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    };

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare
userSchema.methods.compare = async function(isPassword){
    return await bcrypt.compare(isPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);