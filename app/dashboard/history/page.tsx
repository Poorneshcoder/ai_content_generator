// dashboard/history/page.tsx
'use client'
import { useEffect, useState } from 'react';

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetch('/api/history')
      .then(response => response.json())
      .then(data => setHistoryData(data))
      .catch(error => console.error('Error fetching history:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <div className="grid grid-cols-5 gap-4 font-bold">
        <div>Template Slug</div>
        <div>AI Response</div>
        <div>Created By</div>
        <div>Created At</div>
        <div>Copy</div>
      </div>
      {historyData.map((item, index) => (
        <div key={index} className="grid grid-cols-5 gap-4 mt-2">
          <div>{item.templateSlug}</div>
          <div>{item.aiResponse}</div>
          <div>{item.createdBy}</div>
          <div>{item.createdAt}</div>
          <div>
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded"
              onClick={() => navigator.clipboard.writeText(item.aiResponse)}
            >
              Copy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
