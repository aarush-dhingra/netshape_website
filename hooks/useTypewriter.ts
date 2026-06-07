"use client";

import { useState, useEffect } from "react";

export function useTypewriter(lines: string[], typingSpeed = 40, pauseBetween = 800) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const copy = [...prev];
          if (copy.length <= currentLineIndex) {
            copy.push(currentLine.slice(0, currentCharIndex + 1));
          } else {
            copy[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          }
          return copy;
        });
        setCurrentCharIndex((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((l) => l + 1);
        setCurrentCharIndex(0);
      }, pauseBetween);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, pauseBetween]);

  return { displayedLines, isComplete };
}
