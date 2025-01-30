"use client";

import { signUpAction } from "./sign-up.actions";
import { type SignUpSchema, signUpSchema } from "@/schemas/signup.schema";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SeparatorWithText from "@/components/separator-with-text";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SSOButtons from "../_components/sso-buttons";

const SignUpPage = () => {
  const router = useRouter();
  const { execute: signUp } = useServerAction(signUpAction, {
    onError: (error) => {
      toast.dismiss()
      toast.error(error.err?.message)
    },
    onStart: () => {
      toast.loading("Creating your account...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Account created successfully")
      router.push("/dashboard")
    }
  })

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    signUp(data)
  }

  return (
    <div className="min-h-screen flex items-center px-4 justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-6 md:p-10 bg-card rounded-xl shadow-lg border border-border">
        <div className="text-center">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:text-primary/90 underline">
              Sign in
            </Link>
          </p>
        </div>

        <SSOButtons />

        <SeparatorWithText>
          <span className="uppercase text-muted-foreground">Or</span>
        </SeparatorWithText>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      className="w-full px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      className="w-full px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full flex justify-center py-2.5"
            >
              Create Account
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <p className="text-xs text-center text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="font-medium text-primary hover:text-primary/90 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary hover:text-primary/90 underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
