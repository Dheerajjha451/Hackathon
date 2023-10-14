
const Frame = ({ searchResults }) => {
    return (
      <div className="frame">
        {searchResults.map((result) => (
          <div key={result.id} className="result-item">
            {/* Render each search result or content item */}
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Frame;