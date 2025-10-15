import { SignUpForm } from "./sign-up-form"
import { requireUnAuth } from "@/lib/auth-utils"

export default async function SignUp() {
  await requireUnAuth()

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <SignUpForm />
    </main>
  )
}
