// "use client";

// import { useEffect, useState } from "react";
// import { ProfileCard } from "@/components/Profile";
// import { useAccount, useUser } from "@alchemy/aa-alchemy/react";
// import { LogInCard } from "@/components/Login";
// import MessageHistory from "@/components/MessageHistory";
// import SendMessage from "@/components/SendMessage";

// export default function Home() {
//   const { account, address, isLoadingAccount } = useAccount({
//     type: "MultiOwnerModularAccount",
//   });
//   const user = useUser();

//   return (
//     <main className="flex min-h-screen max-w-screen-sm m-auto flex-col items-center justify-between p-2">
//       {isLoadingAccount && !address ? (
//         <div className="flex items-center justify-center">
//           <div
//             className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
//             role="status"
//           ></div>
//         </div>
//       ) : // the account might be reconnecting, in which case the account is null, but we have the address
//       user != null && account != null && !address ? (
//         <>
//           {/* <ProfileCard />
//           <MessageHistory />
//           <SendMessage /> */}
//         </>
//       ) : (
//         <LogInCard />
//       )}
//     </main>
//   );
// }

'use client'

import { LogInCard } from '@/components/LoginCard'
import { ProfileCard } from '@/components/ProfileCard'
import { LoadingSpinner } from '@/components/Spinner'
import { useSignerStatus } from '@alchemy/aa-alchemy/react'

export default function Home() {
  // use the various signer statuses to determine if we are:
  // loading - waiting for a request to resolve
  // connected - the user signed in with an email tied to a smart account
  // unconnected - we need to provide a login UI for the user to sign in
  const { isInitializing, isAuthenticating, isConnected, status } = useSignerStatus()
  const isLoading = isInitializing || (isAuthenticating && status !== 'AWAITING_EMAIL_AUTH')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      {isLoading ? <LoadingSpinner /> : isConnected ? <ProfileCard /> : <LogInCard />}
    </main>
  )
}
