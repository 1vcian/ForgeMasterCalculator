// ===== ForgeMaster Mount Calculator =====
// Data from official Forge Master Information spreadsheet (December 2025)

// Complete Mount Summon Rates data (Level 1-50)
const mountSummonRates = {
    1: { needed: 2, common: 1.0000 },
    2: { needed: 5, common: 0.995, rare: 0.005 },
    3: { needed: 8, common: 0.9931, rare: 0.0069 },
    4: { needed: 11, common: 0.9905, rare: 0.0095 },
    5: { needed: 14, common: 0.9869, rare: 0.0131 },
    6: { needed: 17, common: 0.9819, rare: 0.0181 },
    7: { needed: 20, common: 0.975, rare: 0.025 },
    8: { needed: 23, common: 0.9655, rare: 0.0345 },
    9: { needed: 26, common: 0.95, rare: 0.05 },
    10: { needed: 29, common: 0.929, rare: 0.07, epic: 0.001 },
    11: { needed: 32, common: 0.9002, rare: 0.098, epic: 0.0018 },
    12: { needed: 35, common: 0.8596, rare: 0.1372, epic: 0.0032 },
    13: { needed: 38, common: 0.8021, rare: 0.1921, epic: 0.0058 },
    14: { needed: 41, common: 0.7206, rare: 0.2689, epic: 0.0105 },
    15: { needed: 44, common: 0.6046, rare: 0.3765, epic: 0.0189 },
    16: { needed: 47, common: 0.4389, rare: 0.5271, epic: 0.034 },
    17: { needed: 50, common: 0.3511, rare: 0.5989, epic: 0.05 },
    18: { needed: 53, common: 0.2809, rare: 0.6481, epic: 0.07, legendary: 0.001 },
    19: { needed: 56, common: 0.2247, rare: 0.6755, epic: 0.098, legendary: 0.0018 },
    20: { needed: 59, common: 0.1798, rare: 0.6798, epic: 0.1372, legendary: 0.0032 },
    21: { needed: 62, common: 0.165, rare: 0.6371, epic: 0.1921, legendary: 0.0058 },
    22: { needed: 65, common: 0.165, rare: 0.5556, epic: 0.2689, legendary: 0.0105 },
    23: { needed: 68, common: 0.165, rare: 0.4396, epic: 0.3765, legendary: 0.0189 },
    24: { needed: 71, common: 0.165, rare: 0.2739, epic: 0.5271, legendary: 0.034 },
    25: { needed: 74, common: 0.165, rare: 0.165, epic: 0.62, legendary: 0.05 },
    26: { needed: 77, common: 0.165, rare: 0.165, epic: 0.599, legendary: 0.07, ultimate: 0.001 },
    27: { needed: 80, common: 0.165, rare: 0.165, epic: 0.5702, legendary: 0.098, ultimate: 0.0018 },
    28: { needed: 83, common: 0.165, rare: 0.165, epic: 0.5296, legendary: 0.1372, ultimate: 0.0032 },
    29: { needed: 86, common: 0.165, rare: 0.165, epic: 0.4721, legendary: 0.1921, ultimate: 0.0058 },
    30: { needed: 89, common: 0.165, rare: 0.165, epic: 0.3906, legendary: 0.2689, ultimate: 0.0105 },
    31: { needed: 92, common: 0.165, rare: 0.165, epic: 0.2746, legendary: 0.3765, ultimate: 0.0189 },
    32: { needed: 95, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.471, ultimate: 0.034 },
    33: { needed: 98, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.455, ultimate: 0.05 },
    34: { needed: 132, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.434, ultimate: 0.07, mythic: 0.001 },
    35: { needed: 166, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.4052, ultimate: 0.098, mythic: 0.0018 },
    36: { needed: 200, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.3646, ultimate: 0.1372, mythic: 0.0032 },
    37: { needed: 234, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.3071, ultimate: 0.1921, mythic: 0.0058 },
    38: { needed: 268, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.2256, ultimate: 0.2689, mythic: 0.0105 },
    39: { needed: 302, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.3211, mythic: 0.0189 },
    40: { needed: 336, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.306, mythic: 0.034 },
    41: { needed: 370, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.29, mythic: 0.05 },
    42: { needed: 404, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.283, mythic: 0.057 },
    43: { needed: 438, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.275, mythic: 0.065 },
    44: { needed: 472, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2659, mythic: 0.0741 },
    45: { needed: 506, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2556, mythic: 0.0844 },
    46: { needed: 540, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2437, mythic: 0.0963 },
    47: { needed: 574, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2303, mythic: 0.1097 },
    48: { needed: 608, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2149, mythic: 0.1251 },
    49: { needed: 642, common: 0.165, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.1974, mythic: 0.1426 },
    50: { needed: 'MAX', common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.165, mythic: 0.165 }
};

// Mount boost values (corrected from Excel - December 2025)
const mountBoosts = {
    common: { damage: 10, health: 10 },
    rare: { damage: 40, health: 40 },
    epic: { damage: 80, health: 80 },
    legendary: { damage: 150, health: 150 },
    ultimate: { damage: 250, health: 250 },
    mythic: { damage: 400, health: 400 }
};

// Mount unlock levels
const mountUnlockLevels = {
    common: 1,
    rare: 2,
    epic: 10,
    legendary: 18,
    ultimate: 26,
    mythic: 34
};

