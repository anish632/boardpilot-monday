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

          <h2 className="text-white text-xl font-semibold mt-8">Acceptance of Terms</h2>
          <p>By installing or using BoardPilot, you agree to these terms. If you do not agree, uninstall the app from your monday.com account.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Usage</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must have a valid monday.com account to use BoardPilot.</li>
            <li>You are responsible for the content of your monday.com boards.</li>
            <li>AI-generated analysis is provided as suggestions and should be reviewed before acting on them.</li>
            <li>We do not guarantee the accuracy or completeness of AI-generated content.</li>
            <li>You agree not to use BoardPilot for any unlawful purpose or to violate monday.com&apos;s terms of service.</li>
          </ul>

          <h2 className="text-white text-xl font-semibold mt-8">Intellectual Property</h2>
          <p>BoardPilot and its original content, features, and functionality are owned by Das Group LLC. AI-generated outputs based on your board data are yours to use freely.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Pricing</h2>
          <p>BoardPilot is currently free. If we introduce paid features in the future, existing free functionality will remain available and we will provide advance notice of any pricing changes through the monday.com marketplace.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Availability</h2>
          <p>BoardPilot is provided &quot;as is&quot; without warranty of any kind. We may modify, suspend, or discontinue the service at any time with reasonable notice.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Limitation of Liability</h2>
          <p>Das Group LLC is not liable for any direct, indirect, incidental, or consequential damages arising from your use of BoardPilot, including decisions made based on AI-generated analysis. Use the insights as one input among many in your project management process.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Termination</h2>
          <p>You may stop using BoardPilot at any time by uninstalling it from your monday.com account. We may terminate or suspend access if these terms are violated.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of BoardPilot after changes constitutes acceptance of the updated terms.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Governing Law</h2>
          <p>These terms are governed by the laws of the United States.</p>

          <h2 className="text-white text-xl font-semibold mt-8">Contact</h2>
          <p>For questions, contact us at <a href="mailto:support@dasgroupllc.com" className="text-orange-400 hover:text-orange-300">support@dasgroupllc.com</a>.</p>
        </div>
      </div>
    </main>
  );
}
