// Manages the persistent simulation state
export class GameState {
    constructor(assessmentId, sessionId) {
        this.assessmentId = assessmentId;
        this.sessionId = sessionId;
        this.currentScene = null;
        this.simulatedTime = 9 * 60 + 17; // Start at 09:17 AM in minutes
        this.venueState = { exhibitionReady: false, layoutIssue: true };
        this.activeTasks = [];
        this.peopleStates = {
            curator: 'busy',
            missingArtist: 'unreachable',
            upsetArtist: 'frustrated',
            volunteer1: 'idle'
        };
        this.informationKnown = new Set();
        this.flags = new Set();
        this.consequences = [];
        this.behavioralEvents = [];
        this.timerExpired = false;
    }

    addTime(minutes) {
        this.simulatedTime += minutes;
    }

    getFormattedTime() {
        const h = Math.floor(this.simulatedTime / 60);
        const m = this.simulatedTime % 60;
        const period = h >= 12 ? 'PM' : 'AM';
        const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
        return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
    }

    setFlag(flag) {
        this.flags.add(flag);
    }

    hasFlag(flag) {
        return this.flags.has(flag);
    }

    addInformation(info) {
        this.informationKnown.add(info);
    }

    knows(info) {
        return this.informationKnown.has(info);
    }

    recordEvent(event) {
        this.behavioralEvents.push({
            timestamp: new Date().toISOString(),
            simulatedTime: this.getFormattedTime(),
            ...event
        });
    }
}
