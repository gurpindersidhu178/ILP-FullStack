"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ Correct usage

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/test-endpoint`); // ✅ API 
call
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("API call failed:", error);
        setData({ error: error.message });
      }
    }
    fetchData();
  }, [apiUrl]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">API Response:</h1>
      <pre className="bg-gray-200 p-3 rounded">{JSON.stringify(data, null, 
2)}</pre>
    </div>
  );
}

