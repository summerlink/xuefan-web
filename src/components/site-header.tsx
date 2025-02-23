"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-center px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">学帆</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link
            href="/courses"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/courses" ? "text-primary" : "text-muted-foreground",
            )}
          >
            课程
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-primary" : "text-muted-foreground",
            )}
          >
            关于我们
          </Link>
        </nav>
      </div>
    </header>
  )
}
