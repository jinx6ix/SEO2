export const cacheConfig = {
  // Static assets - long cache
  static: {
    "Cache-Control": "public, max-age=31536000, immutable",
  },

  // API responses - short cache with revalidation
  api: {
    "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
  },

  // HTML pages - cache with revalidation
  pages: {
    "Cache-Control": "public, max-age=0, must-revalidate",
  },

  // Images - medium cache
  images: {
    "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
  },
}

// Service Worker registration for offline support
export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js")
        console.log("SW registered: ", registration)
      } catch (registrationError) {
        console.log("SW registration failed: ", registrationError)
      }
    })
  }
}

// Critical CSS inlining utility
export function inlineCriticalCSS(css: string) {
  if (typeof document !== "undefined") {
    const style = document.createElement("style")
    style.textContent = css
    style.setAttribute("data-critical", "true")
    document.head.appendChild(style)
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {},
) {
  const defaultOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  }

  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    return new IntersectionObserver(callback, defaultOptions)
  }

  return null
}
