const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Home Page</h1><p>This is an Express.js server.</p>');
});

// From Exercise2 and Exercise3 Week2
const routes = {
    '/about': 'About us: at CADT, we love node.js!',
    '/contact-us': 'You can reach us via email...',
    '/products': 'Buy one get one...',
    '/projects': 'Here are our awesome projects'
};

Object.keys(routes).forEach(path => {
    app.get(path, (req, res) => res.send(routes[path]));
});

app.get('/contact', (req, res) => {
    res.send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/contact', (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).send('Name cannot be empty');
    }

    fs.readFile('submissions.json', 'utf8', (err, data) => {
        let submissions = err ? [] : JSON.parse(data);
        submissions.push({ name });

        fs.writeFile('submissions.json', JSON.stringify(submissions, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving submission');
            res.send(`<h1>Submission Successful</h1><p>Thank you, ${name}!</p>`);
        });
    });
});

app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));