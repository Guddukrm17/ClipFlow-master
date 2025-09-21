import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
    refid: {
        type: String,
        required: [true, 'Please enter refid.']
    },
    text: {
        type: String,
        default: ''
    },
    fileUrl: {
        type: String,
        default: 'None'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Field = mongoose.models.Field || mongoose.model("Field", fieldSchema);

export default Field;