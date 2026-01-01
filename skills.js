// ===== ForgeMaster Skills Calculator =====
// Skills Calculator - ForgeMaster Helper

// Skill war points by rarity
const skillWarPoints = {
    common: 50,
    rare: 75,
    epic: 100,
    legendary: 125,
    ultimate: 150,
    mythic: 175
};

// Ghost Town dungeon rarity percentages by level (1-100)
// Real data from game - format: [common, rare, epic, legendary, ultimate, mythic]
const skillRatesData = {
    1: [100, 0, 0, 0, 0, 0], 2: [100, 0, 0, 0, 0, 0], 3: [100, 0, 0, 0, 0, 0],
    4: [89.95, 10, 0.05, 0, 0, 0], 5: [88.54, 11.40, 0.06, 0, 0, 0], 6: [86.93, 13, 0.07, 0, 0, 0],
    7: [85.1, 14.84, 0.08, 0, 0, 0], 8: [83, 16.89, 0.11, 0, 0, 0], 9: [80.61, 19.25, 0.14, 0, 0, 0],
    10: [77.88, 21.95, 0.17, 0, 0, 0], 11: [74.76, 25.03, 0.21, 0, 0, 0], 12: [71.21, 28.53, 0.26, 0, 0, 0],
    13: [67.14, 32.52, 0.34, 0, 0, 0], 14: [62.51, 37.07, 0.42, 0, 0, 0], 15: [57.21, 42.27, 0.52, 0, 0, 0],
    16: [51.17, 48.18, 0.65, 0, 0, 0], 17: [44.26, 54.92, 0.82, 0, 0, 0], 18: [36.36, 62.62, 1.02, 0, 0, 0],
    19: [27.34, 71.38, 1.28, 0, 0, 0], 20: [17.5, 80.9, 1.6, 0, 0, 0],
    21: [17.5, 80.49, 2, 0.01, 0, 0], 22: [17.5, 80.09, 2.4, 0.01, 0, 0], 23: [17.5, 79.61, 2.87, 0.02, 0, 0],
    24: [17.5, 79.03, 3.45, 0.02, 0, 0], 25: [17.5, 78.34, 4.13, 0.03, 0, 0], 26: [17.5, 77.51, 4.95, 0.04, 0, 0],
    27: [17.5, 76.51, 5.59, 0.04, 0, 0], 28: [17.5, 75.32, 7.13, 0.05, 0, 0], 29: [17.5, 73.89, 8.54, 0.07, 0, 0],
    30: [17.5, 72.17, 10.24, 0.09, 0, 0], 31: [17.5, 70.11, 12.28, 0.11, 0, 0], 32: [17.5, 67.64, 14.73, 0.13, 0, 0],
    33: [17.5, 64.68, 17.65, 0.17, 0, 0], 34: [17.5, 61.12, 21.17, 0.21, 0, 0], 35: [17.5, 56.86, 25.38, 0.26, 0, 0],
    36: [17.5, 51.74, 30.43, 0.33, 0, 0], 37: [17.5, 45.6, 36.49, 0.41, 0, 0], 38: [17.5, 38.24, 43.75, 0.51, 0, 0],
    39: [17.5, 29.41, 52.45, 0.64, 0, 0], 40: [17.5, 18.81, 62.89, 0.80, 0, 0],
    41: [17.5, 16.5, 65, 1.00, 0, 0], 42: [17.5, 16.5, 64.78, 1.22, 0, 0], 43: [17.5, 16.5, 64.51, 1.49, 0, 0],
    44: [17.5, 16.5, 64.17, 1.82, 0.01, 0], 45: [17.5, 16.5, 63.76, 2.22, 0.02, 0], 46: [17.5, 16.5, 63.27, 2.7, 0.03, 0],
    47: [17.5, 16.5, 62.66, 3.3, 0.04, 0], 48: [17.5, 16.5, 61.92, 4.03, 0.05, 0], 49: [17.5, 16.5, 61.02, 4.91, 0.07, 0],
    50: [17.5, 16.5, 59.93, 5.99, 0.08, 0], 51: [17.5, 16.5, 58.59, 7.3, 0.11, 0], 52: [17.5, 16.5, 56.95, 8.92, 0.13, 0],
    53: [17.5, 16.5, 54.96, 10.87, 0.17, 0], 54: [17.5, 16.5, 52.53, 13.26, 0.21, 0], 55: [17.5, 16.5, 49.56, 16.18, 0.26, 0],
    56: [17.5, 16.5, 45.93, 19.74, 0.33, 0], 57: [17.5, 16.5, 41.5, 24.09, 0.41, 0], 58: [17.5, 16.5, 36.1, 29.39, 0.51, 0],
    59: [17.5, 16.5, 29.51, 35.85, 0.64, 0], 60: [17.5, 16.5, 21.46, 43.74, 0.80, 0],
    61: [17.5, 16.5, 16.5, 48.5, 1, 0], 62: [17.5, 16.5, 16.5, 48.31, 1.19, 0], 63: [17.5, 16.5, 16.5, 48.08, 1.42, 0],
    64: [17.5, 16.5, 16.5, 47.8, 1.69, 0.01], 65: [17.5, 16.5, 16.5, 47.47, 2.01, 0.02], 66: [17.5, 16.5, 16.5, 47.08, 2.39, 0.03],
    67: [17.5, 16.5, 16.5, 46.62, 2.84, 0.04], 68: [17.5, 16.5, 16.5, 46.07, 3.38, 0.05], 69: [17.5, 16.5, 16.5, 45.41, 4.02, 0.07],
    70: [17.5, 16.5, 16.5, 44.63, 4.79, 0.08], 71: [17.5, 16.5, 16.5, 43.7, 5.69, 0.11], 72: [17.5, 16.5, 16.5, 42.59, 6.78, 0.13],
    73: [17.5, 16.5, 16.5, 41.27, 8.06, 0.17], 74: [17.5, 16.5, 16.5, 39.69, 9.6, 0.21], 75: [17.5, 16.5, 16.5, 37.82, 11.42, 0.26],
    76: [17.5, 16.5, 16.5, 35.58, 13.59, 0.33], 77: [17.5, 16.5, 16.5, 32.92, 16.17, 0.41], 78: [17.5, 16.5, 16.5, 29.74, 19.25, 0.51],
    79: [17.5, 16.5, 16.5, 25.96, 22.9, 0.64], 80: [17.5, 16.5, 16.5, 21.46, 27.25, 0.8],
    81: [17.5, 16.5, 16.5, 16.5, 32, 1.00], 82: [17.5, 16.5, 16.5, 16.5, 31.84, 1.16], 83: [17.5, 16.5, 16.5, 16.5, 31.65, 1.35],
    84: [17.5, 16.5, 16.5, 16.5, 31.44, 1.56], 85: [17.5, 16.5, 16.5, 16.5, 31.19, 1.81], 86: [17.5, 16.5, 16.5, 16.5, 30.9, 2.1],
    87: [17.5, 16.5, 16.5, 16.5, 30.56, 2.44], 88: [17.5, 16.5, 16.5, 16.5, 30.17, 2.83], 89: [17.5, 16.5, 16.5, 16.5, 29.72, 3.28],
    90: [17.5, 16.5, 16.5, 16.5, 29.2, 3.8], 91: [17.5, 16.5, 16.5, 16.5, 28.59, 4.41], 92: [17.5, 16.5, 16.5, 16.5, 27.88, 5.12],
    93: [17.5, 16.5, 16.5, 16.5, 27.06, 5.94], 94: [17.5, 16.5, 16.5, 16.5, 26.11, 6.89], 95: [17.5, 16.5, 16.5, 16.5, 25.01, 7.99],
    96: [17.5, 16.5, 16.5, 16.5, 23.73, 9.27], 97: [17.5, 16.5, 16.5, 16.5, 22.25, 10.75], 98: [17.5, 16.5, 16.5, 16.5, 20.53, 12.47],
    99: [17.5, 16.5, 16.5, 16.5, 18.54, 14.46], 100: [17.5, 16.5, 16.5, 16.5, 16.5, 16.5]
};

