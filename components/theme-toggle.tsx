"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" />;
  }

  return (
    <div className="absolute top-5 right-5 z-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? (
          <SunIcon className="size-5.5 text-yellow-500" />
        ) : (
          <MoonIcon className="size-5.5 text-purple-800" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
