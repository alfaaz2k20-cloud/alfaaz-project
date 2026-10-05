import re

with open('frontend/src/recruit.js', 'r', encoding='utf-8') as f:
    code = f.read()

outbox_code = '''
const STATE_STORAGE_KEY = 'alfaaz_recruit_state';
const UNSENT_STORAGE_KEY = 'alfaaz_recruit_unsent'; // deprecated

const TelemetryOutbox = {
  dbPromise: null,
  init() {
    this.dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open('AlfaazRecruitDB', 2);
      req.onupgradeneeded = e => {
        if (!e.target.result.objectStoreNames.contains('outbox')) {
           e.target.result.createObjectStore('outbox', { keyPath: '_idbKey', autoIncrement: true });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return this.dbPromise;
  },
  async append(eventPayload) {
    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const tx = db.transaction('outbox', 'readwrite');
        const store = tx.objectStore('outbox');
        const payloadCopy = { ...eventPayload };
        const req = store.add(payloadCopy);
        req.onsuccess = () => {
          eventPayload._idbKey = req.result;
          resolve(req.result);
        };
        tx.onerror = () => reject(tx.error);
      });
    } catch(e) {
      console.warn('IDB append failed', e);
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
  }
};
TelemetryOutbox.init().catch(e => console.warn('IDB init failed', e));

let localStateSaveScheduled = false;
'''

code = code.replace(
    "const STATE_STORAGE_KEY = 'alfaaz_recruit_state';\nconst UNSENT_STORAGE_KEY = 'alfaaz_recruit_unsent';\nlet localStateSaveScheduled = false;",
    outbox_code
)

code = code.replace(
    "sessionStorage.setItem(UNSENT_STORAGE_KEY, JSON.stringify(state.telemetryQueue.slice(-100)));",
    "// UNSENT_STORAGE_KEY persistence removed in favor of explicit IDB append"
)

with open('frontend/src/recruit.js', 'w', encoding='utf-8') as f:
    f.write(code)
