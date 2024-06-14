'use client'

import { useLogout, useSmartAccountClient, useUser } from '@alchemy/aa-alchemy/react'

export const ProfileCard = () => {
  const user = useUser()
  const { address } = useSmartAccountClient({
    type: 'MultiOwnerModularAccount'
  })
  const { logout } = useLogout()

  return (
    <div className="flex flex-row rounded-lg bg-white p-10 dark:bg-[#0F172A]">
      <div className="flex flex-col gap-8">
        <div className="text-lg font-semibold">Welcome to your profile!</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>Account address</div>
            <div className="text-wrap rounded-lg p-3 dark:bg-[#1F2937] dark:text-[#CBD5E1]">{address}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Email</div>
            <div className="text-wrap rounded-lg p-3 dark:bg-[#1F2937] dark:text-[#CBD5E1]">{user?.email}</div>
          </div>

          <div className="flex flex-col gap-2">
            <button onClick={() => logout()}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}