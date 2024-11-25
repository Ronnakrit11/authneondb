import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { InvoiceList } from "./invoice-list"
import { CreateInvoice } from "./create-invoice"

export default async function Dashboard() {
  const session = await auth()
  
  if (!session) {
    redirect("/api/auth/signin")
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      items: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Invoices</h1>
        <CreateInvoice />
      </div>
      <InvoiceList invoices={invoices} />
    </div>
  )
}