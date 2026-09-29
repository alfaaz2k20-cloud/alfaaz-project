import re

with open('frontend/src/game/CollectiveGame.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 6. Particles and Ripples render
render_effects = '''
    // Effects
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
code = code.replace('// Inventory\n', render_effects + '\n    // Inventory\n')

with open('frontend/src/game/CollectiveGame.js', 'w', encoding='utf-8') as f:
    f.write(code)
print('Done!')
