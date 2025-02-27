const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        validate:{
            validator: function(value){
                return /^[a-zA-Z]{3,}$/.test(value);//no number or special characteramd minimum 3 charaters
            },
            message: props => `${props.value} is not a valid first name!`
        }

    },

    role:{
        type:String,
        enum:["User", "Admin"],
       
    },
    email:{
        type:String,
        //required:true,
        unique: true, 
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address!'] //email format for validation
    },
    password:{
        type:String,
        //required: true,
        minlength: [8, 'Password should be at least 8 characters long!'],
        validate: {
            validator: function(value) {
                return /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value); 
            },
            message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!'
        }
    },
    age: {
        type: Number,
        required: true,  
        min: [18, "Age must be greater than 18"],  
        validate: {
            validator: function (value) {
                return value > 18; 
            },
            message: "Age must be greater than 18",
        },
    },
    

}, {timestamps:true});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})



module.exports = mongoose.model('User', UserSchema);




