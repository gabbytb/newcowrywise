module.exports = mongoose => {
       
    const { Schema } = mongoose;
    var blogSchema = new Schema({
        _id: {
            type: Number,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },       
        author: {
            img: String,
            name: String,
            bio: String,
        },
        tags: [],
        categories: [],
        status: { 
            type: String, 
            default: 'draft',
        },
        isActive: { 
            type: Boolean, 
            default: false,
        },
        accessToken: {
            type: String,
        },
        scheduledFor: {
            type: Date,
        },
    }, { 
        versionKey: false, 
        timestamps: true,  
    }); 
    // The first option disables the automatic creation of the default  "_v" attribute representing "versionKey".
    // Timestamps will keep track of "Time of Creation" and "Time of Update".


    const Blog = mongoose.model("Blog", blogSchema);
    // console.log("Blog Post: ", Blog);
    return Blog;
};
