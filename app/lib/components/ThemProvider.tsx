import React, { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = { theme: Theme, toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [theme, setTheme] = useState<Theme>("light");


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;

        if (savedTheme) setTheme(savedTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeProvider;