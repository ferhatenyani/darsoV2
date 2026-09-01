import type { Metadata } from "next";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié · darso",
  description: "Recevez un lien pour réinitialiser votre mot de passe darso.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
