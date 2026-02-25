export default function Guide() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="text-white/30 text-sm hover:text-white/50 transition-colors mb-8 inline-block">&larr; Back</a>
        <h1 className="text-4xl font-bold mb-4">Getting Started with BoardPilot</h1>
        <p className="text-white/50 mb-12">Learn how to install and use BoardPilot&apos;s AI-powered skills in monday.com Sidekick.</p>

        <div className="prose prose-invert prose-sm max-w-none text-white/60 space-y-6">
          <h2 className="text-white text-2xl font-semibold mt-8">Installation</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Click the <strong>Install</strong> button on the BoardPilot marketplace listing.</li>
            <li>Select the workspace where you want to add BoardPilot.</li>
            <li>Authorize the requested permissions (<code className="text-orange-400">boards:read</code> and <code className="text-orange-400">users:read</code>).</li>
            <li>BoardPilot is now installed and ready to use.</li>
          </ol>

          <h2 className="text-white text-2xl font-semibold mt-12">Enabling the Skill</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Open any board in your workspace.</li>
            <li>Click <strong>Sidekick</strong> in the top navigation bar.</li>
            <li>Click the <strong>+</strong> icon or <strong>Manage skills</strong> at the bottom of the Sidekick panel.</li>
            <li>Find <strong>BoardPilot</strong> (or &quot;Sidekick skill feature&quot;) and toggle it <strong>On</strong>.</li>
          </ol>

          <h2 className="text-white text-2xl font-semibold mt-12">Using the Skills</h2>
          <p>Once enabled, you can use BoardPilot by typing natural language requests in the Sidekick chat. BoardPilot includes three skills:</p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
            <h3 className="text-white text-lg font-semibold mb-3">Analyze Board Health</h3>
            <p className="mb-3">Get an instant health score (0-100) for your board with a breakdown of bottlenecks and risks.</p>
            <p className="text-white/40 text-xs mb-2">Try saying:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>&quot;Analyze the health of this board&quot;</li>
              <li>&quot;What&apos;s the status of this project?&quot;</li>
              <li>&quot;Are there any risks on this board?&quot;</li>
            </ul>
            <p className="mt-3"><strong className="text-white">Returns:</strong> Health score, total/completed/overdue/stuck/unassigned item counts, and actionable recommendations.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4">
            <h3 className="text-white text-lg font-semibold mb-3">Draft Status Update</h3>
            <p className="mb-3">Generate a polished project status report from your board&apos;s live data.</p>
            <p className="text-white/40 text-xs mb-2">Try saying:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>&quot;Draft a status update for this board&quot;</li>
              <li>&quot;Write a project report&quot;</li>
              <li>&quot;Generate a status update for stakeholders&quot;</li>
            </ul>
            <p className="mt-3"><strong className="text-white">Returns:</strong> Executive summary, progress breakdown, risks &amp; issues, and recommendations. Adapts tone for team or stakeholder audiences.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4">
            <h3 className="text-white text-lg font-semibold mb-3">Smart Prioritize Tasks</h3>
            <p className="mb-3">Get an AI-ranked priority list of your active tasks.</p>
            <p className="text-white/40 text-xs mb-2">Try saying:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>&quot;Prioritize tasks on this board&quot;</li>
              <li>&quot;What should I focus on next?&quot;</li>
              <li>&quot;Rank my tasks by priority&quot;</li>
            </ul>
            <p className="mt-3"><strong className="text-white">Returns:</strong> Numbered priority list grouped into High/Medium/Low tiers, considering deadlines, blockers, assignee workload, and status.</p>
          </div>

          <h2 className="text-white text-2xl font-semibold mt-12">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>You ask Sidekick a question about your board.</li>
            <li>Sidekick identifies the matching BoardPilot skill and sends your board ID to our server.</li>
            <li>BoardPilot fetches your board data using a secure short-lived token provided by monday.com.</li>
            <li>The data is analyzed for health metrics (overdue items, stuck tasks, completion rates, etc.).</li>
            <li>AI generates a human-readable summary with actionable insights.</li>
            <li>The result is displayed in Sidekick. No data is stored.</li>
          </ol>

          <h2 className="text-white text-2xl font-semibold mt-12">Requirements</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>A monday.com account with Sidekick access.</li>
            <li>At least one board with items in your workspace.</li>
            <li>BoardPilot works best with boards that use <strong>Status</strong>, <strong>Date</strong>, and <strong>Person</strong> columns.</li>
          </ul>

          <h2 className="text-white text-2xl font-semibold mt-12">Tips for Best Results</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Keep item statuses up to date for accurate health scores.</li>
            <li>Assign due dates to items so overdue detection works.</li>
            <li>Assign people to items so unassigned work is flagged.</li>
            <li>Use &quot;Done&quot; or &quot;Complete&quot; status labels for finished items.</li>
          </ul>

          <h2 className="text-white text-2xl font-semibold mt-12">Privacy &amp; Security</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>BoardPilot only requests <code className="text-orange-400">boards:read</code> and <code className="text-orange-400">users:read</code> permissions — it never modifies your data.</li>
            <li>No board data is stored. All processing happens in real-time.</li>
            <li>Authentication uses monday.com&apos;s secure short-lived tokens.</li>
          </ul>
          <p className="mt-4">Read our full <a href="/privacy" className="text-orange-400 hover:text-orange-300">Privacy Policy</a> and <a href="/terms" className="text-orange-400 hover:text-orange-300">Terms of Service</a>.</p>

          <h2 className="text-white text-2xl font-semibold mt-12">Support</h2>
          <p>Need help? Contact us at <a href="mailto:support@dasgroupllc.com" className="text-orange-400 hover:text-orange-300">support@dasgroupllc.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
