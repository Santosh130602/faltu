
const mongoose = require("mongoose");

const highschoolSchema = mongoose.Schema(
    {
        username: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
       school:{
          type: String,
          required: true,
          
        },
        passingYear:{
          type: String,
          required: true,
          
        },
        state: {
             type: String,
             required: true 
        },
        district: {
             type: String,
             required: true 
        },
    },
    { timestamps: true }
);

const Highschool = mongoose.model("Highschool", highschoolSchema);

module.exports = Highschool;