import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component ensures that the window scrolls to the top on every route change.
const ScrollToTop = () => {
  // Extracts the pathname from the current location object.
  const { pathname } = useLocation();

  // The useEffect hook will run every time the `pathname` changes.
  useEffect(() => {
    // This command scrolls the window to the very top (x: 0, y: 0).
    window.scrollTo(0, 0);
  }, [pathname]); // The effect depends on the pathname.

  // This component doesn't render any visible UI, so it returns null.
  return null;
};

export default ScrollToTop;
