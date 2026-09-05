import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpCircle, PlusCircle, ChevronDown } from "lucide-react"

/**
 * DESIGNER NOTE: Wise-style dashboard — layout and structure only.
 * All core sections use ShadCN components. Designers can restyle to match Wise UI (colours, typography, spacing).
 *
 * Sections:
 * — Total balance + action buttons (Send, Add money, Request)
 * — Currency account cards (EUR, AUD, CAD, GBP)
 * — Recent transactions list
 * — Footer (Provided by Wise Assets Europe)
 */

const CURRENCY_ACCOUNTS = [
  { code: "EUR", label: "EUR", accountId: "51568", balance: "1.00", flag: "/flags/eur.png" },
  { code: "AUD", label: "AUD", accountId: "30779", balance: "0.00", flag: "/flags/aud.png" },
  { code: "CAD", label: "CAD", accountId: "15376", balance: "0.00", flag: "/flags/cad.png" },
  { code: "GBP", label: "GBP", accountId: "13159", balance: "0.00", flag: "/flags/gbp.png" },
]

const RECENT_TRANSACTIONS = [
  { id: "1", icon: ArrowUpCircle, name: "Hannah Johnson", subtitle: "Sent - 18 Apr", amount: "49 EUR", isCredit: false },
  { id: "2", icon: PlusCircle, name: "To EUR", subtitle: "Added - 18 Apr", amount: "+ 50 EUR", subAmount: "50.44 EUR", isCredit: true },
  { id: "3", icon: ArrowUpCircle, name: "Brandon Bolt", subtitle: "Sent - 2 Apr", amount: "110 EUR", isCredit: false },
]

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {/* Total balance + actions */}
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-muted-foreground">Total balance</h2>
        <p className="text-3xl font-bold tracking-tight">2.00 EUR</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Send
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Add money
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="gap-1">
                Request
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Request from bank account</DropdownMenuItem>
              <DropdownMenuItem>Request from card</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Currency account cards */}
      <section
        aria-label="Currency accounts"
        className="-mx-6 overflow-x-auto px-6"
      >
        <div className="flex snap-x snap-mandatory gap-4">
          {CURRENCY_ACCOUNTS.map((account) => (
            <Card key={account.code} className="w-60 shrink-0 snap-start gap-0 p-4 bg-muted/50">
              <div className="grid grid-cols-[48px_1fr] items-start gap-x-3">
                <Image
                  src={account.flag}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-full"
                />
                <div className="min-w-0 space-y-1">
                  <CardTitle className="text-base font-medium">{account.label}</CardTitle>
                  <p className="text-xs text-muted-foreground">Account - {account.accountId}</p>
                  <p className="text-2xl font-bold leading-none">{account.balance}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent transactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <Link
            href="/"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            See all
          </Link>
        </div>
        <ul className="divide-y divide-border rounded-lg border bg-card">
          {RECENT_TRANSACTIONS.map((tx) => (
            <li key={tx.id} className="flex items-center gap-4 px-4 py-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <tx.icon className="size-5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{tx.name}</p>
                <p className="text-sm text-muted-foreground">{tx.subtitle}</p>
                {tx.subAmount && (
                  <p className="text-xs text-muted-foreground">{tx.subAmount}</p>
                )}
              </div>
              <p className={`shrink-0 text-right font-medium ${tx.isCredit ? "text-primary" : ""}`}>
                {tx.amount}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-4">
        <p className="text-xs text-muted-foreground">
          Provided by Wise Assets Europe
        </p>
      </footer>
    </div>
  )
}
