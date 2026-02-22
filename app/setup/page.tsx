export default function Setup() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="text-white/30 text-sm hover:text-white/50 transition-colors mb-8 inline-block">← Back</a>
        <h1 className="text-4xl font-bold mb-8">Setup Guide</h1>
        <div className="prose prose-invert prose-sm max-w-none text-white/60 space-y-6">
          <h2 className="text-white text-xl font-semibold">1. Install BoardPilot</h2>
          <p>Install the app from the monday.com Marketplace. It will automatically register three Sidekick skills for your account.</p>

          <h2 className="text-white text-xl font-semibold mt-8">2. Enable Skills in Sidekick</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open any board in monday.com</li>
            <li>Click the Sidekick button (AI assistant)</li>
            <li>Click the <strong>Skills</strong> button in the sidekick menu</li>
            <li>Find BoardPilot skills and toggle them on</li>
          </ol>

          <h2 className="text-white text-xl font-semibold mt-8">3. Start Using</h2>
          <p>Just talk to Sidekick naturally:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><code>&quot;Analyze the health of the Product Roadmap board&quot;</code></li>
            <li><code>&quot;Draft a status update for the Sprint 12 board&quot;</code></li>
            <li><code>&quot;Prioritize tasks on the Engineering board&quot;</code></li>
          </ul>

          <h2 className="text-white text-xl font-semibold mt-8">Available Skills</h2>
          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-white font-semibold">🏥 Analyze Board Health</h3>
              <p className="mt-1">Scores project health (0-100), identifies bottlenecks, surfaces risk signals.</p>
            </div>
            <div className="p-4 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-white font-semibold">📋 Draft Status Update</h3>
              <p className="mt-1">Generates a polished status update with done/in-progress/blocked/upcoming sections.</p>
            </div>
            <div className="p-4 rounded-lg border border-white/10 bg-white/5">
              <h3 className="text-white font-semibold">🎯 Smart Prioritize</h3>
              <p className="mt-1">AI-ranked task list based on deadlines, blockers, and workload balance.</p>
            </div>
          </div>

          <h2 className="text-white text-xl font-semibold mt-8">Need Help?</h2>
          <p>Contact us at <a href="mailto:support@dasgroupllc.com" className="text-orange-400 hover:text-orange-300">support@dasgroupllc.com</a></p>
        </div>
      </div>
    </main>
  );
}
