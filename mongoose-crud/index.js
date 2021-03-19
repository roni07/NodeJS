const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/demo-db", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB...."))
    .catch(err => console.log("Could not connect to MongoDB....", err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'desktop'],
        lowercase: true
    },
    author: String,
    tags: { // used custom validator
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    },
    /*tags: { // async validator
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag'
        }
    },*/
    data: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
    try {
        const course = new Course({
            name: "Angular Course",
            category: '=',
            author: "Mehedi Hasan",
            tags: [],
            isPublished: true
        });

        const result = await course.save();
        console.log(result);
    } catch (err) {
        // console.log(err.message);
        for (field in err.errors)
            console.log(err.errors[field].message);
    }
}

const updateCourse = async id => {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = "Another Author";

    /*course.set({
           isPublished: true,
           author: "Another Author"
        });*/

    const result = await course.save();
    console.log(result);
}

const deleteCourse = async id => {
    const result = await Course.deleteOne({_id: id});
    // const result = await Course.findByIdAndDelete({_id: id});
    console.log(result);
}

const getCourses = async () => {

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({author: "Mehedi Hasan", isPublished: true})

        // .find({price: {$gte: 10, lte: 20}}) comparison query
        // .find({price: {$in: [10,15, 20]}}) comparison query

        // .find() logical query
        // .or([{author: "Mehedi Hasan"}, {isPublished: true}]) logical query
        // .and([{author: "Mehedi Hasan", isPublished: true}]) logical query

        //Starts with Mehedi
        // .find({author: /^Mehedi/}) // Regular expression query
        // Ends with Hasan
        // .find({author: /Hasan$/i}) // Regular expression query
        // Contains Mehedi
        // .find({author: /.*Mehedi.*/}) // Regular expression query

        // .skip((pageNumber - 1) * pageSize) // pagination
        // .limit(pageSize) // pagination

        .limit(5)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    // .count(); // count
    console.log(courses);
}

// updateCourse("6052454d481b5b1c31d752b7");
// deleteCourse("6052454d481b5b1c31d752b7");
// getCourses();
createCourse();
