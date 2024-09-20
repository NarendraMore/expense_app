// import React, { useState } from 'react';
// import './App.css';
// import { Expense } from './types';
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
// import Login from './components/Login';

// const App: React.FC = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = async (username: string, password: string) => {
//     try {
//       const response = await fetch('http://localhost:5000/users');
//       const users = await response.json();

//       const user = users.find((u: { username: string; password: string }) => u.username === username && u.password === password);
      
//       if (user) {
//         setIsLoggedIn(true);
//       } else {
//         alert('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       alert('Error logging in. Please try again later.');
//     }
//   };

//   const addExpense = (expense: Expense) => {
//     setExpenses([...expenses, expense]);
//   };

//   const deleteExpense = (id: string) => {
//     setExpenses(expenses.filter(expense => expense.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {!isLoggedIn ? (
//         <Login onLogin={handleLogin} />
//       ) : (
//         <>
//           <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
//           <ExpenseForm onAddExpense={addExpense} />
//           <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import { Expense } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import Login from './components/Login';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:5000/expenses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExpenses(data);
        setFilteredExpenses(data); // Initialize with all expenses
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    if (isLoggedIn) {
      fetchExpenses();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter(expense => expense.category === selectedCategory);
      setFilteredExpenses(filtered);
    }
  }, [selectedCategory, expenses]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      const user = users.find((u: { username: string; password: string }) => u.username === username && u.password === password);
      
      if (user) {
        setIsLoggedIn(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error logging in. Please try again later.');
    }
  };

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
          <ExpenseFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          <ExpenseForm onAddExpense={addExpense} />
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} />
        </>
      )}
    </div>
  );
};

export default App;
