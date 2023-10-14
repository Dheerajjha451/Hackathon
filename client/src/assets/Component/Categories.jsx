import { useState } from 'react';

const Categories = () => {
  const initialCategories = ['Article', 'AI', 'Data Analysis', 'ML', 'Dataset', 'Recursion'];
  const [selectedCategory, setSelectedCategory] = useState(initialCategories[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    
  };

  return (
    <div className="flex items-center justify-center flex-wrap gap-4 mb-8">
      {initialCategories.map((category) => (
        <div
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`cursor-pointer px-4 py-2 rounded-full transition duration-300 ease-in-out ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-700 hover:bg-blue-400'
          }`}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;