module.exports = mongoose => {
    
    const { Schema } = mongoose;
    var roleSchema = new Schema({
        _id : {
            type: Number,
        },
        role: {
            type: String,
            unique: true,
            required: true,
        },
    }, { versionKey: false, timestamps: true, });

    const Role = mongoose.model("Role", roleSchema);
    return Role;

};