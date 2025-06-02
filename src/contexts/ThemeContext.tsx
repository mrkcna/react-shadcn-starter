import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type ThemeType = {
    theme: string
    setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeType | null>(null)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "shadcn-ui-theme",
}: {
    children: ReactNode
    defaultTheme?: string
    storageKey?: string
}) {
    const [theme, setTheme] = useState(
        () => {
            if (typeof window !== "undefined") {
                return localStorage.getItem(storageKey) ?? defaultTheme
            }
            return defaultTheme
        }
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (newTheme: string) => {
            localStorage.setItem(storageKey, newTheme)
            setTheme(newTheme)
        },
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(): ThemeType {
    const context = useContext(ThemeContext) // Changed from use() to useContext()

    if (context === null) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context
}