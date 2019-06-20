const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: '-',
        author: 'Baramy',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 15
    });
    
    try {
        const result = await course.save();
        console.log(result);
    } 
    catch (ex) {
        console.log(ex.message);
    }
   
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Thamonwan', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1})
    console.log(courses);
}

async function updateCourse(id) {
    // Approach: Update first
    // Update directly
    // Optionally: get the update document
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Reven',
            isPublished: false
        }
    }, { new: true });

    console.log(course);
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id })    
    // console.log(result);

    //const result = await Course.deleteMany({ _id: id })    
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

createCourse();