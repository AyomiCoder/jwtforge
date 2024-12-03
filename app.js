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
    let base64Secret = null;
    let hexSecret = null;

    if (secret) {
        // Encode secret in Base64 and Hex formats
        base64Secret = Buffer.from(secret, 'hex').toString('base64');
        hexSecret = secret; // Hex format is already stored in temporarySecret
    }

    temporarySecret = null; // Clear the secret after rendering
    res.render('index', { base64Secret, hexSecret }); // Render the page with both encoded secrets
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
