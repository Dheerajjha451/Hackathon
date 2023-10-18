import React, { useState } from 'react';
import Axios from 'axios';

export default function Sum_Block(props) {
  const [isSummarized, setIsSummarized] = useState(false);
  const [summary, setSummary] = useState('');

  const handleBlockClick = () => {
    if (!isSummarized) {
      Axios.post('/api/summarize', { content: props.newsContent })
        .then((response) => {
          setSummary(response.data);
          setIsSummarized(true);
        })
        .catch((error) => {
          console.error('Error summarizing content:', error);
        });
    }
  };

  return (
    <div className="news-block" onClick={handleBlockClick}>
      <h3>{props.title}</h3>
      <p>{isSummarized ? summary : props.newsContent}</p>
    </div>
  );
}
