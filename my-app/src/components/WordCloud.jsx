import React, { useEffect, useRef, useState } from "react";
import "../styling/WordCloud.css";

const WordCloud = ({ words = [] }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [floatingWords, setFloatingWords] = useState([]);
  const animationRef = useRef(null);
  const wordsRef = useRef([]);

  // Your site's color palette
  const colors = [
    "#e76f51", // --site-dark-orange
    "#f4a261", // --site-light-orange
    "#e9c46a", // --site-yellow
    "#f7a088", // --ponyo-6 (peachy)
    "#e95c6c", // --ponyo-5 (coral)
  ];

  // Default words if none provided
  const defaultWords = [
    "games",
    "systems",
    "code",
    "UI/UX",
    "player",
    "choice",
    "reflection",
    "shift",
    "reveal",
    "uncomfortable",
    "software",
    "designer",
    "creative",
    "technical",
    "interactive",
    "experience",
    "researcher",
    "challenge",
  ];

  const wordList = words.length > 0 ? words : defaultWords;

  // Get container dimensions
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize words with spacing
  useEffect(() => {
    if (dimensions.width === 0 || wordsRef.current.length > 0) return;

    const minDistance = 60; // minimum pixels between words
    const maxAttempts = 100;

    const initialWords = [];

    wordList.forEach((text, index) => {
      let attempts = 0;
      let placed = false;
      let newWord;

      while (!placed && attempts < maxAttempts) {
        newWord = {
          id: `${index}-${Date.now()}-${attempts}`,
          text,
          x: Math.random() * dimensions.width - dimensions.width,
          y: Math.random() * dimensions.height,
          speed: Math.random() * 0.8 + 0.1,
          size: Math.floor(Math.random() * 24) + 18,
          opacity: Math.random() * 0.4 + 0.3,
          color: colors[index % colors.length],
        };

        // Check distance from all previously placed words
        let tooClose = false;
        for (let i = 0; i < initialWords.length; i++) {
          const existing = initialWords[i];
          const dx = newWord.x - existing.x;
          const dy = newWord.y - existing.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < minDistance) {
            tooClose = true;
            break;
          }
        }

        if (!tooClose) {
          placed = true;
        }

        attempts++;
      }

      initialWords.push(newWord);
    });

    wordsRef.current = initialWords;
    setFloatingWords(initialWords);
  }, [dimensions, wordList]);

  // Animation loop
  useEffect(() => {
    if (dimensions.width === 0 || floatingWords.length === 0) return;

    const animate = () => {
      setFloatingWords((prevWords) =>
        prevWords.map((word) => {
          let newX = word.x + word.speed;

          // Reset to left side with slight vertical variation
          if (newX > dimensions.width) {
            newX = -150; // further left to spread out
            // Add slight vertical variation on reset to prevent stacking
            word.y = Math.min(
              Math.max(word.y + (Math.random() * 40 - 20), 40),
              dimensions.height - 40,
            );
          }

          return {
            ...word,
            x: newX,
          };
        }),
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, floatingWords.length]);

  return (
    <div className="word-cloud-container" ref={containerRef}>
      {floatingWords.map((word) => (
        <div
          key={word.id}
          className="floating-word"
          style={{
            left: `${word.x}px`,
            top: `${word.y}px`,
            fontSize: `${word.size}px`,
            opacity: word.opacity,
            color: word.color,
          }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};

export default WordCloud;
