import re

with open('frontend/src/recruit.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Make restoreLocalState async and load from IDB
restore_local_state = '''async function restoreLocalState() {
 try {
 const savedStateStr = sessionStorage.getItem(STATE_STORAGE_KEY);
 
 const idbEvents = await TelemetryOutbox.getAll();
 if (idbEvents && idbEvents.length > 0) {
     state.telemetryQueue = idbEvents;
 } else {
     const savedUnsentStr = sessionStorage.getItem(UNSENT_STORAGE_KEY);
     if (savedUnsentStr) {
         const parsedUnsent = JSON.parse(savedUnsentStr);
         if (Array.isArray(parsedUnsent)) {
             state.telemetryQueue = parsedUnsent;
         }
     }
 }

 if (savedStateStr) {
 const saved = JSON.parse(savedStateStr);
'''

code = code.replace(
    'function restoreLocalState() {\n try {\n const savedStateStr = sessionStorage.getItem(STATE_STORAGE_KEY);\n const savedUnsentStr = sessionStorage.getItem(UNSENT_STORAGE_KEY);\n\n if (savedUnsentStr) {\n const parsedUnsent = JSON.parse(savedUnsentStr);\n if (Array.isArray(parsedUnsent)) {\n state.telemetryQueue = parsedUnsent;\n }\n }\n\n if (savedStateStr) {\n const saved = JSON.parse(savedStateStr);',
    restore_local_state
)


# DOMContentLoaded awaits restoreLocalState
code = code.replace(
    '''document.addEventListener('DOMContentLoaded', async () => {
 startKeepAlivePing();
 restoreLocalState();''',
    '''document.addEventListener('DOMContentLoaded', async () => {
 startKeepAlivePing();
 await restoreLocalState();'''
)

# logEvent IDB integration
log_event_replace = '''
 state.telemetryQueue.push(eventPayload);
 saveLocalState();
 TelemetryOutbox.append(eventPayload).catch(e => console.warn(e));
'''
code = code.replace(
    '''
 state.telemetryQueue.push(eventPayload);
 saveLocalState();
''',
    log_event_replace
)


# _executeFlushTelemetry IDB delete many
execute_flush = '''
 const sending = state.telemetryQueue.slice(0, telemetryBatchSize);
 const sendingIdbKeys = sending.map(ev => ev._idbKey).filter(k => k !== undefined);
 const payloadEvents = sending.map(ev => {
     const copy = { ...ev };
     delete copy._idbKey;
     return copy;
 });

 try {
 const resp = await apiFetch('/recruit/telemetry', {
 method: 'POST',
 body: JSON.stringify({
 session_id: state.sessionId,
 events: payloadEvents
 })
 });
'''

code = code.replace(
    '''
 const sending = state.telemetryQueue.slice(0, telemetryBatchSize);

 try {
 const resp = await apiFetch('/recruit/telemetry', {
 method: 'POST',
 body: JSON.stringify({
 session_id: state.sessionId,
 events: sending
 })
 });
''',
    execute_flush
)

# Replace the state.telemetryQueue splicing
# Look for:
#    state.telemetryQueue.splice(0, sending.length);
#    saveLocalState();
# Replace with:
#    state.telemetryQueue.splice(0, sending.length);
#    if (sendingIdbKeys.length > 0) TelemetryOutbox.deleteMany(sendingIdbKeys);
#    saveLocalState();
code = code.replace(
    "state.telemetryQueue.splice(0, sending.length);\n saveLocalState();",
    "state.telemetryQueue.splice(0, sending.length);\n if (sendingIdbKeys.length > 0) TelemetryOutbox.deleteMany(sendingIdbKeys);\n saveLocalState();"
)
code = code.replace(
    "state.telemetryQueue.splice(0, sending.length);\n if (data.result.new_rejected_count > 0)",
    "state.telemetryQueue.splice(0, sending.length);\n if (sendingIdbKeys.length > 0) TelemetryOutbox.deleteMany(sendingIdbKeys);\n if (data.result.new_rejected_count > 0)"
)
# And state.telemetryQueue = [] blocks (clearing queue)
code = code.replace(
    "state.telemetryQueue = [];",
    "state.telemetryQueue = [];\n TelemetryOutbox.clear().catch(e => console.warn(e));"
)

with open('frontend/src/recruit.js', 'w', encoding='utf-8') as f:
    f.write(code)
