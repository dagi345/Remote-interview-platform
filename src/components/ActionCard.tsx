"use client"

import { QuickActionType } from '@/constants'
import React from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'

type ActionCardProps = {
  action: QuickActionType
  onClick: () => void
}

 function ActionCard({ action, onClick }: ActionCardProps) {
    const Icon = action.icon
  return (      
    <div className="max-w-xs w-full group/card dark:text-white text-black " onClick={onClick}>
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-[250px] border border-3 mt-8 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          " bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <div className="flex flex-col">
            <p className="font-normal text-base relative z-10 text-black">
              <Icon className='dark:text-white'/>
            </p>
          </div>

        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl relative z-10 dark:text-white text-black">
            {action.title}
          </h1>
          <p className="font-normal text-sm  relative z-10 my-4 dark:text-white text-black dark:shadow-white shadow-black">
            {action.description}
          </p>
        </div>
      </div>
    </div>
  );
}


export default ActionCard