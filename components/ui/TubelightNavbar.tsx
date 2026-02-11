import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  items?: {
    name: string
    url: string
    icon: LucideIcon
    className?: string
  }[]
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function TubelightNavbar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.nav-item-container')) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Cast motion.div to any to avoid type errors with layoutId in strict environments
  const MotionDiv = motion.div as any;

  return (
    <div
      className={cn(
        "fixed bottom-4 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-[60]",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          const hasSubItems = !!item.items

          return (
            <div key={item.name} className="relative nav-item-container">
              <a
                href={hasSubItems ? "#" : item.url}
                onClick={(e) => {
                  if (hasSubItems) {
                    e.preventDefault();
                    if (isActive) {
                      setIsDropdownOpen(!isDropdownOpen);
                    } else {
                      setActiveTab(item.name);
                      setIsDropdownOpen(true);
                    }
                  } else {
                    setActiveTab(item.name);
                    setIsDropdownOpen(false);
                  }
                }}
                className={cn(
                  "relative cursor-interactive text-sm font-semibold px-4 md:px-6 py-2 rounded-full transition-colors font-mono tracking-wide flex items-center gap-2 group",
                  "text-gray-600 dark:text-gray-400",
                  isActive && "bg-gray-100 dark:bg-white/10 text-primary dark:text-primary",
                )}
              >
                <span className={cn(
                  "hidden md:inline",
                  !isActive && "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-purple group-hover:to-primary group-hover:bg-[length:200%_auto] group-hover:animate-text-gradient group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                )}>{item.name}</span>
                <span className={cn(
                  "md:hidden",
                  !isActive && "group-hover:text-primary transition-colors duration-300"
                )}>
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <MotionDiv
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </MotionDiv>
                )}
              </a>
              
              {/* Dropdown Menu */}
              {hasSubItems && isActive && isDropdownOpen && (
                <div 
                   className={cn(
                     "absolute left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-2 flex flex-col gap-1 w-max shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top",
                     isMobile ? "bottom-full mb-4 origin-bottom" : "top-full mt-4 origin-top"
                   )}
                >
                  {item.items?.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary dark:hover:text-primary rounded-lg transition-colors font-mono",
                        subItem.className
                      )}
                    >
                       <subItem.icon size={16} />
                       <span>{subItem.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}