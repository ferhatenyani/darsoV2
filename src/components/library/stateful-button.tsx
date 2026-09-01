"use client";

import React from "react";
import { motion, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

interface StatefulButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const StatefulButton = ({ className, children, ...props }: StatefulButtonProps) => {
  const [scope, animate] = useAnimate();

  const animateLoading = async () => {
    await animate(".loader", { width: "16px", scale: 1, display: "block" }, { duration: 0.2 });
  };

  const animateSuccess = async () => {
    await animate(".loader", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 });
    await animate(".check", { width: "16px", scale: 1, display: "block" }, { duration: 0.2 });
    await animate(".check", { width: "0px", scale: 0, display: "none" }, { delay: 1.6, duration: 0.2 });
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await animateLoading();
    await props.onClick?.(event);
    await animateSuccess();
  };

  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...buttonProps
  } = props;

  return (
    <motion.button
      layout
      ref={scope}
      className={cn(
        "flex min-w-[96px] cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#DFFF3F] px-3 py-1.5 text-[11.5px] font-semibold text-[#0B0B0F] transition-[filter] hover:brightness-[0.97]",
        className,
      )}
      {...buttonProps}
      onClick={handleClick}
    >
      <motion.div layout className="flex items-center gap-1.5">
        <Loader />
        <CheckMark />
        <motion.span layout>{children}</motion.span>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => (
  <motion.svg
    animate={{ rotate: [0, 360] }}
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="loader text-[#0B0B0F]"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3a9 9 0 1 0 9 9" />
  </motion.svg>
);

const CheckMark = () => (
  <motion.svg
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="check text-[#0B0B0F]"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
  </motion.svg>
);
