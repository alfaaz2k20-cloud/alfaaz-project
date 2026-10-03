import re

with open('frontend/src/recruit.js', 'r', encoding='utf-8') as f:
    code = f.read()

new_flush_all = """async function flushAllTelemetry() {
  // Wait for any active flush to finish to avoid lock collisions
  let retries = 0;
  while (isFlushing && retries < 10) {
    await new Promise(r => setTimeout(r, 500));
    retries++;
  }

  while (!state.telemetryTerminal && state.telemetryQueue.length > 0) {
    const queuedBeforeFlush = state.telemetryQueue.length;
    const sent = await flushTelemetry();
    if (!sent || state.telemetryQueue.length >= queuedBeforeFlush) return false;
  }
  return true;
}"""

code = re.sub(r'async function flushAllTelemetry\(\) \{[\s\S]*?return true;\n\}', new_flush_all, code)

with open('frontend/src/recruit.js', 'w', encoding='utf-8') as f:
    f.write(code)
