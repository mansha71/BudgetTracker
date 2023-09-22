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


  const [money, setMoney] = useState(0);
  const [moneyInputChange, setMoneyInput] = useState('');
  const [transactions, setTransactions] = useState < string[]>([]);


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

  const handleMoneySet = (e) => {
    e.preventDefault();
    const enteredMoney = parseInt(moneyInputChange, 10);
    if (!isNaN(enteredMoney)) {
      setMoney(enteredMoney);
      setMoneyInput('');
    }
  }

  const handleMoneyInputChange = (e) => {
    setMoneyInput(e.target.value);
  }

  return (
    <div>
      <div>
        <h1>Budget Tracker</h1>
        <h3>{ money}</h3>
        <form onSubmit={handleMoneySet}>
          <input type="text" 
          placeholder='Enter Starting Money' 
            pattern="\d*"
            value = {moneyInputChange}
            onChange={handleMoneyInputChange}
          />
          <button type="submit">Set</button>
        </form>
      </div>






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
    </div>
  );
}

export default App;
