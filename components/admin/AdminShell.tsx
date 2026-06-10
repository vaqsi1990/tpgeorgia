"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "ადმინის პანელი" },
  { href: "/admin/tours", label: "ტურები" },
  { href: "/admin/excursions", label: "ექსკურსიები" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f4faf8] text-black">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="font-afacad text-xl font-semibold">TP Georgia ადმინის პანელი</p>
            <p className="text-[13px] text-black/60">მართეთ ტურები და ექსკურსიები</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/ka"
              className="rounded-xl border border-black/15 px-4 py-2 text-[14px] font-medium transition-colors hover:bg-brand/5"
            >
              მთავარი გვერდი
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-black/15 px-4 py-2 text-[14px] font-medium transition-colors hover:bg-brand/5"
            >
              გამოსვლა
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
                  active
                    ? "bg-[#38ab8a] text-white"
                    : "text-black/70 hover:bg-brand/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
