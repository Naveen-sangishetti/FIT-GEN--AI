export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'bodyweight' | 'equipment';
  muscleGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  properForm: string[];
  commonMistakes: string[];
  variations: string[];
  recommendedSets: string;
  recommendedReps: string;
  equipment: string[];
  safetyTips: string[];
  caloriesBurnedPerMinute?: number;
}

export const exercises: Exercise[] = [
  // Strength Training - Upper Body
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'strength',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    difficulty: 'intermediate',
    description: 'A compound upper body exercise that primarily targets the chest muscles. The bench press is one of the most effective exercises for building upper body strength and mass.',
    properForm: [
      'Lie flat on bench with feet firmly on the floor',
      'Grip the bar slightly wider than shoulder-width',
      'Lower the bar to mid-chest with controlled movement',
      'Keep elbows at 45-degree angle to body',
      'Press the bar up explosively while maintaining stability',
      'Lock out arms at the top without hyperextending elbows'
    ],
    commonMistakes: [
      'Bouncing the bar off the chest',
      'Lifting hips off the bench',
      'Flaring elbows out too wide (90 degrees)',
      'Not keeping shoulder blades retracted',
      'Using too much weight and sacrificing form'
    ],
    variations: [
      'Incline Bench Press (upper chest focus)',
      'Decline Bench Press (lower chest focus)',
      'Dumbbell Bench Press',
      'Close-Grip Bench Press (triceps focus)',
      'Pause Bench Press'
    ],
    recommendedSets: '3-5 sets',
    recommendedReps: '6-12 reps',
    equipment: ['Barbell', 'Bench', 'Weight Plates'],
    safetyTips: [
      'Always use a spotter when lifting heavy weights',
      'Warm up with lighter weights first',
      'Ensure proper grip and bar placement before lifting',
      'Keep wrists straight and strong throughout movement'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    category: 'bodyweight',
    muscleGroups: ['Back', 'Biceps', 'Shoulders', 'Core'],
    difficulty: 'intermediate',
    description: 'A fundamental bodyweight exercise that builds upper body pulling strength and develops a strong, wide back.',
    properForm: [
      'Hang from bar with hands shoulder-width or slightly wider',
      'Use overhand grip (palms facing away)',
      'Engage core and keep body straight',
      'Pull yourself up until chin clears the bar',
      'Lower yourself with control to full extension',
      'Avoid swinging or kipping (strict form)'
    ],
    commonMistakes: [
      'Using momentum to swing up',
      'Not achieving full range of motion',
      'Shrugging shoulders at the top',
      'Letting body sway excessively',
      'Not fully extending arms at bottom'
    ],
    variations: [
      'Chin-Up (underhand grip)',
      'Wide-Grip Pull-Up',
      'Neutral-Grip Pull-Up',
      'Assisted Pull-Up (band or machine)',
      'Weighted Pull-Up'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '5-12 reps',
    equipment: ['Pull-Up Bar'],
    safetyTips: [
      'Build up strength with assisted variations first',
      'Avoid excessive swinging to prevent shoulder injury',
      'Warm up shoulders and back before attempting',
      'Use proper grip to prevent hand injuries'
    ],
    caloriesBurnedPerMinute: 10
  },

  // Lower Body Strength
  {
    id: 'squat',
    name: 'Squat',
    category: 'strength',
    muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
    difficulty: 'beginner',
    description: 'The king of all exercises. Squats are a fundamental compound movement that builds lower body strength, muscle mass, and overall athleticism.',
    properForm: [
      'Stand with feet shoulder-width apart',
      'Point toes slightly outward (10-15 degrees)',
      'Keep chest up and back straight',
      'Lower body as if sitting back into a chair',
      'Ensure knees track over toes (not collapsing inward)',
      'Lower until thighs are parallel to ground or below',
      'Drive through heels to return to starting position'
    ],
    commonMistakes: [
      'Letting knees collapse inward',
      'Lifting heels off the ground',
      'Rounding lower back',
      'Not squatting deep enough',
      'Leaning too far forward'
    ],
    variations: [
      'Bodyweight Squat',
      'Goblet Squat',
      'Front Squat',
      'Bulgarian Split Squat',
      'Jump Squat',
      'Sumo Squat'
    ],
    recommendedSets: '3-5 sets',
    recommendedReps: '8-15 reps',
    equipment: ['Barbell', 'Squat Rack', 'Weight Plates (optional)'],
    safetyTips: [
      'Always use safety bars when squatting heavy',
      'Keep core engaged throughout movement',
      'Start with bodyweight to master form',
      'Avoid bouncing at the bottom'
    ],
    caloriesBurnedPerMinute: 9
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'strength',
    muscleGroups: ['Back', 'Glutes', 'Hamstrings', 'Core', 'Forearms'],
    difficulty: 'advanced',
    description: 'A total body compound exercise that builds raw strength and muscle mass throughout the posterior chain.',
    properForm: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Grip the bar just outside of legs',
      'Keep back straight, chest up, shoulders back',
      'Hinge at hips and bend knees to grip bar',
      'Drive through heels while keeping bar close to body',
      'Stand up straight, squeezing glutes at top',
      'Lower bar with control by hinging at hips'
    ],
    commonMistakes: [
      'Rounding the lower back',
      'Starting with hips too high or too low',
      'Letting bar drift away from body',
      'Hyperextending back at the top',
      'Using arms to pull instead of legs and hips'
    ],
    variations: [
      'Romanian Deadlift',
      'Sumo Deadlift',
      'Trap Bar Deadlift',
      'Single-Leg Deadlift',
      'Deficit Deadlift'
    ],
    recommendedSets: '3-5 sets',
    recommendedReps: '3-8 reps',
    equipment: ['Barbell', 'Weight Plates'],
    safetyTips: [
      'Master form with light weights before going heavy',
      'Use lifting belt for heavy sets',
      'Keep core braced throughout entire movement',
      'Never round your back under load'
    ],
    caloriesBurnedPerMinute: 11
  },

  // Cardio Exercises
  {
    id: 'running',
    name: 'Running',
    category: 'cardio',
    muscleGroups: ['Legs', 'Core', 'Cardiovascular System'],
    difficulty: 'beginner',
    description: 'A fundamental cardiovascular exercise that improves endurance, burns calories, and strengthens the lower body.',
    properForm: [
      'Maintain upright posture with slight forward lean',
      'Keep head up, eyes looking ahead',
      'Swing arms naturally at 90-degree angle',
      'Land on mid-foot, not heel',
      'Keep stride length moderate and natural',
      'Breathe rhythmically (2-3 steps per breath)'
    ],
    commonMistakes: [
      'Overstriding (landing heel-first ahead of body)',
      'Hunching shoulders',
      'Looking down at feet',
      'Holding breath or irregular breathing',
      'Starting too fast without warm-up'
    ],
    variations: [
      'Interval Running (HIIT)',
      'Hill Sprints',
      'Tempo Runs',
      'Long Slow Distance',
      'Fartlek Training'
    ],
    recommendedSets: 'Continuous',
    recommendedReps: '20-60 minutes',
    equipment: ['Running Shoes', 'Optional: Treadmill'],
    safetyTips: [
      'Invest in proper running shoes',
      'Start with shorter distances and build up',
      'Run on softer surfaces when possible',
      'Stay hydrated before, during, and after'
    ],
    caloriesBurnedPerMinute: 12
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'cardio',
    muscleGroups: ['Calves', 'Shoulders', 'Core', 'Cardiovascular System'],
    difficulty: 'beginner',
    description: 'An efficient full-body cardio exercise that improves coordination, agility, and cardiovascular fitness.',
    properForm: [
      'Keep elbows close to sides',
      'Rotate rope with wrists, not arms',
      'Jump on balls of feet with minimal ground contact',
      'Keep jumps low (1-2 inches off ground)',
      'Maintain upright posture',
      'Land softly with slight knee bend'
    ],
    commonMistakes: [
      'Jumping too high',
      'Using arms to turn rope instead of wrists',
      'Landing on heels',
      'Slouching or leaning forward',
      'Holding breath'
    ],
    variations: [
      'Single-Leg Jump Rope',
      'Double Unders',
      'Criss-Cross',
      'High Knees Jump Rope',
      'Boxer Skip'
    ],
    recommendedSets: '3-5 rounds',
    recommendedReps: '1-3 minutes per round',
    equipment: ['Jump Rope'],
    safetyTips: [
      'Start on softer surfaces',
      'Choose appropriate rope length',
      'Wear supportive athletic shoes',
      'Build endurance gradually'
    ],
    caloriesBurnedPerMinute: 13
  },

  // Core Exercises
  {
    id: 'plank',
    name: 'Plank',
    category: 'bodyweight',
    muscleGroups: ['Core', 'Shoulders', 'Glutes'],
    difficulty: 'beginner',
    description: 'An isometric core exercise that builds stability and endurance throughout the entire core region.',
    properForm: [
      'Start in forearm position with elbows under shoulders',
      'Keep body in straight line from head to heels',
      'Engage core by pulling belly button to spine',
      'Squeeze glutes to prevent sagging hips',
      'Keep neck neutral, looking at floor',
      'Breathe steadily throughout hold'
    ],
    commonMistakes: [
      'Letting hips sag or pike up',
      'Holding breath',
      'Looking up or forward (straining neck)',
      'Shoulders too far forward or back',
      'Not engaging glutes'
    ],
    variations: [
      'Side Plank',
      'Plank with Leg Lift',
      'Plank to Push-Up',
      'RKC Plank',
      'Walking Plank'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '30-60 seconds',
    equipment: ['Exercise Mat (optional)'],
    safetyTips: [
      'Start with shorter holds and build up',
      'Stop if lower back starts to hurt',
      'Keep shoulders away from ears',
      'Maintain proper breathing'
    ],
    caloriesBurnedPerMinute: 4
  },

  // Flexibility
  {
    id: 'yoga-sun-salutation',
    name: 'Sun Salutation (Surya Namaskar)',
    category: 'flexibility',
    muscleGroups: ['Full Body', 'Core', 'Shoulders', 'Hamstrings'],
    difficulty: 'beginner',
    description: 'A flowing sequence of yoga poses that improves flexibility, strength, and mind-body connection.',
    properForm: [
      'Start in mountain pose (standing tall)',
      'Raise arms overhead on inhale',
      'Fold forward on exhale, touching toes',
      'Step back to plank position',
      'Lower to low push-up (chaturanga)',
      'Push into upward-facing dog',
      'Press back to downward-facing dog',
      'Step forward and fold',
      'Rise to standing with arms overhead',
      'Return to mountain pose'
    ],
    commonMistakes: [
      'Rushing through movements',
      'Not coordinating breath with movement',
      'Locking knees in forward fold',
      'Sagging in plank or push-up',
      'Not engaging core throughout'
    ],
    variations: [
      'Sun Salutation A (Ashtanga)',
      'Sun Salutation B (with warrior pose)',
      'Modified Sun Salutation (knee down)',
      'Half Sun Salutation'
    ],
    recommendedSets: '3-12 rounds',
    recommendedReps: '1 flow per round',
    equipment: ['Yoga Mat'],
    safetyTips: [
      'Move slowly and mindfully',
      'Never force flexibility',
      'Keep breathing steady and deep',
      'Modify as needed for your level'
    ],
    caloriesBurnedPerMinute: 5
  },

  // Additional Exercises
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'bodyweight',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    difficulty: 'beginner',
    description: 'A classic bodyweight exercise that builds upper body pressing strength and core stability.',
    properForm: [
      'Start in plank position, hands slightly wider than shoulders',
      'Keep body in straight line from head to heels',
      'Lower body by bending elbows to 90 degrees',
      'Keep elbows at 45-degree angle to body',
      'Push back up to starting position',
      'Maintain core engagement throughout'
    ],
    commonMistakes: [
      'Sagging hips or piking up',
      'Flaring elbows out to 90 degrees',
      'Not going deep enough',
      'Leading with head or hips',
      'Holding breath'
    ],
    variations: [
      'Knee Push-Up',
      'Diamond Push-Up',
      'Wide-Grip Push-Up',
      'Decline Push-Up',
      'Plyometric Push-Up'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-20 reps',
    equipment: ['None'],
    safetyTips: [
      'Start with modified versions if needed',
      'Keep wrists aligned with shoulders',
      'Stop if you feel shoulder pain',
      'Maintain proper form over quantity'
    ],
    caloriesBurnedPerMinute: 7
  },
  {
    id: 'burpee',
    name: 'Burpee',
    category: 'cardio',
    muscleGroups: ['Full Body', 'Core', 'Legs', 'Chest', 'Shoulders'],
    difficulty: 'intermediate',
    description: 'A high-intensity full-body exercise that combines strength and cardio for maximum calorie burn.',
    properForm: [
      'Start standing with feet shoulder-width apart',
      'Drop into squat position, hands on floor',
      'Kick feet back into plank position',
      'Perform one push-up',
      'Jump feet back to squat position',
      'Explosively jump up with arms overhead',
      'Land softly and immediately begin next rep'
    ],
    commonMistakes: [
      'Sagging hips in plank position',
      'Not performing full push-up',
      'Landing hard on jump',
      'Moving too slowly (losing cardio benefit)',
      'Poor plank alignment'
    ],
    variations: [
      'Half Burpee (no push-up)',
      'Burpee with Tuck Jump',
      'Burpee with Pull-Up',
      'One-Legged Burpee',
      'Burpee Box Jump'
    ],
    recommendedSets: '3-5 sets',
    recommendedReps: '10-20 reps',
    equipment: ['None'],
    safetyTips: [
      'Build up endurance gradually',
      'Maintain proper form even when fatigued',
      'Land softly to protect joints',
      'Take breaks if form deteriorates'
    ],
    caloriesBurnedPerMinute: 15
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    difficulty: 'beginner',
    description: 'A unilateral leg exercise that builds strength, balance, and corrects muscle imbalances.',
    properForm: [
      'Stand tall with feet hip-width apart',
      'Step forward with one leg',
      'Lower hips until both knees are at 90 degrees',
      'Front knee should be directly over ankle',
      'Back knee should hover just above floor',
      'Push through front heel to return to start',
      'Alternate legs'
    ],
    commonMistakes: [
      'Letting front knee extend past toes',
      'Leaning torso too far forward',
      'Taking too short of a step',
      'Not lowering back knee enough',
      'Poor balance and wobbling'
    ],
    variations: [
      'Reverse Lunge',
      'Walking Lunge',
      'Jumping Lunge',
      'Curtsy Lunge',
      'Lateral Lunge'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-15 reps per leg',
    equipment: ['None, or Dumbbells for added resistance'],
    safetyTips: [
      'Start with bodyweight before adding weight',
      'Keep core engaged for balance',
      'Focus on controlled movement',
      'Stop if you feel knee pain'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    category: 'bodyweight',
    muscleGroups: ['Core', 'Obliques', 'Hip Flexors'],
    difficulty: 'beginner',
    description: 'A dynamic core exercise that targets the rectus abdominis and obliques simultaneously.',
    properForm: [
      'Lie on back with hands behind head',
      'Lift shoulders off the ground',
      'Bring right elbow toward left knee while extending right leg',
      'Switch sides in a pedaling motion',
      'Keep lower back pressed to floor',
      'Maintain steady breathing throughout'
    ],
    commonMistakes: [
      'Pulling on neck with hands',
      'Moving too fast and losing control',
      'Not fully extending legs',
      'Arching lower back off floor',
      'Holding breath'
    ],
    variations: [
      'Slow Bicycle Crunches',
      'Reverse Bicycle Crunches',
      'Weighted Bicycle Crunches',
      'Extended Hold Bicycle Crunches'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '15-25 reps per side',
    equipment: ['Exercise Mat (optional)'],
    safetyTips: [
      'Keep neck relaxed and supported',
      'Focus on quality over speed',
      'Stop if you feel lower back strain',
      'Engage core, not just hip flexors'
    ],
    caloriesBurnedPerMinute: 6
  },
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    category: 'strength',
    muscleGroups: ['Shoulders', 'Triceps', 'Core'],
    difficulty: 'beginner',
    description: 'A fundamental shoulder exercise that builds overhead pressing strength and shoulder stability.',
    properForm: [
      'Stand with feet shoulder-width apart',
      'Hold dumbbells at shoulder height, palms forward',
      'Press weights overhead until arms are fully extended',
      'Keep core engaged and avoid arching back',
      'Lower weights with control back to shoulders'
    ],
    commonMistakes: [
      'Arching lower back excessively',
      'Using momentum to press',
      'Not fully extending arms overhead',
      'Letting elbows flare out too wide'
    ],
    variations: [
      'Seated Shoulder Press',
      'Arnold Press',
      'Single-Arm Press',
      'Push Press',
      'Military Press'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-12 reps',
    equipment: ['Dumbbells or Barbell'],
    safetyTips: [
      'Keep core tight to protect lower back',
      'Start with lighter weights to master form',
      'Avoid locking out elbows forcefully'
    ],
    caloriesBurnedPerMinute: 7
  },
  {
    id: 'bent-over-row',
    name: 'Bent-Over Row',
    category: 'strength',
    muscleGroups: ['Back', 'Biceps', 'Core'],
    difficulty: 'intermediate',
    description: 'A compound pulling exercise that builds thickness and strength in the mid-back region.',
    properForm: [
      'Hold barbell with overhand grip, hands shoulder-width',
      'Bend at hips with slight knee bend, back straight',
      'Pull bar to lower chest/upper abdomen',
      'Squeeze shoulder blades together at top',
      'Lower bar with control'
    ],
    commonMistakes: [
      'Rounding lower back',
      'Using too much momentum',
      'Standing too upright',
      'Not squeezing shoulder blades'
    ],
    variations: [
      'Dumbbell Row',
      'Single-Arm Row',
      'Pendlay Row',
      'T-Bar Row',
      'Seated Cable Row'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-12 reps',
    equipment: ['Barbell', 'Weight Plates'],
    safetyTips: [
      'Keep back flat throughout movement',
      'Use lifting straps if grip is limiting',
      'Engage core to protect spine'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'bodyweight',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    difficulty: 'intermediate',
    description: 'A powerful upper body exercise that targets chest and triceps depending on body angle.',
    properForm: [
      'Grip parallel bars with arms straight',
      'Lower body by bending elbows to 90 degrees',
      'Lean forward slightly for chest emphasis',
      'Press back up to starting position',
      'Keep core engaged throughout'
    ],
    commonMistakes: [
      'Going too deep and straining shoulders',
      'Flaring elbows out excessively',
      'Shrugging shoulders',
      'Using momentum to bounce up'
    ],
    variations: [
      'Assisted Dips',
      'Weighted Dips',
      'Bench Dips',
      'Ring Dips',
      'Single-Bar Dips'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-15 reps',
    equipment: ['Dip Bars or Parallel Bars'],
    safetyTips: [
      'Build up shoulder strength first',
      'Don\'t go below 90-degree elbow bend',
      'Use assistance if needed'
    ],
    caloriesBurnedPerMinute: 9
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'equipment',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    difficulty: 'beginner',
    description: 'A machine-based leg exercise that allows for heavy loading with reduced spinal stress.',
    properForm: [
      'Sit with back flat against pad',
      'Place feet shoulder-width on platform',
      'Lower weight by bending knees to 90 degrees',
      'Press through heels to extend legs',
      'Don\'t lock out knees at top'
    ],
    commonMistakes: [
      'Locking out knees forcefully',
      'Letting lower back round',
      'Placing feet too low on platform',
      'Using partial range of motion'
    ],
    variations: [
      'Single-Leg Press',
      'High Foot Placement (glute focus)',
      'Low Foot Placement (quad focus)',
      'Wide Stance Press'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-15 reps',
    equipment: ['Leg Press Machine'],
    safetyTips: [
      'Keep back pressed against pad',
      'Use full range of motion',
      'Don\'t lock knees at top'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'cardio',
    muscleGroups: ['Core', 'Shoulders', 'Legs', 'Cardiovascular System'],
    difficulty: 'beginner',
    description: 'A dynamic full-body cardio exercise that builds endurance and core strength.',
    properForm: [
      'Start in plank position',
      'Drive one knee toward chest',
      'Quickly switch legs in a running motion',
      'Keep hips level and core engaged',
      'Maintain steady rhythm'
    ],
    commonMistakes: [
      'Raising hips too high',
      'Moving too slowly',
      'Not bringing knees far enough forward',
      'Sagging in plank position'
    ],
    variations: [
      'Slow Mountain Climbers',
      'Cross-Body Mountain Climbers',
      'Spiderman Mountain Climbers',
      'Sliding Mountain Climbers'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '30-60 seconds',
    equipment: ['None'],
    safetyTips: [
      'Keep core tight throughout',
      'Start slow to master form',
      'Land softly on feet'
    ],
    caloriesBurnedPerMinute: 12
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'equipment',
    muscleGroups: ['Back', 'Biceps', 'Shoulders'],
    difficulty: 'beginner',
    description: 'A machine-based pulling exercise that builds lat width and pulling strength.',
    properForm: [
      'Sit with thighs secured under pad',
      'Grip bar wider than shoulder-width',
      'Pull bar down to upper chest',
      'Squeeze shoulder blades together',
      'Return with control to full extension'
    ],
    commonMistakes: [
      'Pulling bar behind neck',
      'Using momentum to swing',
      'Not achieving full range',
      'Leaning back too far'
    ],
    variations: [
      'Close-Grip Pulldown',
      'Neutral-Grip Pulldown',
      'Single-Arm Pulldown',
      'Underhand Pulldown'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-15 reps',
    equipment: ['Lat Pulldown Machine'],
    safetyTips: [
      'Keep chest up throughout',
      'Control the weight on the way up',
      'Don\'t pull behind neck'
    ],
    caloriesBurnedPerMinute: 6
  },
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    category: 'cardio',
    muscleGroups: ['Legs', 'Glutes', 'Core'],
    difficulty: 'intermediate',
    description: 'An explosive plyometric exercise that develops power and athleticism.',
    properForm: [
      'Stand facing box at comfortable distance',
      'Swing arms back and bend knees',
      'Explosively jump onto box',
      'Land softly with bent knees',
      'Step down carefully'
    ],
    commonMistakes: [
      'Landing with locked knees',
      'Jumping down instead of stepping',
      'Starting too far from box',
      'Using a box that\'s too high'
    ],
    variations: [
      'Step-Ups',
      'Single-Leg Box Jumps',
      'Depth Jumps',
      'Box Jump-Overs'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-12 reps',
    equipment: ['Plyometric Box'],
    safetyTips: [
      'Start with lower box height',
      'Land softly to protect joints',
      'Step down, don\'t jump down',
      'Ensure box is stable'
    ],
    caloriesBurnedPerMinute: 14
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips (Bench)',
    category: 'bodyweight',
    muscleGroups: ['Triceps', 'Shoulders', 'Chest'],
    difficulty: 'beginner',
    description: 'A bodyweight tricep exercise that can be done anywhere with a bench or chair.',
    properForm: [
      'Sit on edge of bench, hands gripping edge',
      'Slide hips off bench, legs extended',
      'Lower body by bending elbows to 90 degrees',
      'Press back up to starting position',
      'Keep elbows pointing back, not flared'
    ],
    commonMistakes: [
      'Flaring elbows out to sides',
      'Dropping shoulders',
      'Going too low and straining shoulders',
      'Using legs too much for assistance'
    ],
    variations: [
      'Bent-Knee Tricep Dips',
      'Weighted Tricep Dips',
      'Feet-Elevated Tricep Dips',
      'Single-Leg Tricep Dips'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-15 reps',
    equipment: ['Bench or Chair'],
    safetyTips: [
      'Keep shoulders down and back',
      'Don\'t go too deep',
      'Bend knees to make easier'
    ],
    caloriesBurnedPerMinute: 6
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'strength',
    muscleGroups: ['Biceps', 'Forearms'],
    difficulty: 'beginner',
    description: 'An isolation exercise that targets the biceps and develops forearm strength.',
    properForm: [
      'Stand with dumbbells at sides, palms facing in',
      'Keep elbows close to torso',
      'Curl weights up toward shoulders',
      'Squeeze biceps at top',
      'Lower with control'
    ],
    commonMistakes: [
      'Swinging weights with momentum',
      'Letting elbows drift forward',
      'Not controlling the descent',
      'Using too heavy weight'
    ],
    variations: [
      'Alternating Hammer Curls',
      'Cross-Body Hammer Curls',
      'Rope Hammer Curls',
      'Preacher Hammer Curls'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-15 reps',
    equipment: ['Dumbbells'],
    safetyTips: [
      'Keep elbows stationary',
      'Use controlled motion',
      'Don\'t swing or use momentum'
    ],
    caloriesBurnedPerMinute: 4
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'bodyweight',
    muscleGroups: ['Core', 'Obliques'],
    difficulty: 'beginner',
    description: 'A rotational core exercise that strengthens obliques and improves rotational power.',
    properForm: [
      'Sit on floor with knees bent, feet elevated',
      'Lean back slightly, keeping back straight',
      'Clasp hands or hold weight at chest',
      'Rotate torso side to side',
      'Touch hands to floor beside hips each side'
    ],
    commonMistakes: [
      'Rounding back',
      'Moving too fast without control',
      'Only moving arms, not torso',
      'Holding breath'
    ],
    variations: [
      'Weighted Russian Twists',
      'Feet-Down Russian Twists',
      'Extended-Leg Russian Twists',
      'Medicine Ball Russian Twists'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '20-30 total twists',
    equipment: ['Optional: Weight Plate or Medicine Ball'],
    safetyTips: [
      'Keep back straight',
      'Start without weight',
      'Move with control',
      'Don\'t strain neck'
    ],
    caloriesBurnedPerMinute: 5
  },
  {
    id: 'leg-curls',
    name: 'Leg Curls',
    category: 'equipment',
    muscleGroups: ['Hamstrings'],
    difficulty: 'beginner',
    description: 'An isolation exercise that specifically targets the hamstring muscles.',
    properForm: [
      'Lie face down on leg curl machine',
      'Position ankles under pad',
      'Curl legs up toward glutes',
      'Squeeze hamstrings at top',
      'Lower with control'
    ],
    commonMistakes: [
      'Lifting hips off bench',
      'Using momentum',
      'Not achieving full range',
      'Going too fast'
    ],
    variations: [
      'Seated Leg Curls',
      'Single-Leg Curls',
      'Standing Leg Curls',
      'Swiss Ball Leg Curls'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '12-15 reps',
    equipment: ['Leg Curl Machine'],
    safetyTips: [
      'Keep hips down on bench',
      'Use controlled motion',
      'Don\'t hyperextend knees'
    ],
    caloriesBurnedPerMinute: 5
  },
  {
    id: 'cable-flyes',
    name: 'Cable Flyes',
    category: 'equipment',
    muscleGroups: ['Chest', 'Shoulders'],
    difficulty: 'intermediate',
    description: 'An isolation exercise that stretches and contracts the chest muscles through a wide range of motion.',
    properForm: [
      'Stand between cable towers, handles at chest height',
      'Step forward into split stance',
      'Arms extended out to sides with slight bend',
      'Bring handles together in front of chest',
      'Return with control to starting position'
    ],
    commonMistakes: [
      'Bending arms too much',
      'Using too much weight',
      'Not maintaining slight forward lean',
      'Shrugging shoulders'
    ],
    variations: [
      'High-to-Low Cable Flyes',
      'Low-to-High Cable Flyes',
      'Single-Arm Cable Flyes',
      'Incline Cable Flyes'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '12-15 reps',
    equipment: ['Cable Machine'],
    safetyTips: [
      'Keep slight bend in elbows',
      'Control the weight throughout',
      'Don\'t overstretch at start'
    ],
    caloriesBurnedPerMinute: 6
  },
  {
    id: 'calf-raises',
    name: 'Calf Raises',
    category: 'strength',
    muscleGroups: ['Calves'],
    difficulty: 'beginner',
    description: 'An isolation exercise that builds calf muscle strength and size.',
    properForm: [
      'Stand with balls of feet on raised surface',
      'Lower heels below toes for stretch',
      'Rise up onto toes as high as possible',
      'Hold briefly at top',
      'Lower with control'
    ],
    commonMistakes: [
      'Bouncing at bottom',
      'Not achieving full range',
      'Using momentum',
      'Bending knees'
    ],
    variations: [
      'Single-Leg Calf Raises',
      'Seated Calf Raises',
      'Donkey Calf Raises',
      'Smith Machine Calf Raises'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '15-20 reps',
    equipment: ['Step or Calf Raise Machine'],
    safetyTips: [
      'Use full range of motion',
      'Move slowly and controlled',
      'Hold onto something for balance'
    ],
    caloriesBurnedPerMinute: 4
  },
  {
    id: 'face-pulls',
    name: 'Face Pulls',
    category: 'equipment',
    muscleGroups: ['Shoulders', 'Back', 'Rear Delts'],
    difficulty: 'beginner',
    description: 'A shoulder health exercise that strengthens rear deltoids and improves posture.',
    properForm: [
      'Attach rope to cable at face height',
      'Pull rope toward face, splitting handles',
      'Bring hands to sides of face',
      'Squeeze shoulder blades together',
      'Return with control'
    ],
    commonMistakes: [
      'Pulling too low or too high',
      'Not separating rope handles',
      'Using too much weight',
      'Shrugging shoulders up'
    ],
    variations: [
      'Band Face Pulls',
      'Single-Arm Face Pulls',
      'High Face Pulls',
      'Low Face Pulls'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '15-20 reps',
    equipment: ['Cable Machine', 'Rope Attachment'],
    safetyTips: [
      'Use lighter weight for high reps',
      'Focus on rear delts',
      'Keep shoulders down'
    ],
    caloriesBurnedPerMinute: 5
  },
  {
    id: 'kettlebell-swings',
    name: 'Kettlebell Swings',
    category: 'equipment',
    muscleGroups: ['Glutes', 'Hamstrings', 'Core', 'Shoulders'],
    difficulty: 'intermediate',
    description: 'A dynamic full-body exercise that builds explosive power and cardiovascular endurance.',
    properForm: [
      'Stand with feet shoulder-width, kettlebell on floor',
      'Hinge at hips to grip kettlebell with both hands',
      'Swing kettlebell between legs',
      'Explosively drive hips forward',
      'Swing kettlebell to chest/shoulder height',
      'Let momentum carry swing, don\'t lift with arms'
    ],
    commonMistakes: [
      'Squatting instead of hinging',
      'Using arms to lift instead of hips',
      'Swinging too high',
      'Rounding back'
    ],
    variations: [
      'Single-Arm Swings',
      'American Swings (overhead)',
      'Alternating Swings',
      'Double Kettlebell Swings'
    ],
    recommendedSets: '3-5 sets',
    recommendedReps: '15-25 reps',
    equipment: ['Kettlebell'],
    safetyTips: [
      'Master hip hinge first',
      'Keep back flat',
      'Start with lighter weight',
      'Drive with hips, not arms'
    ],
    caloriesBurnedPerMinute: 13
  },
  {
    id: 'wall-sits',
    name: 'Wall Sits',
    category: 'bodyweight',
    muscleGroups: ['Quadriceps', 'Glutes'],
    difficulty: 'beginner',
    description: 'An isometric leg exercise that builds muscular endurance in the lower body.',
    properForm: [
      'Lean back against wall',
      'Lower into squat position with 90-degree knees',
      'Keep back flat against wall',
      'Thighs parallel to ground',
      'Hold position for time'
    ],
    commonMistakes: [
      'Knees extending past toes',
      'Letting hips sag below parallel',
      'Coming off wall',
      'Not breathing steadily'
    ],
    variations: [
      'Single-Leg Wall Sit',
      'Wall Sit with Ball Squeeze',
      'Wall Sit with Shoulder Press',
      'Weighted Wall Sit'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '30-60 seconds',
    equipment: ['Wall'],
    safetyTips: [
      'Keep back pressed to wall',
      'Don\'t hold breath',
      'Stop if knees hurt'
    ],
    caloriesBurnedPerMinute: 5
  },
  {
    id: 'farmers-walk',
    name: 'Farmer\'s Walk',
    category: 'equipment',
    muscleGroups: ['Forearms', 'Core', 'Shoulders', 'Legs'],
    difficulty: 'intermediate',
    description: 'A loaded carry exercise that builds grip strength, core stability, and total body endurance.',
    properForm: [
      'Pick up heavy dumbbells or kettlebells',
      'Stand tall with weights at sides',
      'Keep shoulders back and core tight',
      'Walk forward with controlled steps',
      'Maintain upright posture throughout'
    ],
    commonMistakes: [
      'Leaning to one side',
      'Letting shoulders round forward',
      'Taking too long of steps',
      'Holding breath'
    ],
    variations: [
      'Uneven Farmer\'s Walk',
      'Overhead Carry',
      'Suitcase Carry',
      'Rack Position Carry'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '30-60 seconds or 50-100 feet',
    equipment: ['Dumbbells or Kettlebells'],
    safetyTips: [
      'Start with lighter weight',
      'Keep core braced',
      'Walk on clear path',
      'Put weights down safely if losing grip'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'hip-thrusts',
    name: 'Hip Thrusts',
    category: 'strength',
    muscleGroups: ['Glutes', 'Hamstrings', 'Core'],
    difficulty: 'beginner',
    description: 'The most effective exercise for building glute strength and size.',
    properForm: [
      'Sit on ground with upper back against bench',
      'Place barbell or weight across hips',
      'Plant feet flat, shoulder-width apart',
      'Drive through heels to lift hips',
      'Squeeze glutes at top until hips fully extended',
      'Lower with control'
    ],
    commonMistakes: [
      'Hyperextending lower back at top',
      'Not achieving full hip extension',
      'Pushing through toes instead of heels',
      'Arching back instead of using glutes'
    ],
    variations: [
      'Single-Leg Hip Thrust',
      'Banded Hip Thrust',
      'Feet-Elevated Hip Thrust',
      'Bodyweight Hip Thrust'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-15 reps',
    equipment: ['Bench', 'Barbell or Dumbbells'],
    safetyTips: [
      'Use pad on barbell for comfort',
      'Keep ribs down, don\'t arch back',
      'Start with bodyweight'
    ],
    caloriesBurnedPerMinute: 7
  },
  {
    id: 'battle-ropes',
    name: 'Battle Ropes',
    category: 'cardio',
    muscleGroups: ['Shoulders', 'Arms', 'Core', 'Cardiovascular System'],
    difficulty: 'intermediate',
    description: 'A high-intensity cardio exercise that builds upper body endurance and power.',
    properForm: [
      'Hold rope ends in each hand',
      'Stand with feet shoulder-width, slight squat',
      'Create waves by alternating arm movements',
      'Keep core engaged and back straight',
      'Maintain consistent rhythm and intensity'
    ],
    commonMistakes: [
      'Standing too upright',
      'Using only arms without core',
      'Creating small waves',
      'Irregular tempo'
    ],
    variations: [
      'Alternating Waves',
      'Double Waves',
      'Slams',
      'Circles',
      'Side-to-Side Waves'
    ],
    recommendedSets: '3-5 sets',
    recommendedReps: '20-45 seconds',
    equipment: ['Battle Ropes'],
    safetyTips: [
      'Start with shorter intervals',
      'Maintain slight squat position',
      'Keep core engaged',
      'Breathe steadily'
    ],
    caloriesBurnedPerMinute: 14
  },
  {
    id: 'superman',
    name: 'Superman',
    category: 'bodyweight',
    muscleGroups: ['Back', 'Glutes', 'Shoulders'],
    difficulty: 'beginner',
    description: 'A bodyweight exercise that strengthens the entire posterior chain and improves back health.',
    properForm: [
      'Lie face down with arms extended overhead',
      'Keep legs straight and together',
      'Simultaneously lift arms, chest, and legs off ground',
      'Hold briefly at top',
      'Lower with control'
    ],
    commonMistakes: [
      'Lifting too high and straining back',
      'Holding breath',
      'Bending knees',
      'Jerking movements'
    ],
    variations: [
      'Alternating Superman',
      'Superman with Lat Pull',
      'Extended Superman Hold',
      'Swimming Superman'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-15 reps',
    equipment: ['Exercise Mat'],
    safetyTips: [
      'Move slowly and controlled',
      'Don\'t overextend',
      'Stop if lower back hurts',
      'Keep neck neutral'
    ],
    caloriesBurnedPerMinute: 4
  },
  {
    id: 'turkish-getup',
    name: 'Turkish Get-Up',
    category: 'equipment',
    muscleGroups: ['Full Body', 'Core', 'Shoulders'],
    difficulty: 'advanced',
    description: 'A complex full-body movement that builds strength, stability, and coordination.',
    properForm: [
      'Lie on back holding kettlebell in right hand overhead',
      'Bend right knee, left arm and leg extended',
      'Roll onto left elbow',
      'Push up to left hand',
      'Lift hips, sweep left leg under',
      'Move to kneeling position',
      'Stand up while keeping weight overhead',
      'Reverse movement to return to start'
    ],
    commonMistakes: [
      'Taking eyes off weight',
      'Rushing through steps',
      'Not stabilizing at each position',
      'Using too heavy weight initially'
    ],
    variations: [
      'Half Turkish Get-Up',
      'Naked Turkish Get-Up (no weight)',
      'Bottoms-Up Turkish Get-Up'
    ],
    recommendedSets: '2-3 sets',
    recommendedReps: '3-5 reps per side',
    equipment: ['Kettlebell or Dumbbell'],
    safetyTips: [
      'Master movement without weight first',
      'Keep eyes on weight at all times',
      'Move slowly through each position',
      'Practice with light weight'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    category: 'bodyweight',
    muscleGroups: ['Core', 'Obliques', 'Shoulders'],
    difficulty: 'beginner',
    description: 'An isometric exercise that targets the obliques and builds lateral core stability.',
    properForm: [
      'Lie on side with forearm on ground, elbow under shoulder',
      'Stack feet or stagger for easier version',
      'Lift hips to create straight line from head to feet',
      'Keep core engaged and hips up',
      'Hold position without letting hips sag'
    ],
    commonMistakes: [
      'Letting hips drop',
      'Rolling forward or backward',
      'Shoulders not aligned over elbow',
      'Holding breath'
    ],
    variations: [
      'Side Plank with Hip Dips',
      'Side Plank with Leg Lift',
      'Side Plank with Reach-Through',
      'Weighted Side Plank'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '30-45 seconds per side',
    equipment: ['Exercise Mat'],
    safetyTips: [
      'Start with shorter holds',
      'Keep body in straight line',
      'Modify by dropping bottom knee if needed',
      'Breathe steadily'
    ],
    caloriesBurnedPerMinute: 5
  },
  {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    category: 'strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Core'],
    difficulty: 'beginner',
    description: 'A beginner-friendly squat variation that teaches proper squat form and builds leg strength.',
    properForm: [
      'Hold dumbbell or kettlebell at chest level',
      'Stand with feet shoulder-width, toes slightly out',
      'Keep chest up and core engaged',
      'Lower into squat, elbows between knees',
      'Drive through heels to stand'
    ],
    commonMistakes: [
      'Letting weight pull chest forward',
      'Not squatting deep enough',
      'Knees collapsing inward',
      'Heels lifting off ground'
    ],
    variations: [
      'Pause Goblet Squat',
      'Goblet Squat with Pulse',
      'Wide-Stance Goblet Squat',
      'Goblet Squat to Press'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-15 reps',
    equipment: ['Dumbbell or Kettlebell'],
    safetyTips: [
      'Keep weight close to chest',
      'Maintain upright torso',
      'Start with lighter weight',
      'Use elbows to push knees out'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'reverse-flyes',
    name: 'Reverse Flyes',
    category: 'strength',
    muscleGroups: ['Shoulders', 'Back', 'Rear Delts'],
    difficulty: 'beginner',
    description: 'An isolation exercise for rear deltoids and upper back that improves posture.',
    properForm: [
      'Bend forward at hips with slight knee bend',
      'Hold dumbbells hanging down',
      'Raise arms out to sides with slight bend',
      'Squeeze shoulder blades together',
      'Lower with control'
    ],
    commonMistakes: [
      'Using too much weight',
      'Swinging weights with momentum',
      'Not squeezing shoulder blades',
      'Standing too upright'
    ],
    variations: [
      'Seated Reverse Flyes',
      'Incline Reverse Flyes',
      'Cable Reverse Flyes',
      'Single-Arm Reverse Flyes'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '12-15 reps',
    equipment: ['Dumbbells'],
    safetyTips: [
      'Use light weights',
      'Keep back flat',
      'Control the movement',
      'Focus on rear delts'
    ],
    caloriesBurnedPerMinute: 5
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    category: 'bodyweight',
    muscleGroups: ['Glutes', 'Hamstrings', 'Core'],
    difficulty: 'beginner',
    description: 'A fundamental glute exercise that activates and strengthens the posterior chain.',
    properForm: [
      'Lie on back with knees bent, feet flat on floor',
      'Place arms at sides, palms down',
      'Drive through heels to lift hips',
      'Squeeze glutes at top until hips fully extended',
      'Hold briefly and lower with control'
    ],
    commonMistakes: [
      'Pushing through toes instead of heels',
      'Hyperextending lower back',
      'Not squeezing glutes at top',
      'Letting knees fall inward'
    ],
    variations: [
      'Single-Leg Glute Bridge',
      'Weighted Glute Bridge',
      'Banded Glute Bridge',
      'Marching Glute Bridge'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '15-20 reps',
    equipment: ['None'],
    safetyTips: [
      'Keep core engaged',
      'Don\'t arch back excessively',
      'Drive through heels',
      'Focus on glute contraction'
    ],
    caloriesBurnedPerMinute: 5
  },
  {
    id: 'step-ups',
    name: 'Step-Ups',
    category: 'bodyweight',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    difficulty: 'beginner',
    description: 'A unilateral leg exercise that improves balance, coordination, and leg strength.',
    properForm: [
      'Stand facing box or bench',
      'Place one foot entirely on box',
      'Drive through heel to step up',
      'Bring other leg to meet first leg',
      'Step down with control, alternating legs'
    ],
    commonMistakes: [
      'Pushing off bottom leg',
      'Using momentum to jump up',
      'Box too high',
      'Letting knee collapse inward'
    ],
    variations: [
      'Weighted Step-Ups',
      'Lateral Step-Ups',
      'High Step-Ups',
      'Step-Up with Knee Drive'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-12 reps per leg',
    equipment: ['Box or Bench'],
    safetyTips: [
      'Start with lower box height',
      'Drive through working leg',
      'Keep knee aligned over foot',
      'Use full foot placement on box'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'incline-press',
    name: 'Incline Bench Press',
    category: 'strength',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    difficulty: 'intermediate',
    description: 'An upper chest focused pressing movement that builds strength and size in the upper pectorals.',
    properForm: [
      'Set bench to 30-45 degree angle',
      'Lie back with feet flat on floor',
      'Grip bar slightly wider than shoulders',
      'Lower bar to upper chest',
      'Press bar up until arms extended'
    ],
    commonMistakes: [
      'Setting bench too steep (too vertical)',
      'Bouncing bar off chest',
      'Flaring elbows too wide',
      'Lifting hips off bench'
    ],
    variations: [
      'Dumbbell Incline Press',
      'Low Incline Press',
      'Close-Grip Incline Press',
      'Swiss Bar Incline Press'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-12 reps',
    equipment: ['Barbell or Dumbbells', 'Incline Bench'],
    safetyTips: [
      'Use spotter for heavy weights',
      'Keep optimal 30-45 degree angle',
      'Maintain control throughout',
      'Warm up properly'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'diamond-pushup',
    name: 'Diamond Push-Up',
    category: 'bodyweight',
    muscleGroups: ['Triceps', 'Chest', 'Shoulders'],
    difficulty: 'intermediate',
    description: 'An advanced push-up variation that places extra emphasis on triceps development.',
    properForm: [
      'Get in push-up position',
      'Place hands close together forming diamond shape',
      'Keep elbows close to body',
      'Lower chest toward hands',
      'Press back up to starting position'
    ],
    commonMistakes: [
      'Flaring elbows out',
      'Not going deep enough',
      'Sagging hips',
      'Hands too far forward'
    ],
    variations: [
      'Knee Diamond Push-Up',
      'Elevated Diamond Push-Up',
      'Deficit Diamond Push-Up',
      'Plyometric Diamond Push-Up'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-15 reps',
    equipment: ['None'],
    safetyTips: [
      'Progress from regular push-ups first',
      'Keep core tight',
      'Modify to knees if needed',
      'Stop if wrists hurt'
    ],
    caloriesBurnedPerMinute: 8
  },
  {
    id: 'rowing-machine',
    name: 'Rowing Machine',
    category: 'cardio',
    muscleGroups: ['Back', 'Legs', 'Arms', 'Core', 'Cardiovascular System'],
    difficulty: 'beginner',
    description: 'A full-body cardio exercise that combines upper and lower body movements for total conditioning.',
    properForm: [
      'Sit with feet strapped in, knees bent',
      'Grip handle with overhand grip',
      'Push with legs first, then lean back',
      'Pull handle to lower chest',
      'Reverse motion: extend arms, lean forward, bend knees'
    ],
    commonMistakes: [
      'Pulling with arms first instead of legs',
      'Rounding back',
      'Not using legs enough',
      'Rowing too fast without power'
    ],
    variations: [
      'Interval Rowing',
      'Steady-State Rowing',
      'Pyramid Rowing Workout',
      'Sprint Rowing'
    ],
    recommendedSets: 'Continuous',
    recommendedReps: '15-30 minutes',
    equipment: ['Rowing Machine'],
    safetyTips: [
      'Master form before going hard',
      'Legs, core, then arms on drive',
      'Keep back straight',
      'Use damper setting 3-5 for beginners'
    ],
    caloriesBurnedPerMinute: 11
  }
];

export const categories = [
  { value: 'all', label: 'All Exercises' },
  { value: 'strength', label: 'Strength Training' },
  { value: 'cardio', label: 'Cardiovascular' },
  { value: 'flexibility', label: 'Flexibility & Mobility' },
  { value: 'bodyweight', label: 'Bodyweight' },
  { value: 'equipment', label: 'Equipment-Based' }
] as const;

export const difficulties = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
] as const;

export const muscleGroupOptions = [
  'All Muscle Groups',
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Biceps',
  'Triceps',
  'Core',
  'Legs',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Calves',
  'Full Body',
  'Cardiovascular System'
] as const;
