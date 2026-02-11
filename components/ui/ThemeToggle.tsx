import React, { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "../../lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Sync state with current document class on mount
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div
      className={cn(
        "flex items-center w-20 h-11 rounded-full cursor-pointer transition-all duration-300 shadow-lg",
        "bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleTheme()
        }
      }}
    >
      <div className="relative w-full h-full flex items-center px-1">
        <div
          className={cn(
            "absolute w-9 h-9 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center z-10",
             isDark 
               ? "translate-x-9 bg-zinc-800 border border-white/10" 
               : "translate-x-0 bg-white border border-gray-200"
          )}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
          )}
        </div>
        
        <div className={cn("absolute right-2.5 transition-opacity duration-300", isDark ? "opacity-0" : "opacity-100")}>
             <Moon className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
        </div>
        <div className={cn("absolute left-2.5 transition-opacity duration-300", isDark ? "opacity-100" : "opacity-0")}>
             <Sun className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}