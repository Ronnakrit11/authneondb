import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Manage Your Invoices with Ease
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create, track, and manage invoices in one place. Simple, fast, and efficient.
          </p>
          {session ? (
            <Button asChild size="lg">
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg">
              <Link href="/api/auth/signin">
                Get Started
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}