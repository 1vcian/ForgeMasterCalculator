// ===== ForgeMaster EXP Calculator =====
// Forge EXP Calculator - ForgeMaster Helper

// Probability data for each forge level (as decimals from Excel)
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

// Forge upgrade costs and times from Excel
const forgeUpgrades = {
    1: { cost: 'Free', time: 'N/A', costValue: 0 },
    2: { cost: '400', time: '5m', costValue: 400 },
    3: { cost: '700', time: '15m', costValue: 700 },
    4: { cost: '1.5k', time: '30m', costValue: 1500 },
    5: { cost: '3.5k', time: '1h', costValue: 3500 },
    6: { cost: '10k', time: '1h 59m', costValue: 10000 },
    7: { cost: '25k', time: '7h 33m', costValue: 25000 },
    8: { cost: '50k', time: '13h 6m', costValue: 50000 },
    9: { cost: '99.9k (33.3k x 3)', time: '18h 39m', costValue: 99900 },
    10: { cost: '150k (50k x 3)', time: '1d 13m', costValue: 150000 },
    11: { cost: '249.9k (83.3k x 3)', time: '1d 11h', costValue: 249900 },
    12: { cost: '336k (112k x 3)', time: '2d 1h', costValue: 336000 },
    13: { cost: '452k (113k x 4)', time: '2d 17h', costValue: 452000 },
    14: { cost: '612k (153k x 4)', time: '3d 13h', costValue: 612000 },
    15: { cost: '830k (166k x 5)', time: '4d 11h', costValue: 830000 },
    16: { cost: '1.12M (224k x 5)', time: '5d 9h', costValue: 1120000 },
    17: { cost: '1.51M (252k x 6)', time: '6d 7h', costValue: 1510000 },
    18: { cost: '2.04M (291k x 7)', time: '7d 6h', costValue: 2040000 },
    19: { cost: '2.75M (344k x 8)', time: '8d 4h', costValue: 2750000 },
    20: { cost: '3.7M (413k x 9)', time: '9d 2h', costValue: 3700000 },
    21: { cost: '5.02M (502k x 10)', time: '10d 53m', costValue: 5020000 },
    22: { cost: '6.78M (678k x 10)', time: '10d 23h', costValue: 6780000 },
    23: { cost: '9.16M (916k x 10)', time: '11d 21h', costValue: 9160000 },
    24: { cost: '12.3M (1.23M x 10)', time: '12d 19h', costValue: 12300000 },
    25: { cost: '16.6M (1.66M x 10)', time: '13d 17h', costValue: 16600000 },
    26: { cost: '20M (2M x 10)', time: '14d 15h', costValue: 20000000 },
    27: { cost: '24M (2.4M x 10)', time: '15d 14h', costValue: 24000000 },
    28: { cost: '28.8M (2.88M x 10)', time: '16d 12h', costValue: 28800000 },
    29: { cost: '34.6M (3.46M x 10)', time: '17d 10h', costValue: 34600000 },
    30: { cost: '41.5M (4.15M x 10)', time: '18d 8h', costValue: 41500000 },
    31: { cost: '49.8M (4.98M x 10)', time: '19d 7h', costValue: 49800000 },
    32: { cost: '59.8M (5.98M x 10)', time: '20d 5h', costValue: 59800000 },
    33: { cost: '71.7M (7.17M x 10)', time: '21d 3h', costValue: 71700000 },
    34: { cost: '86.1M (8.61M x 10)', time: '22d 1h', costValue: 86100000 },
    35: { cost: '103M (10.3M x 10)', time: '23d', costValue: 103000000 }
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
const freeSummonPercentInput = document.getElementById('freeSummonPercent');
const hammerCountInput = document.getElementById('hammerCount');
const targetExpInput = document.getElementById('targetExp');
const hammerInputGroup = document.getElementById('hammerInputGroup');
const targetInputGroup = document.getElementById('targetInputGroup');

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

const maxItemLevelInput = document.getElementById('maxItemLevel');
const priceBonusInput = document.getElementById('priceBonus');
const maxCoinValueInput = document.getElementById('maxCoinValue');
const estimatedCoinsEl = document.getElementById('estimatedCoins');

// Current mode
let currentMode = 'calculate';

// Initialize the application
function init() {
    populateForgeLevels();
    loadSavedLevel();
    setupEventListeners();
    calculate();
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
    calcModeBtn.addEventListener('click', () => switchMode('calculate'));
    targetModeBtn.addEventListener('click', () => switchMode('target'));


    forgeLevelSelect.addEventListener('change', () => {
        saveLevelToStorage(forgeLevelSelect.value);
        calculate();
    });
    freeSummonPercentInput.addEventListener('input', debounce(calculate, 300));
    hammerCountInput.addEventListener('input', debounce(calculate, 300));
    targetExpInput.addEventListener('input', debounce(calculate, 300));

    hammerCountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });
    targetExpInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculate();
    });

    maxItemLevelInput.addEventListener('input', debounce(calculate, 300));
    priceBonusInput.addEventListener('input', debounce(calculate, 300));

    // Coin Sync Logic
    maxItemLevelInput.addEventListener('input', () => {
        // When Level changes, keep Bonus constant, update Max Coin
        updateMaxCoinFromBonus();
        debounce(calculate, 300)();
    });

    priceBonusInput.addEventListener('input', () => {
        // User changed Bonus -> Update Max Coin
        updateMaxCoinFromBonus();
        debounce(calculate, 300)();
    });

    maxCoinValueInput.addEventListener('input', () => {
        // User changed Max Coin -> Update Bonus
        updateBonusFromMaxCoin();
        debounce(calculate, 300)();
    });
}