const generateSkillRatesForLevel = (level) => {
    level = Math.max(1, Math.min(100, level));
    const rates = skillRatesData[level];
    return {
        common: rates[0] / 100,
        rare: rates[1] / 100,
        epic: rates[2] / 100,
        legendary: rates[3] / 100,
        ultimate: rates[4] / 100,
        mythic: rates[5] / 100
    };
};

// Tier display names
const tierNames = {
    common: 'Common',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
    ultimate: 'Ultimate',
    mythic: 'Mythic'
};

// DOM Elements
const dungeonLevelSelect = document.getElementById('dungeonLevel');
const freeSummonPercentInput = document.getElementById('freeSummonPercent');
const summonCountInput = document.getElementById('summonCount');
const costPerSummonInput = document.getElementById('costPerSummon');
const targetPointsInput = document.getElementById('targetPoints');
const summonInputGroup = document.getElementById('summonInputGroup');
const costInputGroup = document.getElementById('costInputGroup');
const targetInputGroup = document.getElementById('targetInputGroup');

const calcModeBtn = document.getElementById('calcModeBtn');
const targetModeBtn = document.getElementById('targetModeBtn');
const calcResults = document.getElementById('calcResults');
const targetResults = document.getElementById('targetResults');
const expectedPointsEl = document.getElementById('expectedPoints');
const pointsPerSummonEl = document.getElementById('pointsPerSummon');
const expectedSummonsEl = document.getElementById('expectedSummons');
const summonsNeededEl = document.getElementById('summonsNeeded');
const gemsForTargetEl = document.getElementById('gemsForTarget');
const pointsPerSummonTargetEl = document.getElementById('pointsPerSummonTarget');
const probabilityGrid = document.getElementById('probabilityGrid');

