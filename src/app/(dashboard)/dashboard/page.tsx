import React from 'react'
import Header from '../_components/header'
import SignOut from '../_components/sign-out'
import { auth } from '@/lib/better-auth/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getServerSession } from '@/lib/action'
import UserSession from '../_components/user-session'
import UserActions from '../_components/user-action'
import Link from 'next/link'

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
      <UserActions session={session} provider={provider} />
      <Link href="/organizations/create" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
        Create Organization
      </Link>
    </>
  )
}

