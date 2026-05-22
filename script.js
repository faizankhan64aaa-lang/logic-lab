const bmiForm = document.getElementById('bmiForm');
const heightInput = document.getElementById('heightInput');
const weightInput = document.getElementById('weightInput');
const genderInput = document.getElementById('genderInput');
const activityInput = document.getElementById('activityInput');
const resultPanel = document.getElementById('resultPanel');
const bmiValueEl = document.getElementById('bmiValue');
const bmiCategoryEl = document.getElementById('bmiCategory');
const bmiAdviceEl = document.getElementById('bmiAdvice');
const foodSuggestionsEl = document.getElementById('foodSuggestions');

const categories = [
  {
    label: 'Underweight',
    range: [0, 18.5],
    color: '#7ccdff',
    advice: 'Try a balanced diet and strength-building routine.',
    tips: {
      male: [
        'Increase calorie intake with nutrient-dense foods like nuts, nut butters, and whole milk.',
        'Add strength training 3–4 times/week to build muscle mass.',
        'Have protein-rich snacks after workouts (eggs, yogurt, lean meats).'
      ],
      female: [
        'Focus on iron- and calorie-dense meals (eggs, legumes, dairy).',
        'Include resistance training and progressive overload.',
        'Snack on smoothies with oats, nut butter, and full-fat yogurt.'
      ],
      other: [
        'Prioritise nutrient-rich, calorie-dense meals and progressive resistance training.',
        'Eat frequent small meals and include balanced snacks.'
      ]
    },
    foods: {
      male: ['Whole milk, peanut butter, oats, chicken breast, sweet potatoes'],
      female: ['Full-fat yogurt, lentils, eggs, avocados, almonds'],
      other: ['Smoothies, nut mixes, quinoa, salmon, whole-grain breads']
    }
  },
  {
    label: 'Normal weight',
    range: [18.5, 24.9],
    color: '#7dff9d',
    advice: 'Great shape! Keep up with your healthy habits.',
    tips: {
      male: [
        'Maintain a balanced diet and varied training (cardio + strength).',
        'Monitor body composition rather than weight alone.'
      ],
      female: [
        'Keep a nutrient-rich diet and regular exercise routine.',
        'Track energy levels and menstrual health if relevant.'
      ],
      other: [
        'Focus on balanced eating, strength maintenance, and sleep hygiene.'
      ]
    },
    foods: {
      male: ['Lean protein, vegetables, whole grains, fruits'],
      female: ['Leafy greens, legumes, lean protein, dairy or alternatives'],
      other: ['Balanced meals across macro groups, whole foods']
    }
  },
  {
    label: 'Overweight',
    range: [25, 29.9],
    color: '#ffd15c',
    advice: 'Consider more cardio and a nutrition plan to stay balanced.',
    tips: {
      male: [
        'Aim for gradual weight loss with a modest calorie deficit.',
        'Increase cardio and keep resistance training to protect muscle.'
      ],
      female: [
        'Create sustainable calorie reduction and prioritise protein intake.',
        'Combine regular movement with strength training.'
      ],
      other: [
        'Adopt steady, manageable lifestyle changes and consult a professional.'
      ]
    },
    foods: {
      male: ['Vegetables, lean protein, legumes, whole grains'],
      female: ['Fiber-rich vegetables, lean protein, healthy fats'],
      other: ['Whole foods, lower processed carbs, balanced proteins']
    }
  },
  {
    label: 'Obese',
    range: [30, Infinity],
    color: '#ff7b92',
    advice: 'Talk to a healthcare professional for a safe plan.',
    tips: {
      male: [
        'Seek medical advice and set small, achievable goals.',
        'Prioritise consistency; start with daily walking and strength work.'
      ],
      female: [
        'Consult healthcare providers and consider a multidisciplinary plan.',
        'Address sleep, stress, and gradual dietary improvements.'
      ],
      other: [
        'Work with professionals to create a tailored, safe plan.'
      ]
    },
    foods: {
      male: ['High-fiber vegetables, lean proteins, legumes'],
      female: ['Vegetables, legumes, lean protein, controlled portions'],
      other: ['Focus on whole foods, reduce sugary drinks and processed foods']
    }
  }
];

function computeBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function findCategory(bmi) {
  return categories.find(category => bmi >= category.range[0] && bmi < category.range[1]) || categories[0];
}

bmiForm.addEventListener('submit', event => {
  event.preventDefault();

  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);
  const activityLevel = parseFloat(activityInput.value);
  const gender = (genderInput && genderInput.value) ? genderInput.value : 'other';

  if (!height || !weight || height <= 0 || weight <= 0) {
    bmiAdviceEl.textContent = 'Please enter valid height and weight values.';
    resultPanel.classList.remove('hidden');
    bmiValueEl.textContent = '—';
    bmiCategoryEl.textContent = 'Invalid input';
    foodSuggestionsEl.textContent = '';
    return;
  }

  const bmi = computeBMI(height, weight);
  const category = findCategory(bmi);
  const adjustedBMI = (bmi * activityLevel).toFixed(1);

  bmiValueEl.textContent = adjustedBMI;
  bmiCategoryEl.textContent = category.label;

  // Choose gender-specific tips and foods
  const tips = (category.tips && category.tips[gender]) ? category.tips[gender] : category.tips.other || [];
  const foods = (category.foods && category.foods[gender]) ? category.foods[gender] : category.foods.other || [];

  const tipsHtml = tips.map(t => `<li>${t}</li>`).join('');
  const foodsHtml = foods.length ? `<p style="margin:8px 0 6px 0; font-weight:700;">Suggested foods:</p><p style="margin:0;">${foods.join(', ')}</p>` : '';

  bmiAdviceEl.innerHTML = `
    <strong>${category.advice}</strong>
    <ul style="margin-top:8px; margin-bottom:0; padding-left:18px;">
      ${tipsHtml}
    </ul>
    <p style="opacity:0.9; margin-top:8px; font-size:0.92rem;">(Activity factor: ${activityLevel})</p>
  `;

  foodSuggestionsEl.innerHTML = foodsHtml;

  resultPanel.style.borderColor = category.color;
  resultPanel.classList.remove('hidden');
});
