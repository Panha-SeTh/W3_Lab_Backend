import express from 'express';
import courses from "./course.js";

const app = express();
const PORT = 3000;

app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    let filteredCourses = courses.filter(course => course.department === dept);
    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    if (semester) {
        filteredCourses = filteredCourses.filter(course => course.semester === semester);
    }
    if (instructor) {
        const searchTerm = instructor.toLowerCase();
        filteredCourses = filteredCourses.filter(course => 
            course.instructor.toLowerCase().includes(searchTerm)
        );
    }

    const minCred = minCredits ? parseInt(minCredits, 10) : undefined;
    const maxCred = maxCredits ? parseInt(maxCredits, 10) : undefined;
    const isMinValid = !isNaN(minCred);
    const isMaxValid = !isNaN(maxCred);

    if (isMinValid && isMaxValid) {
        if (minCred > maxCred) {
            filteredCourses = [];
        } else {
            filteredCourses = filteredCourses.filter(course => 
                course.credits >= minCred && course.credits <= maxCred
            );
        }
    } else if (isMinValid) {
        filteredCourses = filteredCourses.filter(course => course.credits >= minCred);
    } else if (isMaxValid) {
        filteredCourses = filteredCourses.filter(course => course.credits <= maxCred);
    }

    res.json({
        results: filteredCourses,
        meta: {
            total: filteredCourses.length
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});