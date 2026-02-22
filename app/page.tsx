export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-3 bg-monday/10 border border-monday/30 rounded-full px-5 py-2 text-monday text-sm font-medium">
          ✈️ monday.com Sidekick Skill
        </div>
        <h1 className="text-5xl font-bold">
          Board<span className="text-monday">Pilot</span>
        </h1>
        <p className="text-xl text-gray-400">
          AI Project Health Analyzer for monday.com
        </p>
        <div className="grid grid-cols-3 gap-4 pt-8">
          {[
            ["🩺", "Health Score", "Instant 0-100 board health rating"],
            ["⚠️", "Risk Finder", "Overdue, blocked & stale items"],
            ["📊", "Status Report", "Stakeholder-ready summaries"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-left">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-semibold">{title}</div>
              <div className="text-sm text-gray-500 mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
