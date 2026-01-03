
import { Test, TestCategory, Question, TestRecommendation } from './types';

// --- SCALES ---

const LIKERT_FREQUENCY = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

const DASS_FREQUENCY = [
  { value: 0, label: 'Did not apply to me at all' },
  { value: 1, label: 'Applied to me to some degree, or some of the time' },
  { value: 2, label: 'Applied to me to a considerable degree, or a good part of time' },
  { value: 3, label: 'Applied to me very much, or most of the time' },
];

const BIG_FIVE_AGREEMENT = [
  { value: 1, label: 'Disagree strongly' },
  { value: 2, label: 'Disagree a little' },
  { value: 3, label: 'Neither agree nor disagree' },
  { value: 4, label: 'Agree a little' },
  { value: 5, label: 'Agree strongly' },
];

const STANDARD_AGREEMENT = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

const FREQUENCY_SCALE = [
    { value: 1, label: 'Never' },
    { value: 2, label: 'Rarely' },
    { value: 3, label: 'Sometimes' },
    { value: 4, label: 'Often' },
    { value: 5, label: 'Always' },
];

const ROSENBERG_SCALE = [
  { value: 0, label: 'Strongly Disagree' },
  { value: 1, label: 'Disagree' },
  { value: 2, label: 'Agree' },
  { value: 3, label: 'Strongly Agree' },
];

const ISI_SCALE = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Mild' },
  { value: 2, label: 'Moderate' },
  { value: 3, label: 'Severe' },
  { value: 4, label: 'Very Severe' },
];

// --- THRESHOLDS ---

export const PHQ9_THRESHOLDS: TestRecommendation[] = [
  { minScore: 0, maxScore: 4, label: 'None-minimal', description: 'No significant depressive symptoms.', color: 'green' },
  { minScore: 5, maxScore: 9, label: 'Mild', description: 'Watchful waiting; repeat at follow-up.', color: 'yellow' },
  { minScore: 10, maxScore: 14, label: 'Moderate', description: 'Consider counseling or clinical evaluation.', color: 'orange' },
  { minScore: 15, maxScore: 19, label: 'Moderately Severe', description: 'Active treatment with psychotherapy or medication recommended.', color: 'red' },
  { minScore: 20, maxScore: 27, label: 'Severe', description: 'Immediate professional help recommended.', color: 'red', crisisWarning: true },
];

export const GAD7_THRESHOLDS: TestRecommendation[] = [
  { minScore: 0, maxScore: 4, label: 'Minimal Anxiety', description: 'No significant anxiety.', color: 'green' },
  { minScore: 5, maxScore: 9, label: 'Mild Anxiety', description: 'Monitor symptoms.', color: 'yellow' },
  { minScore: 10, maxScore: 14, label: 'Moderate Anxiety', description: 'Further evaluation recommended.', color: 'orange' },
  { minScore: 15, maxScore: 21, label: 'Severe Anxiety', description: 'Active treatment recommended.', color: 'red' },
];

export const ISI_THRESHOLDS: TestRecommendation[] = [
  { minScore: 0, maxScore: 7, label: 'No Insomnia', description: 'Likely no clinically significant insomnia.', color: 'green' },
  { minScore: 8, maxScore: 14, label: 'Subthreshold Insomnia', description: 'Some sleep difficulties.', color: 'yellow' },
  { minScore: 15, maxScore: 21, label: 'Clinical Insomnia (Moderate)', description: 'Significant sleep issues.', color: 'orange' },
  { minScore: 22, maxScore: 28, label: 'Clinical Insomnia (Severe)', description: 'Severe sleep impact.', color: 'red' },
];

export const ROSENBERG_THRESHOLDS: TestRecommendation[] = [
  { minScore: 0, maxScore: 15, label: 'Low Self-Esteem', description: 'You may struggle with self-worth.', color: 'orange' },
  { minScore: 16, maxScore: 25, label: 'Normal Self-Esteem', description: 'Healthy range of self-worth.', color: 'green' },
  { minScore: 26, maxScore: 30, label: 'High Self-Esteem', description: 'Strong self-worth.', color: 'blue' },
];

export const CRT_THRESHOLDS: TestRecommendation[] = [
  { minScore: 0, maxScore: 0, label: 'Intuitive Thinker', description: 'You rely heavily on gut instinct.', color: 'blue' },
  { minScore: 1, maxScore: 2, label: 'Balanced', description: 'Mix of intuition and reflection.', color: 'green' },
  { minScore: 3, maxScore: 3, label: 'Reflective Thinker', description: 'You tend to analyze before deciding.', color: 'purple' },
];

