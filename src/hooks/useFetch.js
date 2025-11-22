import { useState } from 'react';

function useFetch() {
  const [loading, setLoading] = useState(false);

  const fetchData = async (url, options = {}) => {
    setLoading(true);

    const response = await fetch(url, options);
    
    const logEntry = {
      url,
      method: options.method || 'GET',
      payloadBody: options.body ? JSON.parse(options.body) : null,
      responseStatus: response.status
    };

    const existingLogs = JSON.parse(localStorage.getItem('apiCallLogs') || '[]');
    existingLogs.push(logEntry);
    localStorage.setItem('apiCallLogs', JSON.stringify(existingLogs));

    if (!response.ok) {
      setLoading(false);
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    setLoading(false);
    return data;
  };

  return { loading, fetchData };
}

export default useFetch;