
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../components/ThemProvider";

type Theme = "light" | "dark";

export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be within ThemeProvider")
    }

    return context;
}
