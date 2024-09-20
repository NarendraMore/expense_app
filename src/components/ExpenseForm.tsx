import React, { useState } from 'react';
import { Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && amount && date && category) {
      const newExpense: Expense = {
        id: uuidv4(), // Optionally, you can omit the id here if the server generates it
        name,
        amount,
        date,
        category,
      };

      // Send the new expense to the JSON server
      try {
        const response = await fetch('http://localhost:5000/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExpense),
        });

        if (response.ok) {
          const savedExpense = await response.json();
          onAddExpense(savedExpense); // Call the prop function to update the state
          // Clear form fields
          setName('');
          setAmount(undefined);
          setDate('');
          setCategory('');
        } else {
          alert('Error saving expense');
        }
      } catch (error) {
        console.error('Error adding expense:', error);
        alert('Error adding expense. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={amount || ''}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
