import { useEffect, useState } from "react";
import { companyInfo } from "./config";

export default function App() {
  // tiles: logo (0), welcome (1), services (2..n-2), contact (last)
  const totalTiles = 2 + companyInfo.services.length + 1;
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Arrow-key navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setSelectedIndex((i) => (i + 1) % totalTiles);
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i - 1 + totalTiles) % totalTiles);
      if (e.key === "ArrowDown") {
        if (selectedIndex === 0) setSelectedIndex(1);
        else if (selectedIndex === 1) setSelectedIndex(2);
        else if (selectedIndex >= 2 && selectedIndex < totalTiles - 1) setSelectedIndex(totalTiles - 1);
      }
      if (e.key === "ArrowUp") {
        if (selectedIndex === totalTiles - 1) setSelectedIndex(2);
        else if (selectedIndex >= 2) setSelectedIndex(1);
        else if (selectedIndex === 1) setSelectedIndex(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, totalTiles]);

  const tileClass = (idx) =>
    `transition-all duration-300 rounded-2xl ${
      selectedIndex === idx
        ? "ring-4 ring-cyan-400 shadow-xl shadow-cyan-900/40 scale-[1.02]"
        : "hover:scale-[1.01]"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-8">
        {/* Logo tile */}
        <section className={`flex justify-center items-center py-8 bg-slate-800/40 backdrop-blur-sm ${tileClass(0)}`}>
          <img src={companyInfo.logo} alt="Logo" className="h-20 md:h-24 drop-shadow" />
        </section>

        {/* Welcome tile */}
        <section className={`text-center py-10 bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 backdrop-blur-sm ${tileClass(1)}`}>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {companyInfo.welcomeText}
          </h1>
        </section>

        {/* Services tiles (fixed height so grid doesn't collapse) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.services.map((s, i) => (
            <div key={i} className={`flip-card h-64 focus:outline-none ${tileClass(2 + i)}`} tabIndex={0}>
              <div className="flip-card-inner">
                {/* Front */}
                <div className="flip-card-front bg-gradient-to-br from-indigo-700 to-fuchsia-700">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                </div>
                {/* Back */}
                <div className="flip-card-back bg-gradient-to-br from-fuchsia-700 to-indigo-700">
                  <p className="text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Contact tile */}
        <section className={`text-center py-10 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm ${tileClass(totalTiles - 1)}`}>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>
            Email:{" "}
            <a className="text-teal-300" href={`mailto:${companyInfo.contact.email}`}>
              {companyInfo.contact.email}
            </a>
          </p>
          <p>Phone: <span className="text-teal-300">{companyInfo.contact.phone}</span></p>
          <p>Address: <span className="text-teal-300">{companyInfo.contact.address}</span></p>
        </section>
      </main>
    </div>
  );
}