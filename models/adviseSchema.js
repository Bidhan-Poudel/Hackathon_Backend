import mongoose from "mongoose";

const adviseSchema=mongoose.Schema({
    location:{
        type: String,
        required: true
    },
    trip:{
        type: String
    }
})

export default mongoose.model('advise',adviseSchema)