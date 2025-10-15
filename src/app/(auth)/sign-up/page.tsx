import { SignUpForm } from "./sign-up-form"
import { requireUnAuth } from "@/lib/auth-utils"

export default async function SignUp() {
  await requireUnAuth()

  return <SignUpForm />
}
