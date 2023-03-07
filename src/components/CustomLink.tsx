"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface CustomLinkProps {
  href: string
  children: React.ReactNode
  label?: string
}

const CustomLink: React.FunctionComponent<CustomLinkProps> = ({
  href,
  children,
  label,
}) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={
        "relative flex h-10 items-center font-bold " +
        (pathname === href ? "border-spacing-2 border-b" : "")
      }
    >
      {children}
      {label && (
        <span className="absolute -top-2 -right-2 scale-75 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 text-xs text-white">
          {label}
        </span>
      )}
    </Link>
  )
}

export default CustomLink
