const API_BASE = 'http://localhost:3000';

export async function createSession(email: string, name: string, phone: string) {
  const res = await fetch(`${API_BASE}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, phone })
  });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json() as Promise<{ sessionId: string }>;
}

export async function submitTelemetry(sessionId: string, action: string, payload: any) {
  const res = await fetch(`${API_BASE}/event`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, t_ms: Date.now(), action, payload })
  });
  if (!res.ok) throw new Error('Failed to submit telemetry');
  return res.json();
}

export async function submitSJT(sessionId: string, responses: Record<string, string>) {
  const res = await fetch(`${API_BASE}/sjt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, payload: responses })
  });
  if (!res.ok) throw new Error('Failed to submit SJT');
  return res.json();
}
