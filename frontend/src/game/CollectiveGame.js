export class CollectiveGame {
  constructor(canvasElement, { onComplete, onEvent }) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.onComplete = onComplete || (() => {});
    this.onEvent = onEvent || (() => {});

    this.VIRTUAL_WIDTH = 1000;
    this.VIRTUAL_HEIGHT = 700;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;

    this.isRunning = false;
    this.lastTime = 0;
    this.gameTime = 0;
    this.phaseTime = 0;
    this.phaseIndex = 0;
    this.phaseDuration = 180;
    this.transitioning = false;
    this.transitionProgress = 0;

    this.shakeTimer = 0;

    this.inventory = [];
    this.inventoryFullTimer = 0;

    this.persons = [];
    this.resources = [];
    this.projects = [];
    this.fogs = [];
    
    this.helper = {
      x: 500, y: 350, radius: 20, state: 'idle', target: null, 
      resources: [], struggling: false, moveTimer: 0, interactTimer: 0, visible: true
    };
    
    this.mountain = {
      x: 500, y: 30, width: 60, height: 45, taps: 0, flagHeight: 0, visible: false
    };
    
    this.creativeZone = {
      x: 100, y: 480, width: 200, height: 150, items: [], visible: false
    };

    this.disruptionTriggered = false;
    this.phaseEventsTriggered = {};
    
    this.entityIdCounter = 1;

    this.resourceColors = {
      'gold': '#bd6f5d',
      'teal': '#5d9b9b',
      'rose': '#c47a7a',
      'violet': '#8b7bb0'
    };
    this.resourceTypes = Object.keys(this.resourceColors);
    this.skinTones = ['#e8a87c', '#d4a574', '#c4956a', '#b08560', '#c9a67a'];

    this.boundHandlePointer = this.handlePointer.bind(this);
    this.boundResize = this.resize.bind(this);
  }

  start() {
    this.canvas.addEventListener('pointerdown', this.boundHandlePointer, { passive: false });
    this.canvas.addEventListener('touchstart', this.boundHandlePointer, { passive: false });
    window.addEventListener('resize', this.boundResize);
    
    this.resize();
    
    this.phaseIndex = 0;
    this.gameTime = 0;
    this.initPhase(0);

    this.isRunning = true;
    this.lastTime = performance.now();
    this.onEvent({ type: 'game_start', gameTime: 0 });
    requestAnimationFrame((t) => this.loop(t));
  }

  stop() {
    this.isRunning = false;
    this.canvas.removeEventListener('pointerdown', this.boundHandlePointer);
    this.canvas.removeEventListener('touchstart', this.boundHandlePointer);
    window.removeEventListener('resize', this.boundResize);
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    const scaleX = this.canvas.width / this.VIRTUAL_WIDTH;
    const scaleY = this.canvas.height / this.VIRTUAL_HEIGHT;
    this.scale = Math.min(scaleX, scaleY);
    
    this.offsetX = (this.canvas.width - this.VIRTUAL_WIDTH * this.scale) / 2;
    this.offsetY = (this.canvas.height - this.VIRTUAL_HEIGHT * this.scale) / 2;
  }

  loop(time) {
    if (!this.isRunning) return;
    
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;
    
    // Cap dt to prevent huge jumps if tab was inactive
    this.update(Math.min(dt, 0.1));
    this.render();
    
    requestAnimationFrame((t) => this.loop(t));
  }

  generateId(prefix = 'ent') {
    return `${prefix}_${this.entityIdCounter++}`;
  }

  initPhase(phase) {
    this.phaseTime = 0;
    this.transitioning = false;
    this.transitionProgress = 0;
    this.phaseEventsTriggered = {};
    
    if (phase === 0) {
      // Phase 1: Morning
      this.persons = [
        { id: this.generateId('p'), x: 250, y: 200, radius: 22, face: 'neutral', distressLevel: 0, distressRate: 0, needType: 'gold', helped: false, color: this.randomSkin(), bobPhase: Math.random() * Math.PI * 2, distressStart: 0 },
        { id: this.generateId('p'), x: 600, y: 280, radius: 22, face: 'neutral', distressLevel: 0, distressRate: 0.004, needType: 'teal', helped: false, color: this.randomSkin(), bobPhase: Math.random() * Math.PI * 2, distressStart: 0 },
        { id: this.generateId('p'), x: 180, y: 480, radius: 22, face: 'happy', distressLevel: 0, distressRate: 0, needType: 'rose', helped: false, color: this.randomSkin(), bobPhase: Math.random() * Math.PI * 2, distressStart: 0 },
        { id: this.generateId('p'), x: 730, y: 420, radius: 22, face: 'neutral', distressLevel: 0, distressRate: 0.003, needType: 'violet', helped: false, color: this.randomSkin(), bobPhase: Math.random() * Math.PI * 2, distressStart: 0 }
      ];
      
      this.resources = [];
      for (let i = 0; i < 8; i++) {
        this.addRandomResource();
      }
      
      this.projects = [
        { id: this.generateId('proj'), x: 400, y: 120, width: 80, height: 55, required: ['gold', 'teal'], placed: [], completed: false, isShared: false },
        { id: this.generateId('proj'), x: 700, y: 550, width: 80, height: 55, required: ['rose', 'violet', 'gold'], placed: [], completed: false, isShared: true }
      ];
      
      this.fogs = [
        { id: this.generateId('fog'), x: 0, y: 550, width: 130, height: 130, revealed: false, revealProgress: 0, hiddenResources: [this.randomResource(), this.randomResource()] },
        { id: this.generateId('fog'), x: 870, y: 0, width: 130, height: 130, revealed: false, revealProgress: 0, hiddenResources: [this.randomResource(), this.randomResource()] }
      ];
      
      this.helper.visible = true;
      this.helper.struggling = false;
      this.mountain.visible = false;
      this.creativeZone.visible = false;
    } 
    else if (phase === 1) {
      // Phase 2: Afternoon
      this.disruptionTriggered = false;
      
      // Keep unhelped persons, but cap total
      const surviving = this.persons.filter(p => !p.helped);
      this.persons = surviving;
      
      this.persons.push(
        { id: this.generateId('p'), x: 300, y: 300, radius: 22, face: 'neutral', distressLevel: 0, distressRate: 0.005, needType: 'gold', helped: false, color: this.randomSkin(), bobPhase: Math.random() * Math.PI * 2, distressStart: 0 },
        { id: this.generateId('p'), x: 500, y: 500, radius: 22, face: 'neutral', distressLevel: 0, distressRate: 0, needType: 'teal', helped: false, color: this.randomSkin(), bobPhase: Math.random() * Math.PI * 2, distressStart: 0 },
        { id: this.generateId('p'), x: 400, y: 200, radius: 22, face: 'sad', distressLevel: 0.4, distressRate: 0.003, needType: 'rose', helped: false, color: this.randomSkin(), bobPhase: Math.random() * Math.PI * 2, distressStart: 0 }
      );
      
      this.resources = [];
      for (let i = 0; i < 6; i++) {
        this.addRandomResource();
      }
      
      this.projects = [
        { id: this.generateId('proj'), x: 200, y: 150, width: 80, height: 55, required: ['violet', 'rose'], placed: [], completed: false, isShared: false },
        { id: this.generateId('proj'), x: 800, y: 300, width: 80, height: 55, required: ['gold', 'gold', 'teal'], placed: [], completed: false, isShared: true },
        { id: this.generateId('proj'), x: 550, y: 100, width: 80, height: 55, required: ['teal', 'violet'], placed: [], completed: false, isShared: false }
      ];
      
      this.fogs = [
        { id: this.generateId('fog'), x: 200, y: 500, width: 130, height: 130, revealed: false, revealProgress: 0, hiddenResources: [this.randomResource()] },
        { id: this.generateId('fog'), x: 800, y: 100, width: 130, height: 130, revealed: false, revealProgress: 0, hiddenResources: [] },
        { id: this.generateId('fog'), x: 50, y: 50, width: 130, height: 130, revealed: false, revealProgress: 0, hiddenResources: [this.randomResource()] }
      ];
    }
    else if (phase === 2) {
      // Phase 3: Evening
      const surviving = this.persons.filter(p => !p.helped);
      this.persons = surviving.slice(0, 4); // Max 4 old ones
      
      this.persons.push(
        { id: this.generateId('p'), x: 950, y: 650, radius: 22, face: 'neutral', distressLevel: 0, distressRate: 0, needType: 'violet', helped: false, color: this.randomSkin(), bobPhase: Math.random() * Math.PI * 2, distressStart: 0, isEdgeSitter: true }
      );
      
      this.resources = [];
      for (let i = 0; i < 4; i++) {
        this.addRandomResource();
      }
      
      this.projects = [
        { id: this.generateId('proj'), x: 600, y: 400, width: 80, height: 55, required: ['gold', 'teal', 'rose', 'violet'], placed: [], completed: false, isShared: true }
      ];
      
      this.fogs = [
        { id: this.generateId('fog'), x: 400, y: 550, width: 130, height: 130, revealed: false, revealProgress: 0, hiddenResources: [] }
      ];
      
      this.mountain.visible = true;
      this.creativeZone.visible = true;
    }
    
    this.onEvent({
      type: 'phase_start',
      phase: this.phaseIndex,
      gameTime: this.gameTime
    });
  }

  randomSkin() {
    return this.skinTones[Math.floor(Math.random() * this.skinTones.length)];
  }

  randomResource() {
    return this.resourceTypes[Math.floor(Math.random() * this.resourceTypes.length)];
  }

  addRandomResource() {
    // Avoid spawning inside fogs roughly
    let rx, ry, inFog;
    do {
      rx = 50 + Math.random() * (this.VIRTUAL_WIDTH - 100);
      ry = 50 + Math.random() * (this.VIRTUAL_HEIGHT - 100);
      inFog = this.fogs.some(f => rx > f.x && rx < f.x + f.width && ry > f.y && ry < f.y + f.height);
    } while(inFog);

    this.resources.push({
      id: this.generateId('res'),
      x: rx, y: ry,
      radius: 8,
      resourceType: this.randomResource(),
      collected: false,
      pulsePhase: Math.random() * Math.PI * 2
    });
  }

  triggerDisruption() {
    this.disruptionTriggered = true;
    this.shakeTimer = 1.0;
    this.helper.struggling = true;
    
    // Relocate resources
    this.resources.forEach(r => {
      if (!r.collected) {
        r.x = 50 + Math.random() * (this.VIRTUAL_WIDTH - 100);
        r.y = 50 + Math.random() * (this.VIRTUAL_HEIGHT - 100);
      }
    });
    
    // Reset one incomplete project
    const incomplete = this.projects.find(p => !p.completed && p.placed.length > 0);
    if (incomplete) {
      incomplete.placed = [];
    }

    this.onEvent({
      type: 'disruption',
      phase: this.phaseIndex,
      gameTime: this.gameTime,
      phaseTime: this.phaseTime
    });
  }

  update(dt) {
    this.gameTime += dt;
    
    if (this.shakeTimer > 0) {
      this.shakeTimer -= dt;
    }
    if (this.inventoryFullTimer > 0) {
      this.inventoryFullTimer -= dt;
    }

    if (this.transitioning) {
      this.transitionProgress += dt; // 3 second transition
      if (this.transitionProgress > 1 && this.transitionProgress - dt <= 1) {
        this.phaseIndex++;
        if (this.phaseIndex > 2) {
          this.stop();
          this.onComplete();
          return;
        }
        this.initPhase(this.phaseIndex);
      }
      if (this.transitionProgress >= 2) {
        this.transitioning = false;
      }
      return;
    }

    this.phaseTime += dt;

    // Check transitions
    if (this.phaseTime >= this.phaseDuration && !this.transitioning) {
      this.transitioning = true;
      this.transitionProgress = 0;
    }

    // Phase specific events
    if (this.phaseIndex === 0) {
      if (this.phaseTime >= 90 && !this.phaseEventsTriggered['spawn_resources']) {
        this.phaseEventsTriggered['spawn_resources'] = true;
        for (let i = 0; i < 4; i++) this.addRandomResource();
      }
    } else if (this.phaseIndex === 1) {
      if (this.phaseTime >= 90 && !this.disruptionTriggered) {
        this.triggerDisruption();
      }
    } else if (this.phaseIndex === 2) {
      if (this.phaseTime >= 90 && !this.phaseEventsTriggered['spawn_resources_3']) {
        this.phaseEventsTriggered['spawn_resources_3'] = true;
        for (let i = 0; i < 2; i++) this.addRandomResource();
      }
    }

    // Update Persons
    this.persons.forEach(p => {
      p.bobPhase += dt * Math.PI;
      if (!p.helped && !p.isEdgeSitter) {
        p.distressLevel += p.distressRate * dt;
        if (p.distressLevel > 1) p.distressLevel = 1;
        
        const oldFace = p.face;
        if (p.distressLevel < 0.3) p.face = 'neutral';
        else if (p.distressLevel < 0.6) p.face = 'sad';
        else p.face = 'distressed';
        
        if (p.face !== oldFace && (p.face === 'sad' || p.face === 'distressed')) {
          if (p.distressStart === 0) p.distressStart = this.phaseTime;
        }
      }
    });

    // Update Resources
    this.resources.forEach(r => {
      r.pulsePhase += dt * (Math.PI * 2 / 1.5);
    });

    // Update Fogs
    this.fogs.forEach(f => {
      if (f.revealed && f.revealProgress < 1) {
        f.revealProgress = Math.min(1, f.revealProgress + dt * 2);
      }
    });

    // Update Mountain
    if (this.mountain.visible) {
      const targetFlagHeight = this.mountain.taps * 3;
      this.mountain.flagHeight += (targetFlagHeight - this.mountain.flagHeight) * 5 * dt;
    }

    this.updateHelper(dt);
  }

  updateHelper(dt) {
    if (!this.helper.visible) return;

    const speed = this.helper.struggling ? 25 : 60;
    
    // Sometimes drop things if struggling
    if (this.helper.struggling && Math.random() < 0.01 && this.helper.resources.length > 0) {
      const type = this.helper.resources.pop();
      this.resources.push({
        id: this.generateId('res'),
        x: this.helper.x + (Math.random() * 40 - 20),
        y: this.helper.y + (Math.random() * 40 - 20),
        radius: 8, resourceType: type, collected: false, pulsePhase: 0
      });
      this.helper.emoji = '💦';
    }

    if (this.helper.state === 'idle') {
      // Pick target smarter
      let target = null;
      // If holding resources, prefer highly distressed people or projects
      if (this.helper.resources.length > 0) {
        const distressed = this.persons.filter(p => !p.helped).sort((a, b) => b.distressLevel - a.distressLevel);
        if (distressed.length > 0 && (distressed[0].distressLevel > 0.5 || Math.random() < 0.5)) {
          target = distressed[0];
          this.helper.emoji = '💡';
        } else {
          // Find incomplete shared projects
          const unfin = this.projects.filter(p => p.isShared && !p.completed && p.required.length > p.placed.length);
          if (unfin.length > 0) {
            target = unfin[0];
            this.helper.emoji = '🛠️';
          }
        }
      }
      
      // Otherwise, or if no people need help, look for resources
      if (!target && this.helper.resources.length < 3) {
        const availableResources = this.resources.filter(r => !r.collected);
        if (availableResources.length > 0) {
          // Find closest resource
          target = availableResources.reduce((closest, curr) => {
            const d1 = Math.hypot(closest.x - this.helper.x, closest.y - this.helper.y);
            const d2 = Math.hypot(curr.x - this.helper.x, curr.y - this.helper.y);
            return d2 < d1 ? curr : closest;
          }, availableResources[0]);
          this.helper.emoji = '🔍';
        }
      }
      
      if (target) {
        this.helper.target = target;
        this.helper.state = 'moving';
      } else {
        this.helper.emoji = '⏳'; // Just waiting
      }
    } else if (this.helper.state === 'moving' && this.helper.target) {
      // Validate target is still active
      const t = this.helper.target;
      const isInvalid = (t.radius === 8 && t.collected) || (t.radius === 22 && t.helped) || (t.placed && t.completed);
      
      if (isInvalid) {
        this.helper.state = 'idle';
        this.helper.target = null;
        this.helper.emoji = '❓';
        return;
      }
      
      // Move using simple lerp/steering for smoothness
      const tx = this.helper.target.x;
      const ty = this.helper.target.y;
      const dx = tx - this.helper.x;
      const dy = ty - this.helper.y;
      const dist = Math.hypot(dx, dy);
      
      if (dist < 20) {
        this.helper.state = 'interacting';
        this.helper.interactTimer = 1.0; // Faster interactions than before
        this.helper.emoji = '⚙️';
      } else {
        this.helper.x += (dx / dist) * speed * dt;
        this.helper.y += (dy / dist) * speed * dt;
      }
    } else if (this.helper.state === 'interacting') {
      this.helper.interactTimer -= dt;
      if (this.helper.interactTimer <= 0) {
        const t = this.helper.target;
        if (t.radius === 8 && !t.collected) {
          // Collected resource
          t.collected = true;
          if (this.helper.resources.length < 3) {
            this.helper.resources.push(t.resourceType);
          }
        } else if (t.radius === 22 && !t.helped && this.helper.resources.length > 0) {
          // Help person
          t.helped = true;
          t.face = 'happy';
          t.distressLevel = 0;
          this.helper.resources.pop();
        } else if (t.placed && !t.completed && this.helper.resources.length > 0) {
           // Place in project
           const res = this.helper.resources.pop();
           t.placed.push(res);
           if (t.placed.length >= t.required.length) {
             t.completed = true;
           }
        }
        this.helper.state = 'idle';
        this.helper.target = null;
      }
    }
  }

  handlePointer(e) {
    if (!this.isRunning || this.transitioning) return;
    
    e.preventDefault(); // Stop mobile scroll
    
    // Support multi-touch but just take the first changed touch or client point
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }
    
    const rect = this.canvas.getBoundingClientRect();
    // Convert to canvas pixel coords
    const canvasX = (clientX - rect.left) * (this.canvas.width / rect.width);
    const canvasY = (clientY - rect.top) * (this.canvas.height / rect.height);
    
    // Convert to virtual coords
    const vx = (canvasX - this.offsetX) / this.scale;
    const vy = (canvasY - this.offsetY) / this.scale;

    this.processInteraction(vx, vy);
  }

  processInteraction(x, y) {
    const tapRadius = 15; // generosity

    // 1. Resources
    for (const r of this.resources) {
      if (!r.collected && Math.hypot(r.x - x, r.y - y) <= r.radius + tapRadius) {
        if (this.inventory.length < 5) {
          r.collected = true;
          this.inventory.push(r.resourceType);
          this.onEvent({
            type: 'interaction', action: 'collect_resource', targetId: r.id, phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
            context: { resourceType: r.resourceType, totalCollected: this.inventory.length, inventoryWasFull: false }
          });
        } else {
          this.inventoryFullTimer = 1.0;
          this.onEvent({
            type: 'interaction', action: 'collect_resource', targetId: r.id, phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
            context: { resourceType: r.resourceType, totalCollected: this.inventory.length, inventoryWasFull: true }
          });
        }
        return;
      }
    }

    // 2. Persons
    for (const p of this.persons) {
      if (Math.hypot(p.x - x, p.y - y) <= p.radius + tapRadius) {
        if (!p.helped && this.inventory.length > 0) {
          let resIndex = this.inventory.indexOf(p.needType);
          let matchedNeed = true;
          if (resIndex === -1) {
            resIndex = 0; // Give first available
            matchedNeed = false;
          }
          const given = this.inventory.splice(resIndex, 1)[0];
          p.helped = true;
          p.face = 'happy';
          const timeSince = p.distressStart > 0 ? this.phaseTime - p.distressStart : 0;
          p.distressLevel = 0;
          p.distressRate = 0;
          
          this.onEvent({
            type: 'interaction', action: 'help_person', targetId: p.id, phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
            context: { distressLevel: p.distressLevel, timeSinceDistressStart: timeSince, needType: p.needType, resourceGiven: given, matchedNeed, inventorySize: this.inventory.length, nearbyPersonCount: this.persons.length }
          });
        }
        return;
      }
    }

    // 3. Projects
    for (const proj of this.projects) {
      if (x >= proj.x && x <= proj.x + proj.width && y >= proj.y && y <= proj.y + proj.height) {
        if (!proj.completed && this.inventory.length > 0) {
          // Check if inventory has any required
          const needed = proj.required.slice();
          proj.placed.forEach(pr => {
            const idx = needed.indexOf(pr);
            if (idx !== -1) needed.splice(idx, 1);
          });
          
          let placedRes = null;
          for (let i = 0; i < this.inventory.length; i++) {
            if (needed.includes(this.inventory[i])) {
              placedRes = this.inventory.splice(i, 1)[0];
              proj.placed.push(placedRes);
              break;
            }
          }
          
          if (placedRes) {
            if (proj.placed.length === proj.required.length) {
              proj.completed = true;
            }
            this.onEvent({
              type: 'interaction', action: 'place_in_project', targetId: proj.id, phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
              context: { projectProgress: proj.placed.length / proj.required.length, isShared: proj.isShared, wasAbandoned: false }
            });
          }
        }
        return;
      }
    }

    // 4. Fog
    for (let i = 0; i < this.fogs.length; i++) {
      const f = this.fogs[i];
      if (!f.revealed && x >= f.x && x <= f.x + f.width && y >= f.y && y <= f.y + f.height) {
        f.revealed = true;
        f.hiddenResources.forEach(type => {
          this.resources.push({
            id: this.generateId('res'),
            x: f.x + 20 + Math.random() * (f.width - 40),
            y: f.y + 20 + Math.random() * (f.height - 40),
            radius: 8, resourceType: type, collected: false, pulsePhase: 0
          });
        });
        this.onEvent({
          type: 'interaction', action: 'reveal_fog', targetId: f.id, phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
          context: { fogIndex: i, totalRevealed: this.fogs.filter(fg => fg.revealed).length, totalFogs: this.fogs.length }
        });
        return;
      }
    }

    // 5. Helper
    if (this.helper.visible && Math.hypot(this.helper.x - x, this.helper.y - y) <= this.helper.radius + tapRadius) {
      if (this.inventory.length > 0) {
        const res = this.inventory.shift();
        this.helper.resources.push(res);
        this.onEvent({
          type: 'interaction', action: 'help_helper', targetId: 'helper', phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
          context: { helperState: this.helper.state, resourceType: res }
        });
      }
      return;
    }

    // 6. Mountain
    if (this.mountain.visible && x >= this.mountain.x && x <= this.mountain.x + this.mountain.width && y >= this.mountain.y && y <= this.mountain.y + this.mountain.height) {
      this.mountain.taps++;
      this.onEvent({
        type: 'interaction', action: 'tap_mountain', targetId: 'mountain', phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
        context: { taps: this.mountain.taps }
      });
      return;
    }

    // 7. Creative Zone
    if (this.creativeZone.visible && x >= this.creativeZone.x && x <= this.creativeZone.x + this.creativeZone.width && y >= this.creativeZone.y && y <= this.creativeZone.y + this.creativeZone.height) {
      if (this.inventory.length > 0) {
        const res = this.inventory.shift();
        this.creativeZone.items.push({ x: x - this.creativeZone.x, y: y - this.creativeZone.y, type: res });
        this.onEvent({
          type: 'interaction', action: 'place_creative', targetId: 'creative', phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
          context: { resourceType: res }
        });
        return;
      }
    }

    // Empty tap
    this.onEvent({
      type: 'interaction', action: 'tap_empty', targetId: null, phase: this.phaseIndex, gameTime: this.gameTime, phaseTime: this.phaseTime,
      context: {}
    });
  }

  render() {
    this.ctx.fillStyle = '#000'; // backdrop
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    
    // Handle shake
    let shakeOffsetX = 0;
    let shakeOffsetY = 0;
    if (this.shakeTimer > 0) {
      shakeOffsetX = (Math.random() - 0.5) * 10 * this.scale;
      shakeOffsetY = (Math.random() - 0.5) * 10 * this.scale;
    }

    this.ctx.translate(this.offsetX + shakeOffsetX, this.offsetY + shakeOffsetY);
    this.ctx.scale(this.scale, this.scale);

    // Background
    this.ctx.fillStyle = '#f4f1ea';
    this.ctx.fillRect(0, 0, this.VIRTUAL_WIDTH, this.VIRTUAL_HEIGHT);

    // Grid
    this.ctx.strokeStyle = 'rgba(45,49,46,0.04)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for(let i=0; i<=this.VIRTUAL_WIDTH; i+=100) { this.ctx.moveTo(i,0); this.ctx.lineTo(i,this.VIRTUAL_HEIGHT); }
    for(let i=0; i<=this.VIRTUAL_HEIGHT; i+=100) { this.ctx.moveTo(0,i); this.ctx.lineTo(this.VIRTUAL_WIDTH,i); }
    this.ctx.stroke();

    // Creative Zone
    if (this.creativeZone.visible) {
      this.ctx.strokeStyle = 'rgba(45,49,46,0.25)';
      this.ctx.setLineDash([5, 5]);
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.creativeZone.x, this.creativeZone.y, this.creativeZone.width, this.creativeZone.height);
      this.ctx.setLineDash([]);
      
      this.creativeZone.items.forEach(item => {
        this.ctx.fillStyle = this.resourceColors[item.type];
        this.ctx.beginPath();
        this.ctx.arc(this.creativeZone.x + item.x, this.creativeZone.y + item.y, 4, 0, Math.PI * 2);
        this.ctx.fill();
      });
    }

    // Mountain
    if (this.mountain.visible) {
      this.ctx.fillStyle = '#8b908d';
      this.ctx.beginPath();
      this.ctx.moveTo(this.mountain.x + this.mountain.width / 2, this.mountain.y);
      this.ctx.lineTo(this.mountain.x + this.mountain.width, this.mountain.y + this.mountain.height);
      this.ctx.lineTo(this.mountain.x, this.mountain.y + this.mountain.height);
      this.ctx.fill();
      
      // Flag
      this.ctx.strokeStyle = '#333';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.mountain.x + this.mountain.width / 2, this.mountain.y);
      this.ctx.lineTo(this.mountain.x + this.mountain.width / 2, this.mountain.y - this.mountain.flagHeight);
      this.ctx.stroke();
      if (this.mountain.flagHeight > 5) {
        this.ctx.fillStyle = '#bd6f5d';
        this.ctx.fillRect(this.mountain.x + this.mountain.width / 2, this.mountain.y - this.mountain.flagHeight, 15, 10);
      }
    }

    // Projects
    this.projects.forEach(proj => {
      this.ctx.strokeStyle = proj.completed ? 'rgba(45,49,46,0.8)' : 'rgba(45,49,46,0.25)';
      if (!proj.completed) this.ctx.setLineDash([5, 5]);
      else this.ctx.setLineDash([]);
      
      this.ctx.lineWidth = proj.completed ? 3 : 2;
      
      this.ctx.beginPath();
      this.ctx.roundRect(proj.x, proj.y, proj.width, proj.height, 10);
      this.ctx.stroke();
      
      if (proj.completed) {
        this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
        this.ctx.fill();
      }

      if (proj.isShared) {
        this.ctx.strokeStyle = 'rgba(45,49,46,0.5)';
        this.ctx.beginPath();
        this.ctx.arc(proj.x + proj.width - 12, proj.y + 12, 4, 0, Math.PI * 2);
        this.ctx.arc(proj.x + proj.width - 16, proj.y + 12, 4, 0, Math.PI * 2);
        this.ctx.stroke();
      }

      // Draw resource slots
      const slotRadius = 5;
      const spacing = 15;
      const totalWidth = (proj.required.length - 1) * spacing;
      const startX = proj.x + proj.width / 2 - totalWidth / 2;
      const cy = proj.y + proj.height / 2;

      proj.required.forEach((req, i) => {
        const cx = startX + i * spacing;
        
        this.ctx.strokeStyle = this.resourceColors[req];
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, slotRadius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        if (i < proj.placed.length) {
          this.ctx.fillStyle = this.resourceColors[proj.placed[i]];
          this.ctx.fill();
        }
      });
    });
    this.ctx.setLineDash([]);

    // Fogs
    this.fogs.forEach(f => {
      if (f.revealProgress < 1) {
        this.ctx.fillStyle = `rgba(45,49,46,${0.35 * (1 - f.revealProgress)})`;
        this.ctx.fillRect(f.x, f.y, f.width, f.height);
        if (f.revealProgress === 0) {
          this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
          this.ctx.font = '30px Arial';
          this.ctx.textAlign = 'center';
          this.ctx.textBaseline = 'middle';
          this.ctx.fillText('?', f.x + f.width / 2, f.y + f.height / 2);
        }
      }
    });

    // Resources
    this.resources.forEach(r => {
      if (!r.collected) {
        const scale = 1 + Math.sin(r.pulsePhase) * 0.15;
        this.ctx.fillStyle = this.resourceColors[r.resourceType];
        this.ctx.beginPath();
        this.ctx.arc(r.x, r.y, r.radius * scale, 0, Math.PI * 2);
        this.ctx.fill();
      }
    });

    // Helper
    if (this.helper.visible) {
      this.ctx.fillStyle = '#7eb09b';
      this.ctx.beginPath();
      this.ctx.roundRect(this.helper.x - this.helper.radius, this.helper.y - this.helper.radius, this.helper.radius * 2, this.helper.radius * 2, 8);
      this.ctx.fill();
      
      // Draw held resources tiny
      this.helper.resources.forEach((res, i) => {
        this.ctx.fillStyle = this.resourceColors[res];
        this.ctx.beginPath();
        this.ctx.arc(this.helper.x - 10 + i * 10, this.helper.y - 10, 3, 0, Math.PI * 2);
        this.ctx.fill();
      });

      // Draw emoji
      if (this.helper.emoji) {
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.helper.emoji, this.helper.x, this.helper.y - this.helper.radius - 5);
      }
    }

    // Persons
    this.persons.forEach(p => {
      const bob = Math.sin(p.bobPhase) * 3;
      const py = p.y + bob;

      // Need ring
      this.ctx.strokeStyle = this.resourceColors[p.needType];
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(p.x, py, p.radius + 4, 0, Math.PI * 2);
      this.ctx.stroke();

      // Body
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Face
      this.ctx.fillStyle = '#333';
      this.ctx.beginPath();
      this.ctx.arc(p.x - 5, py - 4, 2, 0, Math.PI * 2);
      this.ctx.arc(p.x + 5, py - 4, 2, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.strokeStyle = '#333';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      if (p.face === 'happy') {
        this.ctx.arc(p.x, py + 6, 6, 0, Math.PI);
      } else if (p.face === 'neutral') {
        this.ctx.moveTo(p.x - 4, py + 6);
        this.ctx.lineTo(p.x + 4, py + 6);
      } else if (p.face === 'sad' || p.face === 'distressed') {
        this.ctx.arc(p.x, py + 8, 6, Math.PI, Math.PI * 2);
      }
      this.ctx.stroke();

      if (p.face === 'distressed') {
        this.ctx.beginPath();
        this.ctx.moveTo(p.x - 8, py - 8);
        this.ctx.lineTo(p.x - 3, py - 6);
        this.ctx.moveTo(p.x + 8, py - 8);
        this.ctx.lineTo(p.x + 3, py - 6);
        this.ctx.stroke();
      }
    });

    // Inventory
    this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
    this.ctx.fillRect(this.VIRTUAL_WIDTH / 2 - 120, 10, 240, 40);
    this.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    this.ctx.strokeRect(this.VIRTUAL_WIDTH / 2 - 120, 10, 240, 40);

    for (let i = 0; i < 5; i++) {
      const cx = this.VIRTUAL_WIDTH / 2 - 80 + i * 40;
      const cy = 30;
      
      this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      this.ctx.fill();

      if (i < this.inventory.length) {
        this.ctx.fillStyle = this.resourceColors[this.inventory[i]];
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    if (this.inventoryFullTimer > 0) {
      this.ctx.fillStyle = `rgba(200, 50, 50, ${this.inventoryFullTimer})`;
      this.ctx.font = '16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText("Full!", this.VIRTUAL_WIDTH / 2 + 150, 35);
    }

    // Phase Indicator
    this.ctx.fillStyle = 'rgba(45,49,46,0.5)';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'left';
    const phaseNames = ['Morning', 'Afternoon', 'Evening'];
    this.ctx.fillText(phaseNames[this.phaseIndex] || '', 20, 30);

    // Tutorial Hint
    if (this.phaseIndex === 0 && this.phaseTime < 15) {
      const alpha = Math.max(0, 1 - (this.phaseTime - 12) / 3);
      this.ctx.fillStyle = `rgba(45, 49, 46, ${alpha})`;
      this.ctx.font = '16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText("Hint: Tap colored resources to collect them, then tap people or projects to help.", this.VIRTUAL_WIDTH / 2, 60);
      this.ctx.fillText("You can hold up to 5 resources at once.", this.VIRTUAL_WIDTH / 2, 85);
    }

    // Transition Overlay
    if (this.transitioning) {
      let alpha = 0;
      if (this.transitionProgress < 1) {
        alpha = this.transitionProgress; // Fade in
      } else if (this.transitionProgress > 1 && this.transitionProgress < 2) {
        alpha = 1; // Hold
      } else {
        alpha = 3 - this.transitionProgress; // Fade out
      }
      
      this.ctx.fillStyle = `rgba(244, 241, 234, ${alpha})`;
      this.ctx.fillRect(0, 0, this.VIRTUAL_WIDTH, this.VIRTUAL_HEIGHT);
      
      if (this.transitionProgress > 0.5 && this.transitionProgress < 2.5) {
        this.ctx.fillStyle = `rgba(45,49,46, ${Math.min(1, alpha * 2)})`;
        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(phaseNames[this.phaseIndex + (this.transitionProgress > 1 ? 0 : 1)] || '', this.VIRTUAL_WIDTH / 2, this.VIRTUAL_HEIGHT / 2);
      }
    }

    this.ctx.restore();
  }
}
