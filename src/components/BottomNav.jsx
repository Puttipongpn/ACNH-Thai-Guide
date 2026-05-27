import { InternalLink } from "./UI";

const bottomItems = [
  { label: "หน้าแรก", icon: "🏡", path: "/" },
  { label: "สารบัญ", icon: "📚", path: "/#all-guides" },
  { label: "ค้นหา", icon: "🔎", path: "/search" },
  { label: "News", icon: "📰", path: "/category/news" },
];

export default function BottomNav({ navigate }) {
  return (
    <nav className="bottom-nav sm:hidden" aria-label="ทางลัดมือถือ">
      {bottomItems.map((item) => (
        <InternalLink key={item.label} to={item.path} navigate={navigate} className="bottom-link">
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </InternalLink>
      ))}
    </nav>
  );
}
