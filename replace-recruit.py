import codecs
import re

with codecs.open('frontend/sequence.html', 'r', 'utf-8') as f:
    html = f.read()

submission_logic = '''
    const payload = {
      sessionId: SESSION_ID,
      motorBaselineMs,
      isReliable,
      isQualified,
      metricsC1: c1,
      metricsC2: c2,
      sjtResponses,
      writtenProposal: document.getElementById('app-input').value.trim()
    };

    console.log("ALFAAZ EVALUATION PAYLOAD:", payload);

    document.getElementById('app-btn').textContent = "SEALING...";
    
    // We can create a basic identity first
    fetch('/api/volunteers/assessment/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            assessment_id: SESSION_ID, 
            session_id: SESSION_ID,
            identity: { name: "Applicant " + SESSION_ID, email: SESSION_ID + "@alfaaz.org", phone: "00000" } 
        })
    }).then(() => {
        return fetch('/api/volunteers/assessment/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                assessment_id: SESSION_ID, 
                interests: "Sequence Completed", 
                notes: JSON.stringify(payload) 
            })
        });
    }).then(() => {
        document.getElementById('app-btn').textContent = "SEALED";
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    }).catch(err => {
        console.error(err);
        alert("Sync error. Check console.");
    });
'''

html = re.sub(r'const payload = \{.*?console\.log\("ALFAAZ EVALUATION PAYLOAD:", payload\);', submission_logic, html, flags=re.DOTALL)

with codecs.open('frontend/recruit.html', 'w', 'utf-8') as f:
    f.write(html)
