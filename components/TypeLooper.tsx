
'use client';
import * as React from 'react';

type Props = {
  texts: string[];
  typingSpeed?: number;
  eraseSpeed?: number;
  pause?: number;
  className?: string;
};

export default function TypeLooper({
  texts,
  typingSpeed = 55,
  eraseSpeed = 30,
  pause = 1200,
  className = "mx-auto max-w-3xl text-lg sm:text-xl text-blue-100/90 font-medium tracking-wide",
}: Props) {
  const [i, setI] = React.useState(0);
  const [out, setOut] = React.useState("");
  const [del, setDel] = React.useState(false);

  React.useEffect(() => {
    const full = texts[i % texts.length];
    let t: number;

    if (!del) {
      if (out.length < full.length) {
        t = window.setTimeout(() => setOut(full.slice(0, out.length + 1)), typingSpeed);
      } else {
        t = window.setTimeout(() => setDel(true), pause);
      }
    } else {
      if (out.length > 0) {
        t = window.setTimeout(() => setOut(full.slice(0, out.length - 1)), eraseSpeed);
      } else {
        setDel(false);
        setI((x) => (x + 1) % texts.length);
      }
    }
    return () => clearTimeout(t);
  }, [out, del, i, texts, typingSpeed, eraseSpeed, pause]);

  return (
    <p className={className} aria-live="polite">
      {out}
      <span className="ml-1 inline-block w-0.5 h-6 align-[-2px] bg-blue-400 animate-pulse" />
    </p>
  );
}
