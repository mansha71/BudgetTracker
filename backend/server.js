const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Byefsafas f tn');
});

// Sample expenses data (replace this with your actual data)
const expenses = [
  { id: 1, name: 'Groceries', amount: 50 },
  { id: 2, name: 'Utilities', amount: 100 },
  // ... other expenses
];

// Define an endpoint to fetch expenses
app.get('/api/expenses', (req, res) => {
  // You can replace this with logic to fetch expenses from a database or other data source
  res.json(expenses);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
