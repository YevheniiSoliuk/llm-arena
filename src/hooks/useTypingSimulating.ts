import { useEffect, useState } from "react";

export const useTypingSimulating = (text: string) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < text.length - 1) {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        currentIndex++;

        const randomSpeed = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        setTimeout(typeText, randomSpeed);
      }
    };

    typeText();

    return () => setDisplayedText("");
  }, [text]);

  return displayedText;
};
