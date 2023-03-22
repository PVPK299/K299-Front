 import React, { useState, useEffect } from 'react';

 export default function GetData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const jsonData = await response.json();

      setData(jsonData);
    }

    fetchData();
  }, []);

  return [data, setData];
}
