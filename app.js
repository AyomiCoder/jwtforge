const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Variable to temporarily store the generated secret
let temporarySecret = null;

// Default route
app.get('/', (req, res) => {
    const secret = temporarySecret; // Use the stored secret if available
    temporarySecret = null; // Clear the secret after rendering
    res.render('index', { secret }); // Render the page with or without the secret
});

// Route to generate a new secret
app.get('/generate', (req, res) => {
    temporarySecret = crypto.randomBytes(64).toString('hex'); // Generate the JWT secret
    res.redirect('/'); // Redirect to the default route
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
