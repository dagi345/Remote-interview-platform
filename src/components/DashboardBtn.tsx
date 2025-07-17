"use client"


import { Button } from './ui/button'
import Link from 'next/link';
import { useUSerRole } from '@/hooks/useUserRole';

function DashboardBtn() {
  const { isCandidate , isLoading , isInterviewer} = useUSerRole();


  if (isCandidate || isLoading) return null;

  return (
    <Link href={"/dashboard"}>
      <Button className='bg-black p-6 cursor-pointer dark:bg-white dark:text-black'>
        Dashboard
      </Button>

    </Link>
  )
}



export default DashboardBtn