"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { StatefulButton } from "@/components/library/stateful-button";
import { StepIndicator } from "@/components/auth/step-indicator";
import { springSoft } from "@/lib/motion";
import { StepIdentity } from "./step-identity";
import { StepRole } from "./step-role";
import { StepTeacherNext } from "./step-teacher-next";

export type Role = "student" | "teacher";

export type IdentityState = {
  fullName: string;
  email: string;
  password: string;
  dobD: string;
  dobM: string;
  dobY: string;
  parentEmail: string;
};

export type IdentityErrors = Partial<
  Record<keyof IdentityState | "dob", string>
>;

// MOCK: replace when API lands
const STEPS_BASE = [
  { key: "identity", label: "Identité" },
  { key: "role", label: "Rôle" },
  { key: "verify", label: "Vérification" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function computeAge(d: string, m: string, y: string): number | null {
  if (d.length < 1 || m.length < 1 || y.length !== 4) return null;
  const day = Number(d);
  const month = Number(m);
  const year = Number(y);
  if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year))
    return null;
  const dt = new Date(year, month - 1, day);
  if (
    dt.getFullYear() !== year ||
    dt.getMonth() !== month - 1 ||
    dt.getDate() !== day
  )
    return null;
  const now = new Date();
  if (dt.getTime() > now.getTime()) return null;
  let age = now.getFullYear() - year;
  const beforeBirthday =
    now.getMonth() < month - 1 ||
    (now.getMonth() === month - 1 && now.getDate() < day);
  if (beforeBirthday) age -= 1;
  return age;
}

export function SignUpFlow() {
  const router = useRouter();
  const prefersReduced = useReducedMotion() ?? false;

  const [stepIndex, setStepIndex] = useState(0);
  const [identity, setIdentity] = useState<IdentityState>({
    fullName: "",
    email: "",
    password: "",
    dobD: "",
    dobM: "",
    dobY: "",
    parentEmail: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<IdentityErrors>({});
  const [role, setRole] = useState<Role | null>(null);

  const age = useMemo(
    () => computeAge(identity.dobD, identity.dobM, identity.dobY),
    [identity.dobD, identity.dobM, identity.dobY],
  );
  const isMinor = age !== null && age < 18;

  const validateIdentity = (): IdentityErrors => {
    const e: IdentityErrors = {};
    if (identity.fullName.trim().length < 2)
      e.fullName = "Entrez au moins 2 caractères.";
    if (!identity.email) e.email = "Entrez votre email.";
    else if (!EMAIL_RE.test(identity.email)) e.email = "Format d'email invalide.";
    if (!identity.password) e.password = "Entrez un mot de passe.";
    else if (identity.password.length < 8)
      e.password = "8 caractères minimum.";
    if (age === null)
      e.dob = "Date de naissance invalide.";
    if (isMinor) {
      if (!identity.parentEmail)
        e.parentEmail = "Requis pour les moins de 18 ans.";
      else if (!EMAIL_RE.test(identity.parentEmail))
        e.parentEmail = "Format d'email invalide.";
    }
    return e;
  };

  const identityLooksValid = useMemo(() => {
    return Object.keys(validateIdentity()).length === 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity, isMinor, age]);

  const steps = useMemo(
    () =>
      STEPS_BASE.map((s, i) => ({
        label: s.label,
        disabled: i === 2 && role !== "teacher",
      })),
    [role],
  );

  const goNext = async () => {
    if (stepIndex === 0) {
      const e = validateIdentity();
      setErrors(e);
      if (Object.keys(e).length) return;
      await new Promise((r) => setTimeout(r, 350));
      setStepIndex(1);
      return;
    }
    if (stepIndex === 1) {
      if (!role) return;
      await new Promise((r) => setTimeout(r, 350));
      if (role === "student") {
        router.push("/student");
        return;
      }
      setStepIndex(2);
    }
  };

  const goBack = () => {
    if (stepIndex === 0) return;
    setStepIndex((s) => s - 1);
  };

  const currentInvalid =
    (stepIndex === 0 && !identityLooksValid) ||
    (stepIndex === 1 && !role);

  const ctaLabel =
    stepIndex === 0
      ? "Continuer"
      : stepIndex === 1
        ? role === "teacher"
          ? "Continuer vers la vérification"
          : "Continuer"
        : "";

  const stepEnter = prefersReduced
    ? { duration: 0 }
    : springSoft;

  return (
    <div className="space-y-6">
      <StepIndicator steps={steps} current={stepIndex} />

      {stepIndex > 0 ? (
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#4A4D54] transition hover:text-[#0B0B0F]"
        >
          <ArrowLeft className="h-3 w-3" strokeWidth={2.25} />
          Retour
        </button>
      ) : null}

      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8D93]">
          {stepIndex === 0
            ? "Créer un compte"
            : stepIndex === 1
              ? "Choisissez votre rôle"
              : "Presque prêt"}
        </p>
        <h1
          className="mt-2 text-[30px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#0B0B0F]"
          style={{ fontFamily: "var(--font-cabinet), system-ui, sans-serif" }}
        >
          {stepIndex === 0 ? (
            <>
              Commençons par
              <br />
              faire connaissance.
            </>
          ) : stepIndex === 1 ? (
            <>
              Vous venez sur darso
              <br />
              plutôt pour…
            </>
          ) : (
            <>
              Bientôt en ligne
              <br />
              comme prof.
            </>
          )}
        </h1>
        <p className="mt-3 text-[13px] leading-relaxed text-[#4A4D54]">
          {stepIndex === 0
            ? "Quelques infos pour créer votre compte darso, en 30 secondes."
            : stepIndex === 1
              ? "Vous pourrez ajouter l'autre rôle plus tard depuis vos réglages."
              : "Encore une étape rapide pour débloquer les demandes d'élèves."}
        </p>
      </header>

      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: prefersReduced ? 0 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReduced ? 0 : -12 }}
            transition={stepEnter}
          >
            {stepIndex === 0 ? (
              <StepIdentity
                values={identity}
                onChange={(patch) =>
                  setIdentity((prev) => ({ ...prev, ...patch }))
                }
                errors={errors}
                showPw={showPw}
                onTogglePw={() => setShowPw((s) => !s)}
                isMinor={isMinor}
                reduceMotion={prefersReduced}
              />
            ) : stepIndex === 1 ? (
              <StepRole selected={role} onSelect={setRole} />
            ) : (
              <StepTeacherNext />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {stepIndex < 2 ? (
        <div className="space-y-3">
          <StatefulButton
            type="button"
            onClick={goNext}
            disabled={currentInvalid}
            className={
              "!min-w-full !bg-[#0B0B0F] !text-white !py-3 !text-[13px] " +
              (currentInvalid ? "!opacity-50 !cursor-not-allowed" : "")
            }
          >
            {ctaLabel}
          </StatefulButton>

          {stepIndex === 0 ? (
            <p className="text-center text-[12.5px] text-[#4A4D54]">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-[#0B0B0F] underline-offset-4 hover:underline"
              >
                Se connecter
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
