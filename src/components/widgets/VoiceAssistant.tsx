"use client";

import { useState } from "react";
import { Mic } from "lucide-react";

const commands = [
  { phrase: "skills", target: "skills" },
  { phrase: "projects", target: "projects" },
  { phrase: "about", target: "about" },
  { phrase: "contact", target: "contact" },
  { phrase: "education", target: "education" },
];

type SpeechRecognitionConstructor = new () => {
  lang: string;
  start: () => void;
  onresult: ((event: {
    results: ArrayLike<ArrayLike<{ transcript: string }>>;
  }) => void) | null;
  onend: (() => void) | null;
};

export const VoiceAssistant = () => {
  const speechRecognition =
    typeof window !== "undefined"
      ? ((window as typeof window & {
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
          SpeechRecognition?: SpeechRecognitionConstructor;
        }).webkitSpeechRecognition ||
          (window as typeof window & {
            webkitSpeechRecognition?: SpeechRecognitionConstructor;
            SpeechRecognition?: SpeechRecognitionConstructor;
          }).SpeechRecognition)
      : undefined;
  const [listening, setListening] = useState(false);
  const supported = Boolean(speechRecognition);

  const handleListen = () => {
    if (!speechRecognition) {
      return;
    }

    const recognition = new speechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      const match = commands.find((command) => text.includes(command.phrase));
      if (match) {
        document.getElementById(match.target)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  if (!supported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleListen}
      className={`fixed bottom-24 right-8 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-200 shadow-lg backdrop-blur ${
        listening ? "animate-pulse" : ""
      }`}
      aria-label="Voice command"
    >
      <Mic size={18} />
    </button>
  );
};
