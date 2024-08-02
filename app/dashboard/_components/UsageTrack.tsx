'use client'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { aiOuput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
// import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'

function UsageTrack() {
    const {user} = useUser();

    const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);

    useEffect(()=>{
        user && GetData();
    },[user])

    const GetData = async () =>{
        const result:History[] = await db.select().from(aiOuput).where(eq(aiOuput.createdBy,user?.primaryEmailAddress.emailAddress))
        GetTotalUsage(result);
    }

    const GetTotalUsage = (result:History[]) =>{
        let total:number=0;
        result.forEach(element=>{
            total= total+Number(element.aiResponse?.length)
        })
        setTotalUsage(total)
        console.log(total)
    }
  return (
    <div>
      <div className='bg-primary text-white p-3 rounded-lg'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
            <div className='h-2 bg-white rounded-full' style={{width:(totalUsage/10000)*100+'%'}}>

            </div>
        </div>
        <h2 className='text-sm my-2'>{totalUsage}/10,000 credits used</h2>
      </div>
      <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
    </div>
  )
}

export default UsageTrack
