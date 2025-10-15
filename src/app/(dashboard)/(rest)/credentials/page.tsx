import { requireAuth } from "@/lib/auth-utils"

const CredentialsPage = async () => {
  await requireAuth()

  return <p>Credentials page</p>
}

export default CredentialsPage
