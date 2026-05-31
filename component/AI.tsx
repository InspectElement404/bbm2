"use client";

import { useEffect, useRef } from "react";
import AiLoad from "./Loading/aiLoading";
import { AISuperProps } from "./Face";

function AI({ Reg, Pressed, AIprps, Loadprops, ProProps }: AISuperProps) {
  const { regData } = Reg;
  const { tuldok } = Pressed;
  const { aiMsg, setAI } = AIprps;
  const { loading, setLoading } = Loadprops;
  const { myprompt } = ProProps;

  const firstRender = useRef(true);

  async function getSummary(input: string) {
    const response = await fetch(
      `/api/summarizer/ai?input=${encodeURIComponent(input)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch AI summary");
    }

    const { message } = await response.json();

    return message;
  }

  useEffect(() => {
    if (!myprompt) return;
    //    console.log(`Ma Hump: ${myprompt}`)
  }, [myprompt]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const fetchSummary = async () => {
      if (!myprompt) return;

      try {
        setLoading(true);
        console.log(`Myprompt Content: ${myprompt}`);

        const message = await getSummary(myprompt);

        setAI(message);
      } catch (error) {
        console.error("AI summary fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [tuldok, myprompt]);

  if (loading) {
    return (
      <AiLoad>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-slate-800">
            Generating AI Insights
          </h1>
          <p className="animate-pulse text-sm text-slate-500">
            Please wait while AI prepares the summary...
          </p>
        </div>
      </AiLoad>
    );
  }

  return (
    <div>
      <p className="text-justify ">{aiMsg}</p>
    </div>
  );
}

export default AI;
