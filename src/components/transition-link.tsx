"use client";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function TransitionLink({
  href,
  children,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const transitionDiv = document.getElementById("transition-page");
    transitionDiv?.classList.add("page-transition");
    await sleep(500);
    router.push(href);
    transitionDiv?.classList.remove("page-transition");
  };

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        handleTransition(e);
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
