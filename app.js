// ===== ForgeMaster EXP Calculator =====

// Probability data for each forge level (percentages)
const forgeProbabilities = {
    1: { primitive: 100.00 },
    2: { primitive: 99.00, medieval: 1.00 },
    3: { primitive: 98.00, medieval: 2.00 },
    4: { primitive: 96.00, medieval: 4.00 },
    5: { primitive: 91.50, medieval: 8.00, earlyModern: 0.50 },
    6: { primitive: 82.00, medieval: 16.00, earlyModern: 2.00 },
    7: { primitive: 64.00, medieval: 32.00, earlyModern: 4.00 },
    8: { primitive: 27.80, medieval: 64.00, earlyModern: 8.00, modern: 0.20 },
    9: { primitive: 13.00, medieval: 70.00, earlyModern: 16.00, modern: 1.00 },
    10: { primitive: 6.00, medieval: 60.00, earlyModern: 32.00, modern: 2.00 },
    11: { medieval: 31.90, earlyModern: 64.00, modern: 4.00, space: 0.10 },
    12: { medieval: 27.50, earlyModern: 64.00, modern: 8.00, space: 0.50 },
    13: { medieval: 8.00, earlyModern: 75.00, modern: 16.00, space: 1.00 },
    14: { earlyModern: 66.00, modern: 32.00, space: 2.00, interstellar: 0.05 },
    15: { earlyModern: 31.70, modern: 64.00, space: 4.00, interstellar: 0.25 },
    16: { earlyModern: 21.50, modern: 70.00, space: 8.00, interstellar: 0.50 },
    17: { modern: 82.90, space: 16.00, interstellar: 1.00, multiverse: 0.05 },
    18: { modern: 65.70, space: 32.00, interstellar: 2.00, multiverse: 0.25 },
    19: { modern: 31.50, space: 64.00, interstellar: 4.00, multiverse: 0.50 },
    20: { space: 91.00, interstellar: 8.00, multiverse: 1.00, quantum: 0.05 },
    21: { space: 81.70, interstellar: 16.00, multiverse: 2.00, quantum: 0.25 },
    22: { space: 63.50, interstellar: 32.00, multiverse: 4.00, quantum: 0.50 },
    23: { space: 27.00, interstellar: 64.00, multiverse: 8.00, quantum: 1.00 },
    24: { interstellar: 82.00, multiverse: 16.00, quantum: 2.00, underworld: 0.01 },
    25: { interstellar: 64.00, multiverse: 32.00, quantum: 4.00, underworld: 0.05 },
    26: { interstellar: 43.80, multiverse: 50.00, quantum: 6.00, underworld: 0.25 },
    27: { interstellar: 31.50, multiverse: 60.00, quantum: 8.00, underworld: 0.50 },
    28: { interstellar: 21.00, multiverse: 65.00, quantum: 13.00, underworld: 1.00 },
    29: { interstellar: 7.00, multiverse: 68.00, quantum: 23.00, underworld: 2.00 },
    30: { multiverse: 60.00, quantum: 36.00, underworld: 4.00, divine: 0.01 },
    31: { multiverse: 50.90, quantum: 43.00, underworld: 6.00, divine: 0.05 },
    32: { multiverse: 41.70, quantum: 50.00, underworld: 8.00, divine: 0.25 },
    33: { multiverse: 28.50, quantum: 58.00, underworld: 13.00, divine: 0.50 },
    34: { multiverse: 12.00, quantum: 64.00, underworld: 23.00, divine: 1.00 },
    35: { quantum: 62.00, underworld: 36.00, divine: 2.00 }
};

// EXP values for each tier
const expValues = {
    primitive: 1,
    medieval: 1,
    earlyModern: 1,
    modern: 2,
    space: 2,
    interstellar: 2,
    multiverse: 3,
    quantum: 3,
    underworld: 3,
    divine: 3
};

// Tier display names
const tierNames = {
    primitive: 'Primitive',
    medieval: 'Medieval',
    earlyModern: 'Early-Modern',
    modern: 'Modern',
    space: 'Space',
    interstellar: 'Interstellar',
    multiverse: 'Multiverse',
    quantum: 'Quantum',
    underworld: 'Underworld',
    divine: 'Divine'
};

// Tier CSS classes
const tierClasses = {
    primitive: 'primitive',
    medieval: 'medieval',
    earlyModern: 'early-modern',
    modern: 'modern',
    space: 'space',
    interstellar: 'interstellar',
    multiverse: 'multiverse',
    quantum: 'quantum',
    underworld: 'underworld',
    divine: 'divine'
};

// DOM Elements
const forgeLevelSelect = document.getElementById('forgeLevel');
const hammerCountInput = document.getElementById('hammerCount');
const targetExpInput = document.getElementById('targetExp');
const hammerInputGroup = document.getElementById('hammerInputGroup');
const targetInputGroup = document.getElementById('targetInputGroup');
const calculateBtn = document.getElementById('calculateBtn');
const calcModeBtn = document.getElementById('calcModeBtn');
const targetModeBtn = document.getElementById('targetModeBtn');
const resultsCard = document.getElementById('resultsCard');
const calcResults = document.getElementById('calcResults');
const targetResults = document.getElementById('targetResults');
const expectedExpEl = document.getElementById('expectedExp');
const expPerHammerEl = document.getElementById('expPerHammer');
const recommendedHammersEl = document.getElementById('recommendedHammers');
const expectedWithRecommendedEl = document.getElementById('expectedWithRecommended');
const probabilityGrid = document.getElementById('probabilityGrid');

