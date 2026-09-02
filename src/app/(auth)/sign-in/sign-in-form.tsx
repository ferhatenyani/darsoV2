"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { StatefulButton } from "@/components/library/stateful-button";
import { AuthField } from "@/components/auth/auth-field";
import { SocialButton } from "@/components/auth/social-button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { email?: string; password?: string; form?: string };

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [magicSent, setMagicSent] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!email) next.email = "Entrez votre email.";
    else if (!EMAIL_RE.test(email)) next.email = "Format d'email invalide.";
    if (mode === "password") {
      if (!password) next.password = "Entrez votre mot de passe.";
      else if (password.length < 8)
        next.password = "8 caractères minimum.";
    }
    return next;
  };

  const handleSubmit = async () => {
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    await new Promise((r) => setTimeout(r, 700));

    if (mode === "magic") {
      setMagicSent(true);
      return;
    }

    console.log("[sign-in] submit", { email, remember });
    router.push("/student");
  };

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8D93]">
          Bon retour
        </p>
        <h1
          className="mt-2 text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#0B0B0F]"
          style={{ fontFamily: "var(--font-cabinet), system-ui, sans-serif" }}
        >
          Content de vous
          <br />
          revoir sur darso.
        </h1>
        <p className="mt-3 text-[13px] leading-relaxed text-[#4A4D54]">
          Connectez-vous pour retrouver vos séances, vos profs et vos messages.
        </p>
      </header>

      <div className="flex items-center gap-1 rounded-full bg-[#F0F0F2] p-1 text-[11.5px] font-semibold">
        <button
          type="button"
          onClick={() => {
            setMode("password");
            setMagicSent(false);
            setErrors({});
          }}
          className={
            "flex-1 rounded-full px-3 py-1.5 transition " +
            (mode === "password"
              ? "bg-white text-[#0B0B0F] shadow-[0_1px_2px_rgba(10,11,20,0.06)]"
              : "text-[#6E7178] hover:text-[#0B0B0F]")
          }
        >
          Mot de passe
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("magic");
            setErrors({});
          }}
          className={
            "flex-1 rounded-full px-3 py-1.5 transition " +
            (mode === "magic"
              ? "bg-white text-[#0B0B0F] shadow-[0_1px_2px_rgba(10,11,20,0.06)]"
              : "text-[#6E7178] hover:text-[#0B0B0F]")
          }
        >
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" strokeWidth={2.25} />
            Lien magique
          </span>
        </button>
      </div>

      {magicSent ? (
        <div className="rounded-[16px] border border-[#EFEFF1] bg-white p-5">
          <div className="mb-2 inline-flex h-6 items-center gap-1.5 rounded-full bg-[#DFFF3F] px-2.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-[#0B0B0F]">
            Envoyé
          </div>
          <p className="text-[14px] font-semibold text-[#0B0B0F]">
            Vérifiez votre boîte mail.
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#4A4D54]">
            Un lien de connexion a été envoyé à{" "}
            <span className="font-semibold text-[#0B0B0F]">{email}</span>. Il expire
            dans 15 minutes.
          </p>
          <button
            type="button"
            onClick={() => setMagicSent(false)}
            className="mt-3 text-[11.5px] font-semibold text-[#0B0B0F] underline underline-offset-4 hover:no-underline"
          >
            Utiliser un autre email
          </button>
        </div>
      ) : (
        <form
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
            error={errors.email}
          />

          {mode === "password" ? (
            <AuthField
              label="Mot de passe"
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onValueChange={setPassword}
              error={errors.password}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="grid h-7 w-7 place-items-center rounded-full text-[#8A8D93] transition hover:bg-[#F5F5F7] hover:text-[#0B0B0F]"
                >
                  {showPw ? (
                    <EyeOff className="h-3.5 w-3.5" strokeWidth={1.9} />
                  ) : (
                    <Eye className="h-3.5 w-3.5" strokeWidth={1.9} />
                  )}
                </button>
              }
            />
          ) : null}

          {mode === "password" ? (
            <div className="flex items-center justify-between pt-0.5">
              <label className="inline-flex cursor-pointer items-center gap-2 text-[11.5px] font-medium text-[#4A4D54]">
                <span className="relative grid h-[15px] w-[15px] place-items-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer absolute inset-0 cursor-pointer opacity-0"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none h-[15px] w-[15px] rounded-[4px] border border-[#B0B3B8] bg-white transition peer-checked:border-[#0B0B0F] peer-checked:bg-[#0B0B0F]"
                  />
                  <svg
                    aria-hidden
                    viewBox="0 0 12 12"
                    className="pointer-events-none absolute h-2.5 w-2.5 scale-0 text-[#DFFF3F] transition peer-checked:scale-100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 6.5l2.5 2.5L9.5 3.5" />
                  </svg>
                </span>
                Se souvenir de moi
              </label>
              <Link
                href="/forgot-password"
                className="text-[11.5px] font-semibold text-[#0B0B0F] underline-offset-4 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          ) : (
            <p className="text-[12px] leading-relaxed text-[#6E7178]">
              Nous vous enverrons un lien pour vous connecter sans mot de passe.
            </p>
          )}

          <StatefulButton
            type="submit"
            className="!min-w-full !bg-[#0B0B0F] !text-white !py-3 !text-[13px]"
          >
            {mode === "password" ? "Se connecter" : "Envoyer le lien"}
          </StatefulButton>

          {errors.form ? (
            <p className="text-center text-[12px] text-[#C53434]">{errors.form}</p>
          ) : null}
        </form>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-[#EFEFF1]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#EDEDEF] px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8D93] min-[900px]:bg-white">
            ou continuer avec
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <SocialButton provider="google" />
        <SocialButton provider="apple" />
      </div>

      <p className="text-center text-[12.5px] text-[#4A4D54]">
        Pas encore de compte ?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-[#0B0B0F] underline-offset-4 hover:underline"
        >
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
