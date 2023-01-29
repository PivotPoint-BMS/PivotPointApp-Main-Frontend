import { useEffect, useState } from 'react'

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

const useResponsive = (key: 'sm' | 'md' | 'lg' | 'xl' | '2xl', query: 'up' | 'down' = 'up') => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowWidth(window.innerWidth)
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  if (windowWidth)
    if (query === 'up') {
      if (windowWidth > BREAKPOINTS[key]) return true
      return false
    } else {
      if (windowWidth < BREAKPOINTS[key]) return true
      return false
    }
  return false
}

export default useResponsive
