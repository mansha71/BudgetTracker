import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useState('');

  useEffect(() => {
    // Fetch expenses
    axios.get('http://localhost:5000/api/expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });

    // Retrieve stored name
    axios.get('http://localhost:5000/api/retrieveName')
      .then(response => {
        setStoredName(response.data.name);
      })
      .catch(error => {
        console.error('Error retrieving name:', error);
      });
  }, []);

  const handleNameSubmit = () => {
    // Store name
    axios.post('http://localhost:5000/api/storeName', { name })
      .then(response => {
        console.log(response.data.message);
        setName(''); // Clear input after successful submission
      })
      .catch(error => {
        console.error('Error storing name:', error);
      });
  };

  return (
    <div>
      <h1>Expense List</h1>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>{expense.name} - ${expense.amount}</li>
        ))}
      </ul>

      <h2>Store and Retrieve Name</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={handleNameSubmit}>Store Name</button>
      </div>
      {storedName && <p>Stored name: {storedName}</p>}
    </div>
  );
}

export default App;