// Mount names by rarity
const mountNames = {
    common: ['Brown Leaf', 'Lily Leaf', 'Lily Pad'],
    rare: ['Turtle', 'Crab', 'Brown Horse', 'Dino'],
    epic: ['Pig', 'Goat'],
    legendary: ['Bike', 'Giant Bee'],
    ultimate: ['Mini Dragon', 'One-Wheel Droid'],
    mythic: ['Hover Board', 'Hover Disk']
};

// Tier display names and colors
const tierNames = {
    common: 'Common',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
    ultimate: 'Ultimate',
    mythic: 'Mythic'
};

// DOM Elements
const mountLevelSelect = document.getElementById('mountLevel');
const windersCountInput = document.getElementById('windersCount');
const targetMountsInput = document.getElementById('targetMounts');
const windersInputGroup = document.getElementById('windersInputGroup');
const targetInputGroup = document.getElementById('targetInputGroup');
const calculateBtn = document.getElementById('calculateBtn');
const calcModeBtn = document.getElementById('calcModeBtn');
const targetModeBtn = document.getElementById('targetModeBtn');
const calcResults = document.getElementById('calcResults');
const targetResults = document.getElementById('targetResults');
const expectedMountsEl = document.getElementById('expectedMounts');
const windersPerMountEl = document.getElementById('windersPerMount');
const recommendedWindersEl = document.getElementById('recommendedWinders');
const expectedWithRecommendedEl = document.getElementById('expectedWithRecommended');
const probabilityGrid = document.getElementById('probabilityGrid');
const techTreeReduction = document.getElementById('techTreeReduction');

let currentMode = 'calculate';

function init() {
    populateMountLevels();
    loadSavedLevel();
    setupEventListeners();
    calculate();
    registerServiceWorker();
}

function populateMountLevels() {
    for (let level = 1; level <= 50; level++) {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = `Level ${level}`;
        mountLevelSelect.appendChild(option);
    }
}

function loadSavedLevel() {
    const savedLevel = localStorage.getItem('mountLevel');
    if (savedLevel && savedLevel >= 1 && savedLevel <= 50) {
        mountLevelSelect.value = savedLevel;
    } else {
        mountLevelSelect.value = 1;
    }
}

function saveLevelToStorage(level) {
    localStorage.setItem('mountLevel', level);
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
    calculateBtn.addEventListener('click', calculate);

    mountLevelSelect.addEventListener('change', () => {
        saveLevelToStorage(mountLevelSelect.value);
        calculate();
    });
    windersCountInput.addEventListener('input', debounce(calculate, 300));
    targetMountsInput.addEventListener('input', debounce(calculate, 300));
    techTreeReduction.addEventListener('input', debounce(calculate, 300));

    windersCountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });
    targetMountsInput.addEventListener('keypress', (e) => {
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
    windersInputGroup.classList.toggle('hidden', mode !== 'calculate');
    targetInputGroup.classList.toggle('hidden', mode !== 'target');
    calcResults.classList.toggle('hidden', mode !== 'calculate');
    targetResults.classList.toggle('hidden', mode !== 'target');
    calculateBtn.querySelector('.btn-text').textContent =
        mode === 'calculate' ? 'Calculate' : 'Find Winders';
    calculate();
}

function getAdjustedWindersNeeded(level) {
    const rates = mountSummonRates[level];
    if (!rates) return 0;

    const baseNeeded = rates.needed === 'MAX' ? 642 : rates.needed;
    const reduction = parseFloat(techTreeReduction.value) || 0;
    return Math.ceil(baseNeeded * (1 - reduction / 100));
}

function calculate() {
    const level = parseInt(mountLevelSelect.value);
    const rates = mountSummonRates[level];
    if (!rates) return;

    const windersNeeded = getAdjustedWindersNeeded(level);

    if (currentMode === 'calculate') {
        const windersCount = parseInt(windersCountInput.value) || 0;
        const expectedMounts = windersCount / windersNeeded;

        expectedMountsEl.textContent = formatNumber(expectedMounts);
        windersPerMountEl.textContent = windersNeeded;
    } else {
        const targetMounts = parseInt(targetMountsInput.value) || 0;
        const recommendedWinders = Math.ceil(targetMounts * windersNeeded);
        const expectedWithWinders = recommendedWinders / windersNeeded;

        recommendedWindersEl.textContent = formatNumber(recommendedWinders);
        expectedWithRecommendedEl.textContent = formatNumber(expectedWithWinders);
    }

    updateProbabilityBreakdown(level);
}

// Mount icons by tier for display
const mountTierIcons = {
    common: 'lily-pad',
    rare: 'turtle-mount',
    epic: 'pig',
    legendary: 'bee',
    ultimate: 'droid',
    mythic: 'hover-disk'
};

function updateProbabilityBreakdown(level) {
    const rates = mountSummonRates[level];
    probabilityGrid.innerHTML = '';

    if (!rates) return;

    const tiers = ['common', 'rare', 'epic', 'legendary', 'ultimate', 'mythic'];

    for (const tier of tiers) {
        if (rates[tier]) {
            const item = document.createElement('div');
            item.className = 'prob-item';

            const tierSpan = document.createElement('span');
            tierSpan.className = `prob-tier tier ${tier}`;
            
            // Add mount icon
            const mountIcon = document.createElement('span');
            mountIcon.className = `mount-icon small ${mountTierIcons[tier]}`;
            tierSpan.appendChild(mountIcon);
            tierSpan.appendChild(document.createTextNode(' ' + tierNames[tier]));

            const valueSpan = document.createElement('span');
            valueSpan.className = 'prob-value';
            valueSpan.textContent = `${(rates[tier] * 100).toFixed(2)}%`;

            item.appendChild(tierSpan);
            item.appendChild(valueSpan);
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
