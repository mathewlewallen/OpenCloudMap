"use client";

import { useState, useRef } from "react";
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateRegistrationOptionsAction, verifyRegistrationAction, deletePasskeyAction, generateAuthenticationOptionsAction, verifyAuthenticationAction } from "./passkey.actions";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import type { PassKeyCredential } from "@/db/schema";

interface PasskeyRegistrationButtonProps {
  email: string;
  className?: string;
  onSuccess?: () => void;
}

function PasskeyRegistrationButton({ email, className, onSuccess }: PasskeyRegistrationButtonProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setIsRegistering(true);

      // Get registration options from the server
      const [options] = await generateRegistrationOptionsAction({ email });

      if (!options) {
        throw new Error("Failed to get registration options");
      }

      // Start the registration process in the browser
      const registrationResponse = await startRegistration({
        optionsJSON: options,
      });

      // Send the response back to the server for verification
      await verifyRegistrationAction({
        email,
        response: registrationResponse,
        challenge: options.challenge,
      });

      toast.success("Passkey registered successfully");
      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error("Passkey registration error:", error);
      toast.error("Failed to register passkey");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Button
      onClick={handleRegister}
      disabled={isRegistering}
      className={className}
    >
      {isRegistering ? "Registering..." : "Register Passkey"}
    </Button>
  );
}

interface PasskeyAuthenticationButtonProps {
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function PasskeyAuthenticationButton({ className, disabled, children }: PasskeyAuthenticationButtonProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuthenticate = async () => {
    try {
      setIsAuthenticating(true);

      // Get authentication options from the server
      const [options] = await generateAuthenticationOptionsAction({});

      if (!options) {
        throw new Error("Failed to get authentication options");
      }

      // Start the authentication process in the browser
      const authenticationResponse = await startAuthentication({
        optionsJSON: options,
      });

      // Send the response back to the server for verification
      await verifyAuthenticationAction({
        response: authenticationResponse,
        challenge: options.challenge,
      });

      toast.success("Authentication successful");
      window.location.href = "/dashboard"; // Redirect to dashboard after successful authentication
    } catch (error) {
      console.error("Passkey authentication error:", error);
      toast.error((error as { err?: { message: string } })?.err?.message || "Authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Button
      onClick={handleAuthenticate}
      disabled={isAuthenticating || disabled}
      className={className}
    >
      {isAuthenticating ? "Authenticating..." : children || "Sign in with a Passkey"}
    </Button>
  );
}

interface PasskeysListProps {
  passkeys: PassKeyCredential[];
  email: string;
}

export function PasskeysList({ passkeys, email }: PasskeysListProps) {
  const router = useRouter();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const { execute: deletePasskey } = useServerAction(deletePasskeyAction, {
    onSuccess: () => {
      toast.success("Passkey deleted");
      dialogCloseRef.current?.click();
      router.refresh();
    },
    onError: (error: { err: { message: string } }) => {
      toast.error(error.err.message || "Failed to delete passkey");
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Passkeys</h3>
          <p className="text-sm text-muted-foreground">
            Manage your passkeys for passwordless authentication
          </p>
        </div>
        <PasskeyRegistrationButton email={email} />
      </div>

      <div className="space-y-4">
        {passkeys.map((passkey) => (
          <Card key={passkey.id} className="bg-card/40">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                      Passkey
                      <Badge variant="outline" className="font-mono text-xs">
                        {passkey.credentialId.slice(0, 16)}...
                      </Badge>
                    </CardTitle>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      · {formatDistanceToNow(passkey.createdAt)} ago
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    Created on {new Date(passkey.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="w-full sm:w-auto">Delete passkey</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete passkey?</DialogTitle>
                        <DialogDescription>
                          This will remove this passkey from your account. You won&apos;t be able to use it for authentication anymore.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-6 sm:mt-0">
                        <DialogClose ref={dialogCloseRef} asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          className="mb-4 sm:mb-0"
                          onClick={() => deletePasskey({ credentialId: passkey.credentialId })}
                        >
                          Delete passkey
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {passkeys.length === 0 && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardDescription className="text-center">
                You haven&apos;t registered any passkeys yet
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}

