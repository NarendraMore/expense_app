import React from 'react';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="w-full max-w-lg">
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense.id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <p className="font-semibold">{expense.name}</p>
                <p className="text-sm text-gray-500">{expense.date} - {expense.category}</p>
                <p className="text-lg font-bold">${expense.amount}</p>
              </div>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
