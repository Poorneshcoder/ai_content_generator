// dashboard/history/page.tsx
'use client'
import { db } from '@/utils/db';
import { aiOuput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { desc, eq } from "drizzle-orm";

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  const {user} = useUser();

    useEffect(()=>{
        user && GetAIContent();
    },[user])

    const GetAIContent = async() => {
      const result = await db.select().from(aiOuput).where(eq(aiOuput.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(aiOuput))
      setHistoryData(result)
    }

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <div className="grid grid-cols-3 gap-4 font-bold">
        <div>Template Slug</div>
        <div>AI Response</div>
        {/* <div>Created By</div> */}
        <div>Created At</div>
        {/* <div>Copy</div> */}
      </div>
      {historyData.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mt-2 border p-5">
          <div>{item.templateSlug}</div>
          <div>{item.aiResponse}</div>
          {/* <div>{item.createdBy}</div> */}
          <div>{item.createdAt}</div>
          {/* <div>
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded"
              onClick={() => navigator.clipboard.writeText(item.aiResponse)}
            >
              Copy
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default History;
