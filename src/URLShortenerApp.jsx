import React, { useState } from 'react';

const URLShortenerApp = () => {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [error, setError] = useState('');

  const handleShortenURL = async () => {
    try {
      const response = await fetch('/api/shorten-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalURL }),
      });
      const data = await response.json();
      if (response.ok) {
        setShortenedURL(data.shortenedURL);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h2>URL Shortener</h2>
      <div>
        <input
          type="text"
          placeholder="Enter URL"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
        />
        <button onClick={handleShortenURL}>Shorten</button>
      </div>
      {error && <p>{error}</p>}
      {shortenedURL && (
        <div>
          <p>Shortened URL: <a href={shortenedURL} target="_blank" rel="noopener noreferrer">{shortenedURL}</a></p>
        </div>
      )}
    </div>
  );
};

export default URLShortenerApp;
