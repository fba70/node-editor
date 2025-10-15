import { requireAuth } from "@/lib/auth-utils"

interface PageProps {
  params: Promise<{ credentialId: string }>
}

const CredentialPage = async ({ params }: PageProps) => {
  await requireAuth()
  const { credentialId } = await params

  return <p>Credential ID - {credentialId}</p>
}

export default CredentialPage
