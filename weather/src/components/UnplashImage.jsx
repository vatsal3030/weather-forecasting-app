import React, { useState, useEffect } from 'react';

const UnsplashImageSearch = () => {
  const [keyword, setKeyword] = useState('Rany');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accessKey = 'NcXdBCGdQKtIzAuSdSAQBdZSSyaKSNfjR74MAxgvEMQ'; // Replace with your Unsplash access key

  const fetchImage = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${accessKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setImageUrl(data.results[0].urls.regular);
      } else {
        setError('No image found for this keyword.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch image. Try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage(keyword); // Load default image on mount
  }, []);

  const handleSearch = () => {
    fetchImage(keyword.trim());
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🔍 Unsplash Image Search</h2>
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Type a keyword (e.g., Rajkot, beach, car)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <p style={styles.status}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {imageUrl && !loading && (
        <img src={imageUrl} alt={keyword} style={styles.image} />
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '20vh',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    width: '300px',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '6px',
    border: '1px solid #aaa',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
    fontWeight: 'bold',
  },
  status: {
    fontSize: '16px',
    color: '#555',
    marginTop: '10px',
  },
  error: {
    fontSize: '16px',
    color: 'crimson',
    marginTop: '10px',
  },
  image: {
    marginTop: '25px',
    maxWidth: '90%',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
};

export default UnsplashImageSearch;
