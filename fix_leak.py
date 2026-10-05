import re

with open('frontend/src/recruit.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix 1: delete copy._idbFailed in _executeFlushTelemetry
code = code.replace(
    'delete copy._idbKey;\n       return copy;',
    'delete copy._idbKey;\n       delete copy._idbFailed;\n       return copy;'
)

# Fix 2: fix beacon payload to map out _idbKey and _idbFailed
beacon_replace = '''   const beaconEvents = state.telemetryQueue.slice(0, telemetryBatchSize).map(ev => {
       const copy = { ...ev };
       delete copy._idbKey;
       delete copy._idbFailed;
       return copy;
   });
   const payload = JSON.stringify({
   session_id: state.sessionId,
   events: beaconEvents
   });'''
   
code = code.replace(
    '''   const payload = JSON.stringify({
   session_id: state.sessionId,
   events: state.telemetryQueue.slice(0, telemetryBatchSize)
   });''',
    beacon_replace
)

with open('frontend/src/recruit.js', 'w', encoding='utf-8') as f:
    f.write(code)
