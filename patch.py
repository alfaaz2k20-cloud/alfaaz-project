import re

with open('frontend/src/game/CollectiveGame.js', 'r', encoding='utf-8') as f:
    code = f.read()

resize_code = '''  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.VIRTUAL_WIDTH = 1000;
    this.VIRTUAL_HEIGHT = 1000 * (rect.height / rect.width);
    
    this.scale = this.canvas.width / this.VIRTUAL_WIDTH;
    this.offsetX = 0;
    this.offsetY = 0;
  }'''
code = re.sub(r'resize\(\) \{[\s\S]*?this\.offsetY = .*?;[\s\S]*?\}', resize_code, code)

adjust_y_code = '''
    this.persons.forEach(p => p.y = (p.y / 700) * this.VIRTUAL_HEIGHT);
    this.projects.forEach(p => p.y = (p.y / 700) * this.VIRTUAL_HEIGHT);
    this.fogs.forEach(f => f.y = (f.y / 700) * this.VIRTUAL_HEIGHT);
    if (this.mountain) this.mountain.y = (30 / 700) * this.VIRTUAL_HEIGHT;
    if (this.creativeZone) this.creativeZone.y = (480 / 700) * this.VIRTUAL_HEIGHT;
    if (this.helper && this.phaseIndex === 0) {
       this.helper.y = (this.helper.y / 700) * this.VIRTUAL_HEIGHT;
    }
'''
code = code.replace('this.disruptionTriggered = false;', 'this.disruptionTriggered = false;\n' + adjust_y_code)
code = code.replace('let ry = 50 + Math.random() * (700 - 100);', 'let ry = 50 + Math.random() * (this.VIRTUAL_HEIGHT - 100);')
code = code.replace('this.floatingTexts = [];', 'this.floatingTexts = [];\n    this.particles = [];\n    this.ripples = [];')

update_effects = '''
    this.particles.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; });
    this.particles = this.particles.filter(p => p.life > 0);
    this.ripples.forEach(r => { r.radius += 100 * dt; r.life -= dt; });
    this.ripples = this.ripples.filter(r => r.life > 0);
'''
code = code.replace('// Floating texts', update_effects + '\n    // Floating texts')

render_effects = '''
    this.particles.forEach(p => {
      this.ctx.fillStyle = p.color.replace('rgb', 'rgba').replace(')', \, \)\);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ripples.forEach(r => {
      this.ctx.strokeStyle = \gba(189, 111, 93, \)\;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.stroke();
    });
'''
code = code.replace('// Floating texts', render_effects + '\n    // Floating texts')

spawn_method = '''
  spawnParticles(x, y, color) {
    for(let i = 0; i < 15; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 200,
        vy: (Math.random() - 0.5) * 200,
        life: 1.0,
        color
      });
    }
  }
'''
code = code.replace("addFloatingText(text, x, y, color = 'rgb(45, 49, 46)') {", spawn_method + "\n  addFloatingText(text, x, y, color = 'rgb(45, 49, 46)') {")

code = code.replace('const x = (e.clientX - rect.left - this.offsetX) / this.scale;', 'const x = (e.clientX - rect.left - this.offsetX) / this.scale;\n    const y = (e.clientY - rect.top - this.offsetY) / this.scale;\n    this.ripples.push({ x, y, radius: 0, life: 0.5 });')

code = code.replace("this.addFloatingText('+1', res.x, res.y, this.resourceColors[res.resourceType])", "this.spawnParticles(res.x, res.y, this.resourceColors[res.resourceType]); this.addFloatingText('+1', res.x, res.y, this.resourceColors[res.resourceType])")
code = code.replace("this.addFloatingText('<3', p.x, p.y - 30, 'rgb(189, 111, 93)')", "this.spawnParticles(p.x, p.y, 'rgb(189, 111, 93)'); this.addFloatingText('♥', p.x, p.y - 30, 'rgb(189, 111, 93)')")
code = code.replace("this.addFloatingText('Completed!', proj.x + proj.width/2, proj.y - 10, 'rgb(93, 155, 155)')", "this.spawnParticles(proj.x + proj.width/2, proj.y, 'rgb(93, 155, 155)'); this.addFloatingText('Completed!', proj.x + proj.width/2, proj.y - 10, 'rgb(93, 155, 155)')")

with open('frontend/src/game/CollectiveGame.js', 'w', encoding='utf-8') as f:
    f.write(code)
print('Done!')