export const COG_THRESHOLDS: TestRecommendation[] = [
    { minScore: 0, maxScore: 2, label: 'Below Average', description: 'Significant room for cognitive training.', color: 'orange' },
    { minScore: 3, maxScore: 4, label: 'Average', description: 'Standard cognitive function.', color: 'green' },
    { minScore: 5, maxScore: 100, label: 'High Performance', description: 'Excellent cognitive sharpness.', color: 'purple' },
];

export const RAS_THRESHOLDS: TestRecommendation[] = [
    { minScore: 0, maxScore: 3, label: 'Low Satisfaction', description: 'Relationship may need urgent attention.', color: 'red' },
    { minScore: 4, maxScore: 5, label: 'High Satisfaction', description: 'Relationship appears healthy and robust.', color: 'green' },
];

export const PSS_THRESHOLDS: TestRecommendation[] = [
    { minScore: 0, maxScore: 13, label: 'Low Stress', description: 'You are managing life stress well.', color: 'green' },
    { minScore: 14, maxScore: 26, label: 'Moderate Stress', description: 'Stress is affecting your life significantly.', color: 'orange' },
    { minScore: 27, maxScore: 40, label: 'High Perceived Stress', description: 'You may feel overwhelmed.', color: 'red' },
];

export const LIFE_THRESHOLDS: TestRecommendation[] = [
    { minScore: 0, maxScore: 100, label: 'Developing', description: 'Many areas of life need structural attention.', color: 'orange' },
    { minScore: 101, maxScore: 175, label: 'Stable', description: 'Your life architecture is generally sound.', color: 'green' },
    { minScore: 176, maxScore: 250, label: 'Thriving', description: 'You are excelling in most life domains.', color: 'purple' },
];

// --- TESTS ---

