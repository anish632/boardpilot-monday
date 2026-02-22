export default function Terms() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="text-white/30 text-sm hover:text-white/50 transition-colors mb-8 inline-block">← Back</a>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-sm max-w-none text-white/60 space-y-6">
          <p><strong>Last updated:</strong> February 22, 2026</p>
          <p>These terms govern your use of BoardPilot, a monday.com Sidekick skill app operated by Das Group LLC.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Service Description</h2>
          <p>BoardPilot provides AI-powered project health analysis, status update generation, and task prioritization for monday.com boards through the Sidekick interface.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Usage</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must have a valid monday.com account to use BoardPilot.</li>
            <li>AI-generated analysis is provided as suggestions and should be reviewed before acting on them.</li>
            <li>We do not guarantee the accuracy of AI-generated content.</li>
          </ul>

          <h2 className="text-white text-xl font-semibold mt-8">Availability</h2>
          <p>BoardPilot is provided &quot;as is&quot; during the beta period. We may modify, suspend, or discontinue the service at any time.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Liability</h2>
          <p>Das Group LLC is not liable for any decisions made based on BoardPilot&apos;s AI-generated analysis. Use the insights as one input among many in your project management process.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Contact</h2>
          <p>For questions, contact us at <a href="mailto:support@dasgroupllc.com" className="text-orange-400 hover:text-orange-300">support@dasgroupllc.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
