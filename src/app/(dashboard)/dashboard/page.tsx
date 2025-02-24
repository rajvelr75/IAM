import React from 'react'
import Header from '../_components/header'
import SignOut from '../_components/sign-out'
import UserInfoCard from '../_components/user-info'
import { auth } from '@/lib/better-auth/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getServerSession } from '@/lib/action'
import UserSession from '../_components/user-session'

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) {
    return redirect("/sign-in");
  }

  const { provider } = (
    await auth.api.listUserAccounts({
      headers: await headers(),
    })
  )[0];

  return (
    <> 
      <Header/>
      <UserInfoCard session={session} />
      <UserSession session={session}/>
    </>
  )
}

