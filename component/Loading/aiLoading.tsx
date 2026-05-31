import React, { ReactNode } from "react";

type LoadingPreps = {
  children: ReactNode;
};

export default function AiLoad({ children }: LoadingPreps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      {/* Rotating Spinner */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />

      {/* Loading Text */}
      {children}
    </div>
  );
}
