const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Static file serving with caching
app.use(express.static('.', {
  etag: true,
  lastModified: true,
}));

// Route for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, '500.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 MARASSI Logistics server running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
});