import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Modal from "react-modal"

export default function Sum_Block({isOpen,closeModal, article}) {
  const [summary, setSummary] = useState('');
  const backendUrl = "http://127.0.0.1:5000"
  const fetchSummary = async () => {
    try {
      const response = await Axios.get(`${backendUrl}/api/summarize`, {
        params: {
          content: article.content,
        },
      });
      setSummary(response.data);
      // console.log(article)
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width:"50%",
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  useEffect(() => {
    if (isOpen) {
      fetchSummary();
    } else {
      
      setSummary('');
    }
  }, [isOpen, article]);
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel='News Summary'
    >
      <div className='grid gap-2'>
        <h3 className='font-bold text-3xl'>{article.title}</h3>
        <h3  className='text-2xl' >{article.description}</h3>
        
        <div className='text-lg font-light'>{summary}</div>
        <a href={article.url}><p className="text-blue-500 underline text-lg">Go To Article</p></a>
        <button onClick={closeModal} className='text-red-500 text-lg active:bg-red-500 active:text-white rounded-none bg-neutral-100 px-4 py-2 drop-shadow-md  font-semibold'>Close</button>
      </div>
    </Modal>
    
  );
}
