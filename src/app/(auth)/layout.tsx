import Link from "next/link"
import Image from "next/image"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-svh items-center justify-center px-4 gap-8">
      <Link href="/" className="flex items-center justify-center gap-4">
        <Image alt="Logo" src="/logo.svg" width={120} height={120} />
        <p className="font-medium text-3xl text-center text-orange-600">
          NODE EDITOR
        </p>
      </Link>
      {children}
    </main>
  )
}

export default Layout
