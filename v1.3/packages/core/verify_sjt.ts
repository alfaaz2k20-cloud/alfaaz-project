import * as fs from 'fs';
import * as path from 'path';
import { validateSjt } from './src/validation/sjt_validators.ts';
// (Note: To run via ts-node or similar, ensure imports match the runner)

function run() {
  try {
    const sjtPath = path.resolve('../../config/sjt_items.json');
    const rawData = fs.readFileSync(sjtPath, 'utf-8');
    const data = JSON.parse(rawData);

    const result = validateSjt(data);
    
    console.log('Valid:', result.valid);
    if (!result.valid) {
      console.log('Errors:', result.errors);
    }
    
    const params = [
      'empathy', 'conscientiousness', 'collaborative_spirit',
      'emotional_agility', 'curiosity', 'creative_initiative', 'motivation'
    ] as const;

    console.log('Parameter order:', params.join(', '));
    console.log('Max:', params.map(p => result.max[p]));
    console.log('Min:', params.map(p => result.min[p]));
    console.log('Coverage:', params.map(p => result.coverage[p]));
    console.log('Length cue count:', result.lengthCueCount, 'of 7');

  } catch (err) {
    console.error('Failed to run validation:', err);
  }
}

run();