let currentMode = 'calculate';
const GEMS_PER_SUMMON = 200;

function init() {
    populateDungeonLevels();
    loadSavedLevel();
    setupEventListeners();
    calculate();
    registerServiceWorker();
}

function populateDungeonLevels() {
    // Generate levels in format: Level 1-1 to Level 1-10, Level 2-1 to Level 2-10, ..., Level 10-1 to Level 10-10
    for (let world = 1; world <= 10; world++) {
        for (let level = 1; level <= 10; level++) {
            const dungeonLevel = (world - 1) * 10 + level; // Calculate actual level 1-100
            const option = document.createElement('option');
            option.value = dungeonLevel;
            option.textContent = `Level ${world}-${level}`;
            dungeonLevelSelect.appendChild(option);
        }
    }
}

function loadSavedLevel() {
    const savedLevel = localStorage.getItem('dungeonLevel');
    if (savedLevel && savedLevel >= 1 && savedLevel <= 100) {
        dungeonLevelSelect.value = savedLevel;
    } else {
        dungeonLevelSelect.value = 1;
    }
}

function saveLevelToStorage(level) {
    localStorage.setItem('dungeonLevel', level);
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .catch(err => console.log('SW registration failed:', err));
    }
}

function setupEventListeners() {
    calcModeBtn.addEventListener('click', () => switchMode('calculate'));
    targetModeBtn.addEventListener('click', () => switchMode('target'));


    dungeonLevelSelect.addEventListener('change', () => {
        saveLevelToStorage(dungeonLevelSelect.value);
        calculate();
    });
    freeSummonPercentInput.addEventListener('input', debounce(calculate, 300));
    summonCountInput.addEventListener('input', debounce(calculate, 300));
    costPerSummonInput.addEventListener('input', debounce(calculate, 300));
    targetPointsInput.addEventListener('input', debounce(calculate, 300));

    summonCountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });
    targetPointsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });
}

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

