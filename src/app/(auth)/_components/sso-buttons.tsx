import SeparatorWithText from "@/components/separator-with-text";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useConfigStore } from "@/state/config";
import Google from "@/icons/google";

export default function SSOButtons({
  isSignIn = false
}: {
  isSignIn?: boolean
}) {
  const { isGoogleSSOEnabled } = useConfigStore()

  return (
    <>
      {isGoogleSSOEnabled && (
        <>
          <SeparatorWithText>
            <span className="text-muted-foreground">OR</span>
          </SeparatorWithText>

          <Button className="w-full" asChild size='lg'>
            <Link href="/sso/google">
              <Google className="w-[22px] h-[22px] mr-1" />
              {isSignIn ? "Sign in with Google" : "Sign up with Google"}
            </Link>
          </Button>
        </>
      )}
    </>
  )
}
