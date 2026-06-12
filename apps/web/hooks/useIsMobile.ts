import { useEffect, useState } from 'react'

const useIsMobile = (breakpoint: number = 768): boolean => {
    // Initialize with undefined to avoid SSR hydration mismatch
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        // Only run on client
        if (typeof window === 'undefined') return false
        return window.innerWidth < breakpoint
    })

    useEffect(() => {
        // Use matchMedia for better performance
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)

        // Update state based on media query
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches)
        }

        // Set initial value
        handleChange(mediaQuery)

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        } else {
            // Legacy browsers (Safari < 14)
            mediaQuery.addListener(handleChange)
            return () => mediaQuery.removeListener(handleChange)
        }
    }, [breakpoint])

    return isMobile
}

export default useIsMobile