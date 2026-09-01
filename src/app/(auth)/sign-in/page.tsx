import type { Metadata } from "next";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Se connecter · darso",
  description: "Retrouvez votre espace darso.",
};

export default function SignInPage() {
  return <SignInForm />;
}
