import { SignInForm } from "./sign-in-form"
import { requireUnAuth } from "@/lib/auth-utils"

export default async function SignIn() {
  await requireUnAuth()

  return <SignInForm />
}
