"use client"

import { ModeToggle } from './Mode-Toggle'
import Link from 'next/link'
import Image from 'next/image'
import Logo from "./Assets/logo.png"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import DashboardBtn from './DashboardBtn'
import { Button } from './ui/button'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useEffect } from 'react'

function NavBar() {
  const { user, isLoaded } = useUser()
  const syncUser = useMutation(api.users.syncUser)

  useEffect(() => {
    if (!isLoaded || !user) return

    syncUser({
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      clerkId: user.id,
      image: user.imageUrl,
    })
  }, [isLoaded, user, syncUser])

  return (
    <nav className='border-b flex justify-between'>
        <div className="flex h-16 items-center px-4 container mx-auto">
            <Link href={"/"} className='flex gap-1  items-center'>
                <h1 className='font-bold text-3xl flex '>Code</h1>
                <Image src={Logo} alt='icon' width={55} height={55} className=''/>
            </Link>
            
        </div>
        <SignedIn >
            <div className="flex gap-3  items-center ">
                <DashboardBtn />
                <ModeToggle />
                <UserButton />
            </div>
        </SignedIn>

        <SignedOut>
            <div className=" flex items-center ">
                <SignInButton>
                    <Button className='bg-black dark:bg-white dark:text-black border border-2 cursor-pointer'>
                        Sign in
                    </Button>
                </SignInButton>
            </div>
        </SignedOut>
    </nav>
  )
}

export default NavBar