function switchMode(mode) {
    currentMode = mode;
    calcModeBtn.classList.toggle('active', mode === 'calculate');
    targetModeBtn.classList.toggle('active', mode === 'target');

    summonInputGroup.classList.toggle('hidden', mode !== 'calculate');
    targetInputGroup.classList.toggle('hidden', mode !== 'target');

    calcResults.classList.toggle('hidden', mode !== 'calculate');
    targetResults.classList.toggle('hidden', mode !== 'target');


    calculate();
}

function getCostPerSummon() {
    return parseInt(costPerSummonInput.value) || GEMS_PER_SUMMON;
}

function getExpectedPointsPerSummon(level) {
    const rates = generateSkillRatesForLevel(level);
    let expectedPoints = 0;
    const tiers = ['common', 'rare', 'epic', 'legendary', 'ultimate', 'mythic'];

    for (const tier of tiers) {
        if (rates[tier]) {
            expectedPoints += rates[tier] * skillWarPoints[tier];
        }
    }

    return expectedPoints;
}

function calculate() {
    const level = parseInt(dungeonLevelSelect.value);
    const rates = generateSkillRatesForLevel(level);

    const costPerSummon = getCostPerSummon();
    const pointsPerSummon = getExpectedPointsPerSummon(level);
    const freeSummonPercent = parseFloat(freeSummonPercentInput.value) || 0;
    const freeMultiplier = 1 / (1 - (freeSummonPercent / 100));

    if (currentMode === 'calculate') {
        const ticketsCount = parseInt(summonCountInput.value) || 0;
        const effectiveTickets = ticketsCount * freeMultiplier;
        const actualSummons = Math.floor(effectiveTickets / costPerSummon);
        const expectedPoints = actualSummons * pointsPerSummon;

        expectedPointsEl.textContent = formatNumber(expectedPoints);
        pointsPerSummonEl.textContent = formatNumber(pointsPerSummon);
        expectedSummonsEl.textContent = formatNumber(actualSummons);
    } else {
        const targetPoints = parseInt(targetPointsInput.value) || 0;
        const summonsNeeded = Math.ceil(targetPoints / pointsPerSummon);
        const ticketsNeeded = summonsNeeded * costPerSummon;
        const actualTicketsNeeded = Math.ceil(ticketsNeeded / freeMultiplier);

        gemsForTargetEl.textContent = formatNumber(actualTicketsNeeded);
        summonsNeededEl.textContent = formatNumber(summonsNeeded);
        pointsPerSummonTargetEl.textContent = formatNumber(pointsPerSummon);
    }

    updateProbabilityBreakdown(rates);
}

function updateProbabilityBreakdown(rates) {
    probabilityGrid.innerHTML = '';

    const tiers = ['common', 'rare', 'epic', 'legendary', 'ultimate', 'mythic'];

    for (const tier of tiers) {
        if (rates[tier] && rates[tier] > 0.0001) {
            const item = document.createElement('div');
            item.className = 'prob-item';

            const tierSpan = document.createElement('span');
            tierSpan.className = `prob-tier tier ${tier}`;
            tierSpan.textContent = tierNames[tier];

            const valueSpan = document.createElement('span');
            valueSpan.className = 'prob-value';
            valueSpan.textContent = `${(rates[tier] * 100).toFixed(2)}%`;

            const warPtsSpan = document.createElement('span');
            warPtsSpan.className = 'prob-war-pts';
            warPtsSpan.textContent = `${skillWarPoints[tier]} pts`;

            item.appendChild(tierSpan);
            item.appendChild(valueSpan);
            item.appendChild(warPtsSpan);
            probabilityGrid.appendChild(item);
        }
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
}

document.addEventListener('DOMContentLoaded', init);
