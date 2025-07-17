"use client"
import LoaderUI from '@/components/LoaderUI'
import { useUSerRole } from '@/hooks/useUserRole'
import { useRouter } from 'next/navigation'
import React from 'react'
import InterviewScheduleUI from './InterviewScheduleUI'

function page() {

  const router = useRouter()
  const {isInterviewer, isLoading} =useUSerRole()

  if (isLoading) return <LoaderUI />
  if (!isInterviewer) return router.push("/")
  return <InterviewScheduleUI />
}

export default page