// Logic: Base Price = 20 * 1.01^(ItemLevel - 1)
function getBasePrice(level) {
    return 20 * Math.pow(1.01, level - 1);
}

function updateMaxCoinFromBonus() {
    const level = parseInt(maxItemLevelInput.value) || 1;
    const bonus = parseFloat(priceBonusInput.value) || 0;
    const base = getBasePrice(level);

    const maxCoin = base * (1 + bonus / 100);

    // Avoid circular loop by checking if focused? No, this is triggered by specific inputs.
    // Just set the value.
    if (document.activeElement !== maxCoinValueInput) {
        maxCoinValueInput.value = Math.ceil(maxCoin); // Round up
    }
}

function updateBonusFromMaxCoin() {
    const level = parseInt(maxItemLevelInput.value) || 1;
    const maxCoin = parseFloat(maxCoinValueInput.value) || 0;
    const base = getBasePrice(level);

    if (base === 0) return;

    // maxCoin = base * (1 + bonus/100)
    // maxCoin/base = 1 + bonus/100
    // (maxCoin/base - 1) * 100 = bonus

    let bonus = ((maxCoin / base) - 1) * 100;
    if (bonus < 0) bonus = 0; // Clamp min bonus

    if (document.activeElement !== priceBonusInput) {
        priceBonusInput.value = Math.ceil(bonus); // Round up
    }
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

    calcModeBtn.classList.toggle('active', mode === 'calculate');
    targetModeBtn.classList.toggle('active', mode === 'target');

    hammerInputGroup.classList.toggle('hidden', mode !== 'calculate');
    targetInputGroup.classList.toggle('hidden', mode !== 'target');

    calcResults.classList.toggle('hidden', mode !== 'calculate');
    targetResults.classList.toggle('hidden', mode !== 'target');



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
    const freeSummonPercent = parseFloat(freeSummonPercentInput.value) || 0;
    const freeMultiplier = 1 / (1 - (freeSummonPercent / 100));

    if (currentMode === 'calculate') {
        const hammerCount = parseInt(hammerCountInput.value) || 0;
        const effectiveHammers = hammerCount * freeMultiplier;
        const totalExp = expPerHammer * effectiveHammers;

        expectedExpEl.textContent = formatNumber(totalExp);
        expPerHammerEl.textContent = expPerHammer.toFixed(4);

        // Calculate Coins
        const maxLevel = parseInt(maxItemLevelInput.value) || 100;
        // USE THE BONUS INPUT as the source of truth for the final calc (it's synced)
        const priceBonus = parseFloat(priceBonusInput.value) || 0;
        const bonusMultiplier = 1 + (priceBonus / 100);

        const probs = forgeProbabilities[level];
        let lowestProb = 0;
        if (probs) {
            lowestProb = Math.min(...Object.values(probs));
        }
        const standardProb = 100 - lowestProb;

        const priceBase = 20;

        // Standard items Min: Max - 5 (ensure min level 1)
        const standardItemLevelMin = Math.max(1, maxLevel - 5);
        const priceStandardMin = priceBase * Math.pow(1.01, standardItemLevelMin - 1);

        // Lowest Probability Item Min: Level 1
        const priceLowestMin = priceBase; // 20 * 1.01^0

        // Max Price for ALL items: at Max Level
        const priceMax = priceBase * Math.pow(1.01, maxLevel - 1);

        // Weighted Averages
        // Min: Standard uses Max-5, Lowest uses Level 1
        const avgPriceMin = ((standardProb * priceStandardMin) + (lowestProb * priceLowestMin)) / 100;

        // Max: All use Max Level
        const avgPriceMax = priceMax;

        const totalCoinsMin = avgPriceMin * effectiveHammers * bonusMultiplier;
        const totalCoinsMax = avgPriceMax * effectiveHammers * bonusMultiplier;

        estimatedCoinsEl.textContent = `${formatNumber(totalCoinsMin)} - ${formatNumber(totalCoinsMax)}`;

        updateProbabilityBreakdown(level, effectiveHammers);
    } else {
        const targetExp = parseInt(targetExpInput.value) || 0;
        const hammersNeeded = Math.ceil(targetExp / expPerHammer);
        const actualHammersNeeded = Math.ceil(hammersNeeded / freeMultiplier);
        const expectedWithHammers = expPerHammer * hammersNeeded;

        recommendedHammersEl.textContent = formatNumber(actualHammersNeeded);
        expectedWithRecommendedEl.textContent = formatNumber(expectedWithHammers);

        updateProbabilityBreakdown(level, 0);
    }
}

// Update the probability breakdown grid
function updateProbabilityBreakdown(level, totalAttempts = 0) {
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

        // Show count if we have attempts
        if (totalAttempts > 0) {
            const count = Math.floor(totalAttempts * (probability / 100));
            valueSpan.innerHTML = `<span class="prob-percent">${probability.toFixed(2)}%</span> <span class="prob-count">(~${formatNumber(count)})</span>`;
        } else {
            valueSpan.textContent = `${probability.toFixed(2)}%`;
        }

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
