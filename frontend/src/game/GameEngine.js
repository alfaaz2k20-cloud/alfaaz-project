import { GameState } from './GameState.js';

export class GameEngine {
    constructor(apiClient, contentRouter) {
        this.apiClient = apiClient;
        this.contentRouter = contentRouter;
        this.state = null;
        this.onSceneChange = null;
        this.decisionTimer = null;
        this.currentSceneData = null;
        this.sceneStartTime = 0;
    }

    startSimulation(assessmentId, sessionId) {
        this.state = new GameState(assessmentId, sessionId);
        this.loadScene('intro_exhibition');
    }

    loadScene(sceneId) {
        if (this.decisionTimer) clearTimeout(this.decisionTimer);
        
        this.state.currentScene = sceneId;
        const scene = this.contentRouter.getScene(sceneId, this.state);
        
        if (!scene) {
            this.finishSimulation();
            return;
        }

        this.currentSceneData = scene;
        this.sceneStartTime = Date.now();
        
        // Execute delayed consequences if any are pending for this time/scene
        this.checkDelayedConsequences(sceneId);

        if (this.onSceneChange) {
            this.onSceneChange(scene, this.state);
        }

        // Start real-time decision window
        if (scene.timeLimitSeconds) {
            this.startTimer(scene.timeLimitSeconds);
        }
    }

    startTimer(seconds) {
        this.decisionTimer = setTimeout(() => {
            this.handleTimeout();
        }, seconds * 1000);
    }

    handleTimeout() {
        this.state.timerExpired = true;
        this.recordAction({
            actionId: 'TIMEOUT',
            actionText: 'Did not respond in time',
            timeCost: 2,
            tags: [{ tag: 'avoidance', direction: 'negative', strength: 1.0, context: 'Timed out on decision' }],
            nextScene: this.currentSceneData.defaultNext || 'next_default' // Fallback
        });
    }

    async recordAction(actionData) {
        if (this.decisionTimer) clearTimeout(this.decisionTimer);
        
        const actionDurationMs = Date.now() - this.sceneStartTime;
        const timeCost = actionData.timeCost || 1;
        
        // Apply state changes from action
        if (actionData.onExecute) {
            actionData.onExecute(this.state);
        }
        
        this.state.addTime(timeCost);

        const event = {
            scene_id: this.state.currentScene,
            decision_id: actionData.actionId,
            action: actionData.actionText,
            action_duration: actionDurationMs,
            timer_expired: this.state.timerExpired,
            state_before: "{}", // In a full implementation, serialize relevant state
            state_after: "{}", 
            behavior_tags: actionData.tags || [],
            consequence_id: actionData.consequence || null
        };
        
        this.state.timerExpired = false;
        this.state.recordEvent(event);
        
        // Fire API call asynchronously (don't block the UI)
        this.apiClient.logEvent(this.state.assessmentId, {
            timestamp: new Date().toISOString(),
            simulated_time: this.state.getFormattedTime(),
            ...event
        }).catch(err => console.error("Failed to log event", err));

        // Display consequence if immediate
        if (actionData.immediateConsequenceText) {
            await this.contentRouter.showConsequence(actionData.immediateConsequenceText);
        }

        this.loadScene(actionData.nextScene);
    }

    checkDelayedConsequences(sceneId) {
        // Evaluate flags and inject consequences if conditions are met
        // (Handled by content router to keep engine agnostic)
        this.contentRouter.applyConsequences(this.state);
    }

    finishSimulation() {
        if (this.onSceneChange) {
            this.onSceneChange({ isComplete: true }, this.state);
        }
    }
}
