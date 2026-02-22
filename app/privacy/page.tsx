export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="text-white/30 text-sm hover:text-white/50 transition-colors mb-8 inline-block">← Back</a>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none text-white/60 space-y-6">
          <p><strong>Last updated:</strong> February 22, 2026</p>
          <p>BoardPilot (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;) is operated by Das Group LLC. This privacy policy describes how we handle your data when you use the BoardPilot app for monday.com.</p>
          
          <h2 className="text-white text-xl font-semibold mt-8">Data We Access</h2>
          <p>When you use BoardPilot through monday.com Sidekick, we access:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Board names, structure, and item data (names, statuses, assignees, dates)</li>
            <li>Your monday.com user ID (for authentication)</li>
          </ul>
          <p>We access this data <strong>only during active skill execution</strong> using the short-lived token provided by monday.com.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Data We Store</h2>
          <p>We do <strong>not</strong> store any of your monday.com board data, items, or personal information. All data is processed in real-time and discarded after the response is generated.</p>

          <h2 className="text-white text-xl font-semibold mt-8">AI Processing</h2>
          <p>Board data is sent to our AI provider (Groq) for analysis during skill execution. This data is processed in real-time and is not stored by the AI provider for training or any other purpose.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Third-Party Services</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>monday.com</strong> — Platform provider</li>
            <li><strong>Groq</strong> — AI inference provider</li>
            <li><strong>Vercel</strong> — Application hosting</li>
          </ul>

          <h2 className="text-white text-xl font-semibold mt-8">Contact</h2>
          <p>For questions about this policy, contact us at <a href="mailto:support@dasgroupllc.com" className="text-orange-400 hover:text-orange-300">support@dasgroupllc.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
