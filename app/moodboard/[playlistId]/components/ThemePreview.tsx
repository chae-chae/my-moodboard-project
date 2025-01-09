"use client";

import React from "react";
import { themes } from "../../../../lib/themes";

interface Theme {
  background: string;
  text: string;
  card: string;
  highlight: string;
}

interface ThemePreviewProps {
  currentThemeName: string;
  customThemes: { [key: string]: Theme };
  onThemeSelect: (themeName: string) => void;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({
  currentThemeName,
  customThemes,
  onThemeSelect,
}) => {
  const allThemes = { ...themes, ...customThemes };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Theme Preview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(allThemes).map(([themeKey, theme]) => (
          <button
            key={themeKey}
            onClick={() => onThemeSelect(themeKey)}
            className="rounded-lg shadow-md p-4 text-center"
            style={{
              backgroundColor: theme.card,
              color: theme.text,
              border:
                currentThemeName === themeKey
                  ? `2px solid ${theme.highlight}`
                  : "2px solid transparent",
            }}
          >
            <div
              className="h-12 w-full rounded mb-2"
              style={{
                backgroundColor: theme.background,
                border: `1px solid ${theme.text}`,
              }}
            ></div>
            <p className="text-sm font-medium">{themeKey}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ThemePreview;
