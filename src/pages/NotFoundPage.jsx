import { InternalLink } from "../components/UI";

export default function NotFoundPage({ navigate }) {
  return (
    <div className="page-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl" aria-hidden="true">
        🏝️
      </span>
      <h1 className="font-display mt-5 text-3xl font-bold text-ink">หาเส้นทางนี้ไม่เจอ</h1>
      <p className="mt-3 mb-7 text-muted">กลับไปเปิดสารบัญ แล้วเลือกไกด์ที่ต้องการอ่านได้เลย</p>
      <InternalLink to="/" navigate={navigate} className="button-primary">
        กลับหน้าแรก
      </InternalLink>
    </div>
  );
}