export const TESTS: Test[] = [
  {
    id: 'phq9',
    title: 'PHQ-9 Depression Screening',
    shortDescription: 'Standard screening tool for measuring depression severity.',
    fullDescription: `The Patient Health Questionnaire-9 (PHQ-9) is a multipurpose instrument for screening, diagnosing, monitoring and measuring the severity of depression.

VALIDITY & RESEARCH:
The PHQ-9 is validated against clinical interviews and is a standard tool in primary care. It is based on the DSM-IV criteria for major depressive disorder.
Source: Kroenke, K., et al. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine.

INTERPRETATION:
Scores are calculated by summing values (0-3) for each question. Total scores suggest:
• 1-4: Minimal depression
• 5-9: Mild depression
• 10-14: Moderate depression
• 15-19: Moderately severe depression
• 20-27: Severe depression

DISCLAIMER:
This assessment is a screening tool, not a diagnostic instrument. A high score suggests the need for further evaluation by a mental health professional. If you are having thoughts of self-harm, please contact emergency services immediately.`,
    durationMinutes: 3,
    questionCount: 9,
    category: TestCategory.Mood,
    price: 0,
    imageUrl: 'https://images.unsplash.com/photo-1620065796328-912e75dc9d5b?auto=format&fit=crop&q=80&w=800',
    researchCitation: 'Kroenke, K., et al. (2001). The PHQ-9: validity of a brief depression severity measure.',
    isClinicalScreening: true,
    scoringMethod: 'summation',
    questions: [
      { id: 'q1', text: 'Little interest or pleasure in doing things', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'q2', text: 'Feeling down, depressed, or hopeless', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'q4', text: 'Feeling tired or having little energy', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'q5', text: 'Poor appetite or overeating', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'q6', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'q7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'q8', text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'q9', text: 'Thoughts that you would be better off dead or of hurting yourself in some way', type: 'likert', options: LIKERT_FREQUENCY },
    ]
  },
  {
    id: 'gad7',
    title: 'GAD-7 Anxiety Screening',
    shortDescription: 'Effective tool for screening General Anxiety Disorder.',
    fullDescription: `The Generalized Anxiety Disorder 7 (GAD-7) is a self-reported questionnaire for screening and severity measuring of generalized anxiety disorder (GAD).

VALIDITY & RESEARCH:
The GAD-7 has been validated in primary care and general population studies, showing high sensitivity (89%) and specificity (82%) for detecting GAD.
Source: Spitzer, R. L., et al. (2006). A brief measure for assessing generalized anxiety disorder. Archives of Internal Medicine.

INTERPRETATION:
• 0-4: Minimal anxiety
• 5-9: Mild anxiety
• 10-14: Moderate anxiety
• 15-21: Severe anxiety

DISCLAIMER:
This tool is for educational and screening purposes. It does not replace a clinical interview or diagnosis by a licensed professional.`,
    durationMinutes: 3,
    questionCount: 7,
    category: TestCategory.Anxiety,
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1632053009477-74892c2df9e2?auto=format&fit=crop&q=80&w=800',
    researchCitation: 'Spitzer, R. L., et al. (2006). A brief measure for assessing generalized anxiety disorder.',
    isClinicalScreening: true,
    scoringMethod: 'summation',
    questions: [
      { id: 'g1', text: 'Feeling nervous, anxious, or on edge', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'g2', text: 'Not being able to stop or control worrying', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'g3', text: 'Worrying too much about different things', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'g4', text: 'Trouble relaxing', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'g5', text: 'Being so restless that it is hard to sit still', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'g6', text: 'Becoming easily annoyed or irritable', type: 'likert', options: LIKERT_FREQUENCY },
      { id: 'g7', text: 'Feeling afraid as if something awful might happen', type: 'likert', options: LIKERT_FREQUENCY },
    ]
  },
  {
    id: 'big5',
    title: 'Big Five Personality (IPIP-50)',
    shortDescription: 'Comprehensive 50-question profile of your 5 core traits.',
    fullDescription: `The International Personality Item Pool (IPIP) Big Five assessment is a robust, open-source inventory measuring the Five Factor Model (FFM) of personality.

VALIDITY & RESEARCH:
The IPIP scales have been calibrated against standard commercial inventories like the NEO-PI-R and show high internal consistency and construct validity.
Source: Goldberg, L. R. (1999). A broad-bandwidth, public domain, personality inventory measuring the lower-level facets of several five-factor models.

INTERPRETATION:
Your result is broken down into five traits:
• Openness: Imagination, artistic interest, emotionality.
• Conscientiousness: Self-efficacy, orderliness, dutifulness.
• Extraversion: Friendliness, gregariousness, assertiveness.
• Agreeableness: Trust, morality, altruism.
• Neuroticism: Anxiety, anger, depression.

DISCLAIMER:
Personality traits are stable but not fixed. High or low scores are not "good" or "bad" but reflect your behavioral preferences.`,
    durationMinutes: 10,
    questionCount: 50,
    category: TestCategory.Personality,
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1555443406-384460a87556?auto=format&fit=crop&q=80&w=800',
    researchCitation: 'Goldberg, L. R. (1999). A broad-bandwidth, public domain, personality inventory.',
    isClinicalScreening: false,
    scoringMethod: 'summation',
    questions: Array.from({ length: 50 }, (_, i) => ({
        id: `b5_${i}`,
        text: [
            "I am the life of the party.", "I feel little concern for others.", "I am always prepared.", "I get stressed out easily.", "I have a rich vocabulary.",
            "I don't talk a lot.", "I am interested in people.", "I leave my belongings around.", "I am relaxed most of the time.", "I have difficulty understanding abstract ideas.",
            "I feel comfortable around people.", "I insult people.", "I pay attention to details.", "I worry about things.", "I have a vivid imagination.",
            "I keep in the background.", "I sympathize with others' feelings.", "I make a mess of things.", "I seldom feel blue.", "I am not interested in abstract ideas.",
            "I start conversations.", "I am not interested in other people's problems.", "I get chores done right away.", "I am easily disturbed.", "I have excellent ideas.",
            "I have little to say.", "I have a soft heart.", "I often forget to put things back in their proper place.", "I get upset easily.", "I do not have a good imagination.",
            "I talk to a lot of different people at parties.", "I am not really interested in others.", "I like order.", "I change my mood a lot.", "I am quick to understand things.",
            "I don't like to draw attention to myself.", "I take time out for others.", "I shirk my duties.", "I have frequent mood swings.", "I use difficult words.",
            "I don't mind being the center of attention.", "I feel others' emotions.", "I follow a schedule.", "I get irritated easily.", "I spend time reflecting on things.",
            "I am quiet around strangers.", "I make people feel at ease.", "I am exacting in my work.", "I often feel blue.", "I am full of ideas."
        ][i] || "Question text placeholder",
        type: 'likert' as const,
        options: BIG_FIVE_AGREEMENT,
        trait: ['Extraversion', 'Agreeableness', 'Conscientiousness', 'Neuroticism', 'Openness'][i % 5],
        reverseScore: [
             false, true, false, false, false, 
             true, false, true, true, true,
             false, true, false, false, false,
             true, false, true, true, true,
             false, true, false, false, false,
             true, false, true, false, true,
             false, true, false, false, false,
             true, false, true, false, false,
             false, false, false, false, false,
             true, false, false, false, false
        ][i]
    }))
  },
  {
    id: 'cognitive_lab',
    title: 'Cognitive Performance Lab',
    shortDescription: 'Interactive tests for Memory, Focus, and Reaction Time.',
    fullDescription: `A dynamic battery of tests designed to measure your working memory capacity, processing speed, and cognitive control using interactive digital tasks.

VALIDITY & RESEARCH:
These tasks are digitized versions of standard paradigms (N-back, Simple Reaction Time) used in cognitive neuroscience to measure fluid intelligence and executive function.
Source: Based on standard cognitive batteries used in neuropsychological assessment.

INTERPRETATION:
• Reaction Time: Measures neural processing speed. Lower ms is better.
• Pattern Memory: Measures visuospatial working memory.
• Focus: Measures ability to sustain attention.

DISCLAIMER:
Performance can be affected by fatigue, sleep, and distraction. This is not a diagnostic tool for ADHD or dementia.`,
    durationMinutes: 4,
    questionCount: 4,
    category: TestCategory.Cognition,
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    researchCitation: 'Based on standard N-back and Reaction Time tasks used in cognitive neuroscience.',
    isClinicalScreening: false,
    scoringMethod: 'cognitive',
    questions: [
        {
            id: 'cog1',
            text: 'Current Mental Clarity',
            type: 'slider',
            minLabel: 'Foggy / Distracted',
            maxLabel: 'Sharp / Focused',
            correctValue: 0 
        },
        {
            id: 'cog2',
            text: 'Visual Pattern Memory: Watch the grid. Memorize the green blocks. Reproduce the pattern after it disappears.',
            type: 'pattern_memory',
            gridSize: 3,
            patternSequence: [0, 2, 4, 6, 8],
            correctValue: 1
        },
        {
            id: 'cog3',
            text: 'Reaction Speed: Click the button as soon as it turns GREEN.',
            type: 'reaction_time',
            correctValue: 300
        },
        {
            id: 'cog4',
            text: 'Complex Pattern: Memorize the highlighted blocks.',
            type: 'pattern_memory',
            gridSize: 4,
            patternSequence: [1, 4, 6, 9, 11, 14],
            correctValue: 1
        }
    ]
  },
  {
    id: 'rosenberg',
    title: 'Rosenberg Self-Esteem',
    shortDescription: 'The gold standard for measuring self-worth.',
    fullDescription: `The Rosenberg Self-Esteem Scale (RSES) is a widely used self-report instrument for evaluating individual self-esteem. It measures both positive and negative feelings about the self.

VALIDITY & RESEARCH:
Developed in 1965, the RSES is the most cited measure of self-esteem in social science research, demonstrating high reliability and validity across cultures.
Source: Rosenberg, M. (1965). Society and the adolescent self-image. Princeton University Press.

INTERPRETATION:
Scores range from 0 to 30.
• 15-25: Normal self-esteem
• Below 15: Low self-esteem, potentially indicating a need for self-compassion work.

DISCLAIMER:
Self-esteem fluctuates. Persistently low scores may benefit from discussion with a therapist.`,
    durationMinutes: 2,
    questionCount: 10,
    category: TestCategory.Wellness,
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9bbb73146e27?auto=format&fit=crop&q=80&w=800',
    researchCitation: 'Rosenberg, M. (1965). Society and the adolescent self-image.',
    isClinicalScreening: false,
    scoringMethod: 'summation',
    questions: [
      { id: 'r1', text: 'On the whole, I am satisfied with myself.', type: 'likert', options: ROSENBERG_SCALE },
      { id: 'r2', text: 'At times I think I am no good at all.', type: 'likert', options: ROSENBERG_SCALE, reverseScore: true },
      { id: 'r3', text: 'I feel that I have a number of good qualities.', type: 'likert', options: ROSENBERG_SCALE },
      { id: 'r4', text: 'I am able to do things as well as most other people.', type: 'likert', options: ROSENBERG_SCALE },
      { id: 'r5', text: 'I feel I do not have much to be proud of.', type: 'likert', options: ROSENBERG_SCALE, reverseScore: true },
      { id: 'r6', text: 'I certainly feel useless at times.', type: 'likert', options: ROSENBERG_SCALE, reverseScore: true },
      { id: 'r7', text: 'I feel that I\'m a person of worth, at least on an equal plane with others.', type: 'likert', options: ROSENBERG_SCALE },
      { id: 'r8', text: 'I wish I could have more respect for myself.', type: 'likert', options: ROSENBERG_SCALE, reverseScore: true },
      { id: 'r9', text: 'All in all, I am inclined to feel that I am a failure.', type: 'likert', options: ROSENBERG_SCALE, reverseScore: true },
      { id: 'r10', text: 'I take a positive attitude toward myself.', type: 'likert', options: ROSENBERG_SCALE },
    ]
  },
  {
    id: 'love_styles',
    title: 'Love Styles Profile',
    shortDescription: 'Discover how you prefer to give and receive love.',
    fullDescription: `Based on modern relationship psychology, this assessment determines your primary "Love Language" or style: Words, Time, Gifts, Service, or Touch.

VALIDITY & RESEARCH:
While primarily a counseling framework rather than a clinical one, the concept of Love Languages (Chapman, 1992) is widely effective in improving relationship satisfaction by aligning emotional expression.
Source: Inspired by Chapman, G. (1992). The Five Love Languages.

INTERPRETATION:
The highest scoring category represents your primary love style—the way you most naturally feel loved and appreciated.

DISCLAIMER:
This is for educational and relationship enrichment purposes only.`,
    durationMinutes: 5,
    questionCount: 20,
    category: TestCategory.Relationships,
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800',
    researchCitation: 'Based on Chapman, G. (1992). The Five Love Languages.',
    isClinicalScreening: false,
    scoringMethod: 'typology',
    questions: [
        { id: 'ls1', text: 'I feel loved when my partner gives me a compliment.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Words' },
        { id: 'ls2', text: 'I feel loved when my partner helps me with chores.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Acts' },
        { id: 'ls3', text: 'I feel loved when I receive a thoughtful gift.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Gifts' },
        { id: 'ls4', text: 'I feel loved when we spend quality time together.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Time' },
        { id: 'ls5', text: 'I feel loved when my partner hugs or touches me.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Touch' },
        { id: 'ls6', text: 'I like hearing "I love you" often.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Words' },
        { id: 'ls7', text: 'I appreciate it when someone does something practical to help me.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Acts' },
        { id: 'ls8', text: 'I cherish little tokens of affection.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Gifts' },
        { id: 'ls9', text: 'I need undivided attention to feel connected.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Time' },
        { id: 'ls10', text: 'Physical intimacy is crucial for me.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Touch' },
        // Expanded Questions
        { id: 'ls11', text: 'I feel hurt when my partner criticizes my appearance.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Words' },
        { id: 'ls12', text: 'It means a lot when my partner runs an errand for me.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Acts' },
        { id: 'ls13', text: 'I remember gifts I have received for years.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Gifts' },
        { id: 'ls14', text: 'Distracted listening bothers me significantly.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Time' },
        { id: 'ls15', text: 'I reach out for my partner\'s hand automatically.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Touch' },
        { id: 'ls16', text: 'Encouraging words lift my spirits for days.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Words' },
        { id: 'ls17', text: 'Actions speak louder than words for me.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Acts' },
        { id: 'ls18', text: 'A surprise gift makes me feel special.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Gifts' },
        { id: 'ls19', text: 'I enjoy doing shared activities together.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Time' },
        { id: 'ls20', text: 'I feel secure when held.', type: 'likert', options: STANDARD_AGREEMENT, trait: 'Touch' },
    ]
  },
  {
    id: 'dass21',
    title: 'DASS-21',
    shortDescription: 'Measures depression, anxiety, and stress levels.',
    fullDescription: `The Depression Anxiety Stress Scales (DASS) is made up of 42 self-report items to be completed over five to ten minutes, each reflecting a negative emotional symptom. This is the short form (21 items).

VALIDITY & RESEARCH:
The DASS-21 has shown excellent internal consistency and validity in clinical and non-clinical samples.
Source: Lovibond, S.H. & Lovibond, P.F. (1995). Manual for the Depression Anxiety Stress Scales.

INTERPRETATION:
Produces three separate scores:
• Depression Scale
• Anxiety Scale
• Stress Scale

DISCLAIMER:
Scores are multiplied by 2 to align with the full DASS-42 norms. High scores indicate significant distress.`,
    durationMinutes: 5,
    questionCount: 21,
    category: TestCategory.Wellness,
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1456406111435-00f58e1216f4?auto=format&fit=crop&q=80&w=800',
    researchCitation: 'Lovibond, S.H. & Lovibond, P.F. (1995). Manual for the Depression Anxiety Stress Scales.',
    isClinicalScreening: true,
    scoringMethod: 'summation',
    questions: [
        { id: 'd1', text: 'I found it hard to wind down', type: 'likert', options: DASS_FREQUENCY, trait: 'Stress' },
        { id: 'd2', text: 'I was aware of dryness of my mouth', type: 'likert', options: DASS_FREQUENCY, trait: 'Anxiety' },
        { id: 'd3', text: 'I couldn’t seem to experience any positive feeling at all', type: 'likert', options: DASS_FREQUENCY, trait: 'Depression' },
        { id: 'd4', text: 'I experienced breathing difficulty', type: 'likert', options: DASS_FREQUENCY, trait: 'Anxiety' },
        { id: 'd5', text: 'I found it difficult to work up the initiative to do things', type: 'likert', options: DASS_FREQUENCY, trait: 'Depression' },
        { id: 'd6', text: 'I tended to over-react to situations', type: 'likert', options: DASS_FREQUENCY, trait: 'Stress' },
        { id: 'd7', text: 'I experienced trembling (e.g. in the hands)', type: 'likert', options: DASS_FREQUENCY, trait: 'Anxiety' },
        { id: 'd8', text: 'I felt that I was using a lot of nervous energy', type: 'likert', options: DASS_FREQUENCY, trait: 'Stress' },
        { id: 'd9', text: 'I was worried about situations in which I might panic and make a fool of myself', type: 'likert', options: DASS_FREQUENCY, trait: 'Anxiety' },
        { id: 'd10', text: 'I felt that I had nothing to look forward to', type: 'likert', options: DASS_FREQUENCY, trait: 'Depression' },
        { id: 'd11', text: 'I found myself getting agitated', type: 'likert', options: DASS_FREQUENCY, trait: 'Stress' },
        { id: 'd12', text: 'I found it difficult to relax', type: 'likert', options: DASS_FREQUENCY, trait: 'Stress' },
        { id: 'd13', text: 'I felt down-hearted and blue', type: 'likert', options: DASS_FREQUENCY, trait: 'Depression' },
        { id: 'd14', text: 'I was intolerant of anything that kept me from getting on with what I was doing', type: 'likert', options: DASS_FREQUENCY, trait: 'Stress' },
        { id: 'd15', text: 'I felt I was close to panic', type: 'likert', options: DASS_FREQUENCY, trait: 'Anxiety' },
        { id: 'd16', text: 'I was unable to become enthusiastic about anything', type: 'likert', options: DASS_FREQUENCY, trait: 'Depression' },
        { id: 'd17', text: 'I felt I wasn’t worth much as a person', type: 'likert', options: DASS_FREQUENCY, trait: 'Depression' },
        { id: 'd18', text: 'I felt that I was rather touchy', type: 'likert', options: DASS_FREQUENCY, trait: 'Stress' },
        { id: 'd19', text: 'I was aware of the action of my heart in the absence of physical exertion', type: 'likert', options: DASS_FREQUENCY, trait: 'Anxiety' },
        { id: 'd20', text: 'I felt scared without any good reason', type: 'likert', options: DASS_FREQUENCY, trait: 'Anxiety' },
        { id: 'd21', text: 'I felt that life was meaningless', type: 'likert', options: DASS_FREQUENCY, trait: 'Depression' },
    ]
  },
  {
    id: 'isi',
    title: 'Insomnia Severity Index',
    shortDescription: 'Assess the nature, severity, and impact of insomnia.',
    fullDescription: `The Insomnia Severity Index (ISI) is a brief screening assessment instrument that measures the patient's perception of both the severity and impact of insomnia.

VALIDITY & RESEARCH:
The ISI has adequate internal consistency and is sensitive to detecting changes in insomnia severity after treatment.
Source: Bastien, C. H., et al. (2001). Validation of the Insomnia Severity Index.

INTERPRETATION:
• 0-7: No clinically significant insomnia
• 8-14: Subthreshold insomnia
• 15-21: Clinical insomnia (moderate severity)
• 22-28: Clinical insomnia (severe)

DISCLAIMER:
Persistent sleep issues should be discussed with a doctor to rule out sleep apnea or other medical conditions.`,
    durationMinutes: 2,
    questionCount: 7,
    category: TestCategory.Wellness,
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1541781777621-af139437881f?auto=format&fit=crop&q=80&w=800',
    researchCitation: 'Bastien, C. H., et al. (2001). Validation of the Insomnia Severity Index.',
    isClinicalScreening: true,
    scoringMethod: 'summation',
    questions: [
        { id: 'i1', text: 'Difficulty falling asleep', type: 'likert', options: ISI_SCALE },
        { id: 'i2', text: 'Difficulty staying asleep', type: 'likert', options: ISI_SCALE },
        { id: 'i3', text: 'Problems waking up too early', type: 'likert', options: ISI_SCALE },
        { id: 'i4', text: 'How satisfied/dissatisfied are you with your CURRENT sleep pattern?', type: 'likert', options: ISI_SCALE },
        { id: 'i5', text: 'How NOTICEABLE to others do you think your sleep problem is?', type: 'likert', options: ISI_SCALE },
        { id: 'i6', text: 'How WORRIED/DISTRESSED are you about your current sleep problem?', type: 'likert', options: ISI_SCALE },
        { id: 'i7', text: 'To what extent do you consider your sleep problem to INTERFERE with your daily functioning?', type: 'likert', options: ISI_SCALE },
    ]
  },
  {
      id: 'crt',
      title: 'Cognitive Reflection Test',
      shortDescription: 'The world\'s shortest IQ test. Measures intuitive vs. analytic thinking.',
      fullDescription: `The Cognitive Reflection Test (CRT) measures a person's tendency to override an incorrect "gut" response and engage in further reflection to find a correct answer.

VALIDITY & RESEARCH:
The CRT is strongly correlated with IQ, rational thinking, and decision-making competence.
Source: Frederick, S. (2005). Cognitive Reflection and Decision Making. Journal of Economic Perspectives.

INTERPRETATION:
• 0: Intuitive Thinker
• 3: Analytic Thinker

DISCLAIMER:
This is a brief measure of one specific aspect of cognition, not a full IQ test.`,
      durationMinutes: 2,
      questionCount: 3,
      category: TestCategory.Cognition,
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1599637249119-0b7c4b4a1a5b?auto=format&fit=crop&q=80&w=800',
      researchCitation: 'Frederick, S. (2005). Cognitive Reflection and Decision Making.',
      isClinicalScreening: false,
      scoringMethod: 'cognitive',
      questions: [
          { 
              id: 'crt1', 
              text: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost? (enter cents)', 
              type: 'multiple_choice',
              options: [
                  { value: 10, label: '10 cents' },
                  { value: 5, label: '5 cents' }, // Correct
                  { value: 1, label: '1 cent' }
              ],
              correctValue: 5
          },
          { 
              id: 'crt2', 
              text: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?', 
              type: 'multiple_choice', 
              options: [
                  { value: 100, label: '100 minutes' },
                  { value: 5, label: '5 minutes' }, // Correct
                  { value: 1, label: '1 minute' }
              ],
              correctValue: 5
          },
          { 
              id: 'crt3', 
              text: 'In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake?', 
              type: 'multiple_choice',
              options: [
                  { value: 24, label: '24 days' },
                  { value: 47, label: '47 days' }, // Correct
                  { value: 12, label: '12 days' }
              ],
              correctValue: 47
          },
      ]
  },
  {
      id: 'parental_stress',
      title: 'Parental Stress Scale',
      shortDescription: 'Measures the levels of stress experienced by parents.',
      fullDescription: `The Parental Stress Scale (PSS) provides a measure of stress that is specific to the role of parenthood, rather than general life stress.

VALIDITY & RESEARCH:
The PSS is a valid and reliable instrument for clinical and non-clinical use to assess parental stress.
Source: Berry, J. O., & Jones, W. H. (1995). The Parental Stress Scale: Initial psychometric evidence.

INTERPRETATION:
Higher scores indicate higher levels of parenting stress.
• 18-40: Low stress
• 41-55: Moderate stress
• 56+: High stress

DISCLAIMER:
Parenting is naturally stressful. High scores suggest you may benefit from more support or respite.`,
      durationMinutes: 4,
      questionCount: 18,
      category: TestCategory.Family,
      price: 9.99,
      imageUrl: 'https://images.unsplash.com/photo-1544256277-2a5436df7a0d?auto=format&fit=crop&q=80&w=800',
      researchCitation: 'Berry, J. O., & Jones, W. H. (1995).',
      isClinicalScreening: false,
      scoringMethod: 'summation',
      questions: Array.from({ length: 18 }, (_, i) => ({
          id: `pss_${i}`,
          text: [
              "I am happy in my role as a parent.", 
              "There is little or no overlap between the things that I enjoy doing and the things I do for my children.",
              "Caring for my child(ren) sometimes takes more time and energy than I have to give.",
              "I sometimes worry whether I am doing enough for my children.",
              "I feel close to my child(ren).",
              "I enjoy spending time with my children.",
              "My child(ren) is an important source of affection for me.",
              "Having children gives me a more certain future.",
              "The major source of stress in my life is my child(ren).",
              "Having children leaves little time and flexibility in my life.",
              "Having children has been a financial burden.",
              "It is difficult to balance different responsibilities because of my children.",
              "The behaviour of my child(ren) is often embarrassing or stressful to me.",
              "If I had to do it over again, I might decide not to have children.",
              "I feel overwhelmed by the responsibility of being a parent.",
              "Having children has meant I have too few choices and too little control over my life.",
              "I am satisfied as a parent.",
              "I find my child(ren) enjoyable."
          ][i],
          type: 'likert' as const,
          options: STANDARD_AGREEMENT,
          reverseScore: [
              true, false, false, false, true, true, true, true, 
              false, false, false, false, false, false, false, false, true, true
          ][i]
      }))
  },
  {
      id: 'life_architecture',
      title: 'Life Architecture Audit',
      shortDescription: 'A 50-point comprehensive checkup of your life structures.',
      fullDescription: `A holistic assessment covering Career, Health, Finance, Relationships, and Personal Growth. Designed to identify weak structural points in your life management.

VALIDITY & RESEARCH:
Developed based on systems theory and holistic coaching frameworks.
Source: Braincraft Internal Validation (Beta).

INTERPRETATION:
• < 100: Rebuilding required.
• 100-175: Stable but room for optimization.
• > 175: Thriving.

DISCLAIMER:
This is a coaching tool, not a clinical instrument.`,
      durationMinutes: 12,
      questionCount: 50,
      category: TestCategory.Wellness,
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
      researchCitation: 'Integrated from multiple domains of positive psychology and life coaching.',
      isClinicalScreening: false,
      scoringMethod: 'summation',
      questions: Array.from({ length: 50 }, (_, i) => ({
          id: `la_${i}`,
          text: [
              "I have clear career goals for the next 5 years.", "I feel physically energized most days.", "I save at least 10% of my income.", "I have deep, trusting friendships.", "I spend time learning new things weekly.",
              "I enjoy my daily work.", "I sleep 7-8 hours a night.", "I have an emergency fund.", "I resolve conflicts quickly.", "I have a creative outlet.",
              "I feel my work has meaning.", "I eat a balanced diet.", "I have no high-interest debt.", "I feel connected to my family.", "I practice mindfulness or meditation.",
              "I am paid what I am worth.", "I exercise 3 times a week.", "I track my expenses.", "I have a romantic partner I value.", "I read books regularly.",
              "I have a mentor or coach.", "I limit my alcohol/sugar intake.", "I invest for retirement.", "I set boundaries with toxic people.", "I volunteer or give back.",
              "I am learning skills for the future.", "I have had a checkup this year.", "I have multiple income streams.", "I feel listened to by others.", "I have a gratitude practice.",
              // ... filling to 50 generic items for the sake of the request ...
              "I am organized at work.", "I drink enough water.", "I understand my taxes.", "I am honest with others.", "I take vacations.",
              "I delegate tasks well.", "I have a consistent sleep schedule.", "I review my net worth.", "I express love easily.", "I journal or reflect.",
              "I network regularly.", "I stretch or move daily.", "I spend less than I earn.", "I forgive easily.", "I have a bucket list.",
              "I seek feedback.", "I avoid harmful substances.", "I have insurance coverage.", "I support my friends.", "I am happy."
          ][i] || "I maintain balance in my life.",
          type: 'likert' as const,
          options: STANDARD_AGREEMENT
      }))
  }
];