// Current mode
let currentMode = 'calculate';

// Initialize the application
function init() {
    populateForgeLevels();
    loadSavedLevel();
    setupEventListeners();
    calculate(); // Initial calculation
    registerServiceWorker();
}

// Register service worker for PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .catch(err => console.log('SW registration failed:', err));
    }
}

// Populate forge level dropdown
function populateForgeLevels() {
    for (let level = 1; level <= 35; level++) {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = `Level ${level}`;
        forgeLevelSelect.appendChild(option);
    }
}

// Load saved level from localStorage
function loadSavedLevel() {
    const savedLevel = localStorage.getItem('forgeMasterLevel');
    if (savedLevel && savedLevel >= 1 && savedLevel <= 35) {
        forgeLevelSelect.value = savedLevel;
    } else {
        forgeLevelSelect.value = 1;
    }
}

// Save level to localStorage
function saveLevelToStorage(level) {
    localStorage.setItem('forgeMasterLevel', level);
}

// Setup event listeners
function setupEventListeners() {
    // Mode toggle
    calcModeBtn.addEventListener('click', () => switchMode('calculate'));
    targetModeBtn.addEventListener('click', () => switchMode('target'));

    // Calculate button
    calculateBtn.addEventListener('click', calculate);

    // Input changes - auto calculate
    forgeLevelSelect.addEventListener('change', () => {
        saveLevelToStorage(forgeLevelSelect.value);
        calculate();
    });
    hammerCountInput.addEventListener('input', debounce(calculate, 300));
    targetExpInput.addEventListener('input', debounce(calculate, 300));

    // Enter key triggers calculation
    hammerCountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });
    targetExpInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });
}

// Debounce function for input handling
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Switch between calculate and target modes
function switchMode(mode) {
    currentMode = mode;

    // Update button states
    calcModeBtn.classList.toggle('active', mode === 'calculate');
    targetModeBtn.classList.toggle('active', mode === 'target');

    // Show/hide appropriate input groups
    hammerInputGroup.classList.toggle('hidden', mode !== 'calculate');
    targetInputGroup.classList.toggle('hidden', mode !== 'target');

    // Show/hide appropriate results
    calcResults.classList.toggle('hidden', mode !== 'calculate');
    targetResults.classList.toggle('hidden', mode !== 'target');

    // Update button text
    calculateBtn.querySelector('.btn-text').textContent =
        mode === 'calculate' ? 'Calculate' : 'Find Hammers';

    // Recalculate
    calculate();
}

// Calculate expected EXP per hammer for a given forge level
function calculateExpPerHammer(level) {
    const probs = forgeProbabilities[level];
    if (!probs) return 0;

    let expectedExp = 0;
    for (const [tier, probability] of Object.entries(probs)) {
        const exp = expValues[tier] || 0;
        expectedExp += (probability / 100) * exp;
    }

    return expectedExp;
}

// Main calculation function
function calculate() {
    const level = parseInt(forgeLevelSelect.value);
    const expPerHammer = calculateExpPerHammer(level);

    if (currentMode === 'calculate') {
        // Calculate mode: EXP from hammer count
        const hammerCount = parseInt(hammerCountInput.value) || 0;
        const totalExp = expPerHammer * hammerCount;

        expectedExpEl.textContent = formatNumber(totalExp);
        expPerHammerEl.textContent = expPerHammer.toFixed(4);
    } else {
        // Target mode: Hammers needed for target EXP
        const targetExp = parseInt(targetExpInput.value) || 0;
        const hammersNeeded = Math.ceil(targetExp / expPerHammer);
        const expectedWithHammers = expPerHammer * hammersNeeded;

        recommendedHammersEl.textContent = formatNumber(hammersNeeded);
        expectedWithRecommendedEl.textContent = formatNumber(expectedWithHammers);
    }

    // Update probability breakdown
    updateProbabilityBreakdown(level);
}

// Update the probability breakdown grid
function updateProbabilityBreakdown(level) {
    const probs = forgeProbabilities[level];
    probabilityGrid.innerHTML = '';

    if (!probs) return;

    // Sort tiers by probability (highest first)
    const sortedTiers = Object.entries(probs)
        .sort((a, b) => b[1] - a[1]);

    for (const [tier, probability] of sortedTiers) {
        const item = document.createElement('div');
        item.className = 'prob-item';

        const tierSpan = document.createElement('span');
        tierSpan.className = `prob-tier tier ${tierClasses[tier]}`;
        tierSpan.textContent = tierNames[tier];

        const valueSpan = document.createElement('span');
        valueSpan.className = 'prob-value';
        valueSpan.textContent = `${probability.toFixed(2)}%`;

        item.appendChild(tierSpan);
        item.appendChild(valueSpan);
        probabilityGrid.appendChild(item);
    }
}

// Format large numbers with commas
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
