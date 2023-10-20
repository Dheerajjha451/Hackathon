import { useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  

  return (
    <div className="flex items-center justify-center flex-wrap gap-16">
   
      <ul className='cursor-pointer px-8 py-2 flex flex-wrap gap-12 text-lg font-semibold  rounded-full transition duration-300 ease-in-out'>
        <Link to="/"><li className='hover:text-cyan-600'>Articles</li></Link>
        <Link to="/Search"><li className='hover:text-cyan-600'>Researches</li></Link>
        <Link to="/about"><li className='hover:text-cyan-600'>About</li></Link>
      </ul>
    </div>
  );
};

export default Categories;