import React from 'react';

interface ExpenseFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['All', 'Food', 'Travel', 'Entertainment', 'Other'];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Filter by Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
