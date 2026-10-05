import re

with open('frontend/src/recruit.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the TelemetryOutbox object definition entirely
new_outbox = '''const TelemetryOutbox = {
  dbPromise: null,
  init() {
    this.dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open('AlfaazRecruitDB', 3);
      req.onupgradeneeded = e => {
        if (!e.target.result.objectStoreNames.contains('outbox')) {
           e.target.result.createObjectStore('outbox', { keyPath: '_idbKey' });
        } else if (e.oldVersion < 3) {
           e.target.result.deleteObjectStore('outbox');
           e.target.result.createObjectStore('outbox', { keyPath: '_idbKey' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return this.dbPromise;
  },
  async append(eventPayload) {
    if (!eventPayload._idbKey) {
        eventPayload._idbKey = crypto.randomUUID();
    }
    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const tx = db.transaction('outbox', 'readwrite');
        const store = tx.objectStore('outbox');
        const payloadCopy = { ...eventPayload };
        const req = store.add(payloadCopy);
        req.onsuccess = () => resolve(req.result);
        tx.onerror = () => reject(tx.error);
      });
    } catch(e) {
      console.warn('IDB append failed. State will only be persistent for the session.', e);
      eventPayload._idbFailed = true;
    }
  },
  async deleteMany(keys) {
    if (!keys || keys.length === 0) return;
    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const tx = db.transaction('outbox', 'readwrite');
        const store = tx.objectStore('outbox');
        keys.forEach(k => store.delete(k));
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch(e) {
      console.warn('IDB delete failed', e);
    }
  },
  async getAll() {
    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const tx = db.transaction('outbox', 'readonly');
        const req = tx.objectStore('outbox').getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(tx.error);
      });
    } catch(e) {
      console.warn('IDB getAll failed', e);
      return [];
    }
  },
  async clear() {
    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const tx = db.transaction('outbox', 'readwrite');
        tx.objectStore('outbox').clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) {}
  }
};'''

code = re.sub(r'const TelemetryOutbox = \{.*?\n\};\n', new_outbox + '\n', code, flags=re.DOTALL)

# Fix logEvent IDB integration
log_event_replace = '''
 eventPayload._idbKey = crypto.randomUUID();
 state.telemetryQueue.push(eventPayload);
 saveLocalState();
 TelemetryOutbox.append(eventPayload).catch(e => console.warn(e));
'''
code = code.replace(
    '''
 state.telemetryQueue.push(eventPayload);
 saveLocalState();
 TelemetryOutbox.append(eventPayload).catch(e => console.warn(e));
''',
    log_event_replace
)


with open('frontend/src/recruit.js', 'w', encoding='utf-8') as f:
    f.write(code)
