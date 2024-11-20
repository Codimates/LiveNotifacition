import mongoose from 'mongoose'

const { Schema } = mongoose;

const RegistationNotifySchema = new Schema(
    {

    email:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    },
    { timestamps: true }
);

export default mongoose.model('RegistationNotify', RegistationNotifySchema);
