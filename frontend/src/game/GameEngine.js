import { ContentRouter } from '../content/Scenarios.js';
import { GameState } from './GameState.js';
import { API_URL } from './ApiClient.js'; // Ensure correct logic depending on local vs prod

export class GameEngine {
    constructor() {
        this.state = new GameState();
        this.router = new ContentRouter();
        this.currentSceneId = 'intro_exhibition';
        this.timer = null;
        this.timeRemaining = 0;
        
        // DOM Elements
        this.uiBg = document.getElementById('game-bg-layer');
        this.uiSpeaker = document.getElementById('vn-speaker');
        this.uiText = document.getElementById('vn-text');
        this.uiActions = document.getElementById('action-grid');
        this.uiClock = document.getElementById('sim-clock');
        this.uiTitle = document.getElementById('sim-title');
        this.uiTimerBar = document.getElementById('sim-timer-bar');

        this.typewriterInterval = null;
    }

    async start() {
        this.updateClock();
        await this.loadScene(this.currentSceneId);
    }

    async loadScene(sceneId) {
        if (sceneId === 'end') {
            document.getElementById('view-simulation').classList.remove('active');
            document.getElementById('view-final').classList.add('active');
            return;
        }

        const scene = this.router.getScene(sceneId, this.state);
        if (!scene) return;
        this.currentSceneId = sceneId;

        // UI Updates
        this.uiTitle.textContent = scene.title || 'Alfaaz Simulation';
        this.uiSpeaker.textContent = scene.speaker || 'Narrator';
        this.uiSpeaker.style.display = scene.speaker ? 'block' : 'none';
        
        if (scene.bg) {
            this.uiBg.style.background = scene.bg;
        }

        this.uiActions.innerHTML = '';
        this.uiTimerBar.style.width = '100%';
        
        await this.typeText(scene.text);
        this.renderActions(scene);
        this.startDecisionTimer(scene.timeLimitSeconds || 30);
    }

    typeText(text) {
        return new Promise((resolve) => {
            if (this.typewriterInterval) clearInterval(this.typewriterInterval);
            this.uiText.innerHTML = '';
            
            // Fast typing effect for game feel
            let i = 0;
            this.typewriterInterval = setInterval(() => {
                this.uiText.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(this.typewriterInterval);
                    resolve();
                }
            }, 15); // ms per char
        });
    }

    renderActions(scene) {
        scene.actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'vn-action-btn';
            btn.textContent = action.actionText;
            btn.onclick = () => this.handleAction(action);
            this.uiActions.appendChild(btn);
        });
    }

    startDecisionTimer(seconds) {
        this.timeRemaining = seconds;
        let startWidth = 100;
        const tickRate = 1000;
        
        if (this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            startWidth = (this.timeRemaining / seconds) * 100;
            this.uiTimerBar.style.width = `${startWidth}%`;

            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
                this.handleTimeout();
            }
        }, tickRate);
    }

    async handleAction(action) {
        if (this.timer) clearInterval(this.timer);
        this.uiActions.innerHTML = ''; // disable clicking

        const duration = 30 - this.timeRemaining;
        
        // Log to backend
        this.logEvent({
            action: action.actionId,
            scene_id: this.currentSceneId,
            action_duration: duration * 1000,
            timer_expired: false,
            simulated_time: this.state.getTimeString()
        });

        // Apply state changes
        if (action.onExecute) action.onExecute(this.state);
        this.state.advanceTime(action.timeCost || 5);
        this.updateClock();

        // Send observation tags to state
        if (action.tags) {
            action.tags.forEach(t => this.state.addObservation(t));
        }

        if (action.immediateConsequenceText) {
            await this.router.showConsequence(action.immediateConsequenceText);
        }

        this.loadScene(action.nextScene);
    }

    handleTimeout() {
        this.uiActions.innerHTML = '';
        this.logEvent({
            action: 'TIMEOUT_NO_DECISION',
            scene_id: this.currentSceneId,
            action_duration: 30000,
            timer_expired: true,
            simulated_time: this.state.getTimeString()
        });
        
        this.state.advanceTime(10);
        this.updateClock();
        
        const scene = this.router.getScene(this.currentSceneId, this.state);
        if (scene && scene.actions.length > 0) {
            // Default to last action (usually doing nothing/avoidance)
            const fallbackAction = scene.actions[scene.actions.length - 1];
            if (fallbackAction.tags) {
                fallbackAction.tags.forEach(t => this.state.addObservation(t));
            }
            this.loadScene(fallbackAction.nextScene || 'end');
        } else {
            this.loadScene('end');
        }
    }

    updateClock() {
        this.uiClock.textContent = this.state.getTimeString();
    }

    logEvent(payload) {
        if (!window.ASSESSMENT_ID) return;
        payload.assessment_id = window.ASSESSMENT_ID;
        
        fetch(`${API_URL}/volunteers/assessment/${window.ASSESSMENT_ID}/event`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => console.error("Telemetry error", err));
    }
}
