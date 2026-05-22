import express from 'express';
import courses from "./course.js";
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import authenticate from './auth.js';

const app = express();
const PORT = 3000;

app.use(logger);

app.get(
    '/departments/:dept/courses',
    validateQuery,
    authenticate,
    (req, res) => {
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

        if (minCredits) {
            const min = parseInt(minCredits, 10);
            filteredCourses = filteredCourses.filter(course => course.credits >= min);
        }

        if (maxCredits) {
            const max = parseInt(maxCredits, 10);
            filteredCourses = filteredCourses.filter(course => course.credits <= max);
        }

        res.json({
            results: filteredCourses,
            meta: {
                total: filteredCourses.length
            }
        });
    }
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Valid API token for testing: xyz123');
});