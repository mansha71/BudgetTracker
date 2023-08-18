import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios'


function App() {
  const [expenses, setExpenses] = useState([]); // Corrected variable name

  useEffect(() => {
    axios.get('http://localhost:5000/api/expenses')
      .then(response => {
        setExpenses(response.data); // Corrected function name
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, []);
  
  return (
    <div>
      <h1>Expense List</h1>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>{expense.name} - ${expense.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;