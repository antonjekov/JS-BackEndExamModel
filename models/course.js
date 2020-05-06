const mongoose = require('mongoose');
const validators = require('validator');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: [4, 'Title length must be minimum 5 characters!'],
        required: true,
        unique: true
    },
    description: {
        type: String,
        maxLength: [50, 'Description length must be maximum 50 characters!'],
        minlength: [20, 'Description length must be minimum 20 characters!'],
        required: true
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function(v) {
              return validators.isUrl;
            },
            message: `This is not a valid URL!`
          },
        required: true
    },
    isPublic: false,
    createdAt: {
        type: Date || String,
        required: true
    },
    creatorId:{
        type: mongoose.Types.ObjectId,
        requird: true
    },
    usersEnrolled:[{type: mongoose.Types.ObjectId, ref:'Users'}]
    
});

module.exports = mongoose.model('Courses', courseSchema)