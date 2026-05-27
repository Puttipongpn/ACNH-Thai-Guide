import { useEffect, useState } from "react";
import type { Navigate } from "./types/content";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import { getCategory, getGuide } from "./data/content";
import CategoryPage from "./pages/CategoryPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";

interface LocationState {
  pathname: string;
  hash: string;
  query: string;
}

function currentLocation(): LocationState {
  return {
    pathname: window.location.pathname,
    hash: window.location.hash,
    query: new URLSearchParams(window.location.search).get("q") || "",
  };
}

export default function App() {
  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    function updateLocation() {
      setLocation(currentLocation());
    }
    window.addEventListener("popstate", updateLocation);
    return () => window.removeEventListener("popstate", updateLocation);
  }, []);

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash, location.query]);

  const navigate: Navigate = (to) => {
    window.history.pushState({}, "", to);
    setLocation(currentLocation());
  };

  function renderPage() {
    if (location.pathname === "/") return <HomePage navigate={navigate} />;
    if (location.pathname === "/search") return <SearchPage query={location.query} navigate={navigate} />;
    if (location.pathname.startsWith("/category/")) {
      const category = getCategory(location.pathname.replace("/category/", ""));
      return category ? <CategoryPage category={category} navigate={navigate} /> : <NotFoundPage navigate={navigate} />;
    }
    if (location.pathname.startsWith("/article/")) {
      const guide = getGuide(location.pathname.replace("/article/", ""));
      const category = guide && getCategory(guide.categoryId);
      return guide && category ? (
        <DetailPage guide={guide} category={category} navigate={navigate} />
      ) : (
        <NotFoundPage navigate={navigate} />
      );
    }
    return <NotFoundPage navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header navigate={navigate} currentPath={location.pathname} />
      <main>{renderPage()}</main>
      <footer className="border-t border-leaf/10 bg-white/35 pb-22 pt-9 text-center text-sm text-muted sm:pb-9">
        <p className="font-display font-bold text-ink">ACNH Thai Guide Index 🏝️</p>
        <p className="mt-2">สมุดสารบัญชุมชน สำหรับเก็บไกด์ดี ๆ ให้หาเจออีกครั้ง</p>
      </footer>
      <BottomNav navigate={navigate} />
    </div>
  );
}
