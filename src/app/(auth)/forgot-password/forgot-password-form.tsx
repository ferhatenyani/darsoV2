"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AuthField } from "@/components/auth/auth-field";
import { StatefulButton } from "@/components/library/stateful-button";
import { springSoft } from "@/lib/motion";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type View = "form" | "sent";

export function ForgotPasswordForm() {
  const reduce = useReducedMotion();
  const [view, setView] = useState<View>("form");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();

  const transition = reduce ? { duration: 0 } : springSoft;

  const handleSubmit = async () => {
    if (!email) {
      setError("Entrez votre email.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Format d'email invalide.");
      return;
    }
    setError(undefined);
    await new Promise((r) => setTimeout(r, 700));
    setView("sent");
  };

  const backToForm = () => {
    // Flip back with the email pre-filled so the user can immediately hit "Envoyer le lien" again.
    setView("form");
    requestAnimationFrame(() => {
      const btn = document.querySelector<HTMLButtonElement>(
        'form button[type="submit"]',
      );
      btn?.focus();
    });
  };

  const useAnotherEmail = () => {
    setEmail("");
    setError(undefined);
    setView("form");
  };

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8D93]">
          Mot de passe oublié
        </p>
        <h1
          className="mt-2 text-[32px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#0B0B0F]"
          style={{ fontFamily: "var(--font-cabinet), system-ui, sans-serif" }}
        >
          On vous renvoie
          <br />
          un lien.
        </h1>
        <p className="mt-3 text-[13px] leading-relaxed text-[#4A4D54]">
          Indiquez l&apos;email de votre compte darso. Nous vous envoyons un lien
          sécurisé pour choisir un nouveau mot de passe.
        </p>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        {view === "form" ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={transition}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-3.5"
            noValidate
          >
            <AuthField
              label="Email"
              id="email"
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
              value={email}
              onValueChange={setEmail}
              error={error}
            />

            <StatefulButton
              type="submit"
              className="!min-w-full !bg-[#0B0B0F] !text-white !py-3 !text-[13px]"
            >
              Envoyer le lien
            </StatefulButton>
          </motion.form>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={transition}
            className="rounded-[16px] border border-[#EFEFF1] bg-white p-5 shadow-[0_1px_2px_rgba(10,11,20,0.04)]"
          >
            <div className="mb-2 inline-flex h-6 items-center gap-1.5 rounded-full bg-[#DFFF3F] px-2.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-[#0B0B0F]">
              Envoyé
            </div>
            <p className="text-[14px] font-semibold text-[#0B0B0F]">
              Vérifiez votre boîte mail.
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#4A4D54]">
              Un lien de réinitialisation a été envoyé à{" "}
              <span className="font-semibold text-[#0B0B0F]">{email}</span>. Il
              expire dans 30 minutes.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <button
                type="button"
                onClick={backToForm}
                className="inline-flex h-8 items-center rounded-full border border-[#EFEFF1] bg-white px-3 text-[11.5px] font-semibold text-[#0B0B0F] transition hover:border-[#B0B3B8] hover:bg-[#F5F5F7]"
              >
                Renvoyer
              </button>
              <button
                type="button"
                onClick={useAnotherEmail}
                className="text-[11.5px] font-semibold text-[#0B0B0F] underline underline-offset-4 hover:no-underline"
              >
                Utiliser un autre email
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-[12.5px] text-[#4A4D54]">
        <Link
          href="/sign-in"
          className="font-semibold text-[#0B0B0F] underline-offset-4 hover:underline"
        >
          ← Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
