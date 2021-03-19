const express = require('express');
const router = express.Router();

const courses = [
    {
        id: 1,
        name: "Java"
    },
    {
        id: 2,
        name: "Java Script"
    },{
        id: 3,
        name: "Typescript"
    },{
        id: 4,
        name: "SASS"
    },
]

router.get('/list', (req, res) => {
    res.send(courses);
});

router.post('/create', (req, res) => {
    const course = {
        id: req.body.id,
        name: req.body.name
    }
    courses.push(course);
    return res.send(course);
});

router.delete('/delete/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course not found with id: ${req.params.id}`);

    const index = courses.indexOf(course);
    courses.splice(index);

    return res.status(200).send(`Id ${course.id} course deleted successfully`);
});

router.get('/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course not found by id: ${parseInt(req.params.id)}`);
    return res.send(course);
});

module.exports = router;