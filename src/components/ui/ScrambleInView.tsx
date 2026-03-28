import { useRef, useState, useEffect } from "react";
import { ScrambleText } from "./ScrambleText";

interface ScrambleInViewProps {
  text: string;
  className?: string;
  duration?: number;
}

export function ScrambleInView({ text, className, duration }: ScrambleInViewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { rootMargin: "-10%" });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      <ScrambleText text={text} trigger={isInView} duration={duration} />
    </span>
  );
}
