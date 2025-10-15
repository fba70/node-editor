import { SignInForm } from "./sign-in-form"
import { requireUnAuth } from "@/lib/auth-utils"

export default async function SignIn() {
  await requireUnAuth()

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <SignInForm />
    </main>
  )
}
