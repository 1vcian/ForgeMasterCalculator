// ===== ForgeMaster Egg Calculator =====
// Data from official Forge Master Information spreadsheet (December 2025)

// Complete Egg Drop Rates by difficulty (1-1 to 10-10)
const eggDropRates = {
    // Chapter 1 (1-1 to 1-10)
    '1-1': { common: 0.99, rare: 0.01 },
    '1-2': { common: 0.98, rare: 0.02 },
    '1-3': { common: 0.95, rare: 0.05 },
    '1-4': { common: 0.8995, rare: 0.10, epic: 0.0005 },
    '1-5': { common: 0.8854, rare: 0.114, epic: 0.0006 },
    '1-6': { common: 0.8693, rare: 0.13, epic: 0.0007 },
    '1-7': { common: 0.851, rare: 0.1482, epic: 0.0008 },
    '1-8': { common: 0.83, rare: 0.1689, epic: 0.0011 },
    '1-9': { common: 0.8061, rare: 0.1925, epic: 0.0014 },
    '1-10': { common: 0.7788, rare: 0.2195, epic: 0.0017 },
    
    // Chapter 2 (2-1 to 2-10)
    '2-1': { common: 0.7476, rare: 0.2503, epic: 0.0021 },
    '2-2': { common: 0.7121, rare: 0.2852, epic: 0.0027 },
    '2-3': { common: 0.6714, rare: 0.3252, epic: 0.0034 },
    '2-4': { common: 0.6251, rare: 0.3707, epic: 0.0042 },
    '2-5': { common: 0.5721, rare: 0.4227, epic: 0.0052 },
    '2-6': { common: 0.5117, rare: 0.4817, epic: 0.0066 },
    '2-7': { common: 0.4426, rare: 0.5492, epic: 0.0082 },
    '2-8': { common: 0.3636, rare: 0.6262, epic: 0.0102 },
    '2-9': { common: 0.2734, rare: 0.7138, epic: 0.0128 },
    '2-10': { common: 0.175, rare: 0.809, epic: 0.016 },
    
    // Chapter 3 (3-1 to 3-10) - Legendary starts appearing
    '3-1': { common: 0.175, rare: 0.8048, epic: 0.02, legendary: 0.0002 },
    '3-2': { common: 0.175, rare: 0.8007, epic: 0.024, legendary: 0.0003 },
    '3-3': { common: 0.175, rare: 0.7958, epic: 0.0288, legendary: 0.0004 },
    '3-4': { common: 0.175, rare: 0.79, epic: 0.0345, legendary: 0.0005 },
    '3-5': { common: 0.175, rare: 0.7831, epic: 0.0413, legendary: 0.0006 },
    '3-6': { common: 0.175, rare: 0.7747, epic: 0.0496, legendary: 0.0007 },
    '3-7': { common: 0.175, rare: 0.7647, epic: 0.0594, legendary: 0.0009 },
    '3-8': { common: 0.175, rare: 0.7527, epic: 0.0712, legendary: 0.0011 },
    '3-9': { common: 0.175, rare: 0.7382, epic: 0.0854, legendary: 0.0014 },
    '3-10': { common: 0.175, rare: 0.7209, epic: 0.1024, legendary: 0.0017 },
    
    // Chapter 4 (4-1 to 4-10)
    '4-1': { common: 0.175, rare: 0.7, epic: 0.1229, legendary: 0.0021 },
    '4-2': { common: 0.175, rare: 0.6751, epic: 0.1472, legendary: 0.0027 },
    '4-3': { common: 0.175, rare: 0.6451, epic: 0.1765, legendary: 0.0034 },
    '4-4': { common: 0.175, rare: 0.6091, epic: 0.2117, legendary: 0.0042 },
    '4-5': { common: 0.175, rare: 0.566, epic: 0.2538, legendary: 0.0052 },
    '4-6': { common: 0.175, rare: 0.5141, epic: 0.3043, legendary: 0.0066 },
    '4-7': { common: 0.175, rare: 0.4519, epic: 0.3649, legendary: 0.0082 },
    '4-8': { common: 0.175, rare: 0.3773, epic: 0.4375, legendary: 0.0102 },
    '4-9': { common: 0.175, rare: 0.2877, epic: 0.5245, legendary: 0.0128 },
    '4-10': { common: 0.175, rare: 0.1801, epic: 0.6289, legendary: 0.016 },
    
    // Chapter 5 (5-1 to 5-10) - Ultimate starts appearing
    '5-1': { common: 0.175, rare: 0.165, epic: 0.6398, legendary: 0.02, ultimate: 0.0002 },
    '5-2': { common: 0.175, rare: 0.165, epic: 0.6361, legendary: 0.0236, ultimate: 0.0003 },
    '5-3': { common: 0.175, rare: 0.165, epic: 0.6318, legendary: 0.0278, ultimate: 0.0004 },
    '5-4': { common: 0.175, rare: 0.165, epic: 0.6267, legendary: 0.0328, ultimate: 0.0005 },
    '5-5': { common: 0.175, rare: 0.165, epic: 0.6207, legendary: 0.0387, ultimate: 0.0006 },
    '5-6': { common: 0.175, rare: 0.165, epic: 0.6135, legendary: 0.0458, ultimate: 0.0007 },
    '5-7': { common: 0.175, rare: 0.165, epic: 0.6051, legendary: 0.054, ultimate: 0.0009 },
    '5-8': { common: 0.175, rare: 0.165, epic: 0.5952, legendary: 0.0637, ultimate: 0.0011 },
    '5-9': { common: 0.175, rare: 0.165, epic: 0.5834, legendary: 0.0752, ultimate: 0.0014 },
    '5-10': { common: 0.175, rare: 0.165, epic: 0.5696, legendary: 0.0887, ultimate: 0.0017 },
    
    // Chapter 6 (6-1 to 6-10)
    '6-1': { common: 0.175, rare: 0.165, epic: 0.5532, legendary: 0.1047, ultimate: 0.0021 },
    '6-2': { common: 0.175, rare: 0.165, epic: 0.5338, legendary: 0.1235, ultimate: 0.0027 },
    '6-3': { common: 0.175, rare: 0.165, epic: 0.5109, legendary: 0.1457, ultimate: 0.0034 },
    '6-4': { common: 0.175, rare: 0.165, epic: 0.4838, legendary: 0.172, ultimate: 0.0042 },
    '6-5': { common: 0.175, rare: 0.165, epic: 0.4518, legendary: 0.203, ultimate: 0.0052 },
    '6-6': { common: 0.175, rare: 0.165, epic: 0.414, legendary: 0.2394, ultimate: 0.0066 },
    '6-7': { common: 0.175, rare: 0.165, epic: 0.3692, legendary: 0.2826, ultimate: 0.0082 },
    '6-8': { common: 0.175, rare: 0.165, epic: 0.3163, legendary: 0.3335, ultimate: 0.0102 },
    '6-9': { common: 0.175, rare: 0.165, epic: 0.2537, legendary: 0.3935, ultimate: 0.0128 },
    '6-10': { common: 0.175, rare: 0.165, epic: 0.1797, legendary: 0.4643, ultimate: 0.016 },
    
    // Chapter 7 (7-1 to 7-10) - Mythic starts appearing
    '7-1': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4748, ultimate: 0.02, mythic: 0.0002 },
    '7-2': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4717, ultimate: 0.023, mythic: 0.0003 },
    '7-3': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4681, ultimate: 0.0265, mythic: 0.0004 },
    '7-4': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4641, ultimate: 0.0304, mythic: 0.0005 },
    '7-5': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4594, ultimate: 0.035, mythic: 0.0006 },
    '7-6': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4541, ultimate: 0.0402, mythic: 0.0007 },
    '7-7': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4478, ultimate: 0.0463, mythic: 0.0009 },
    '7-8': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4407, ultimate: 0.0532, mythic: 0.0011 },
    '7-9': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4324, ultimate: 0.0612, mythic: 0.0014 },
    '7-10': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4229, ultimate: 0.0704, mythic: 0.0017 },
    
    // Chapter 8 (8-1 to 8-10)
    '8-1': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.4119, ultimate: 0.081, mythic: 0.0021 },
    '8-2': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.3993, ultimate: 0.093, mythic: 0.0027 },
    '8-3': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.3846, ultimate: 0.107, mythic: 0.0034 },
    '8-4': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.3677, ultimate: 0.1231, mythic: 0.0042 },
    '8-5': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.3482, ultimate: 0.1416, mythic: 0.0052 },
    '8-6': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.3257, ultimate: 0.1627, mythic: 0.0066 },
    '8-7': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.2997, ultimate: 0.1871, mythic: 0.0082 },
    '8-8': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.2695, ultimate: 0.2153, mythic: 0.0102 },
    '8-9': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.2347, ultimate: 0.2475, mythic: 0.0128 },
    '8-10': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.1944, ultimate: 0.2846, mythic: 0.016 },
    
    // Chapter 9 (9-1 to 9-10)
    '9-1': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.31, mythic: 0.02 },
    '9-2': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.3076, mythic: 0.0224 },
    '9-3': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.3049, mythic: 0.0251 },
    '9-4': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.3019, mythic: 0.0281 },
    '9-5': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2985, mythic: 0.0315 },
    '9-6': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2948, mythic: 0.0352 },
    '9-7': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2905, mythic: 0.0395 },
    '9-8': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2858, mythic: 0.0442 },
    '9-9': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2805, mythic: 0.0495 },
    '9-10': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2745, mythic: 0.0555 },
    
    // Chapter 10 (10-1 to 10-10)
    '10-1': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2679, mythic: 0.0621 },
    '10-2': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2604, mythic: 0.0696 },
    '10-3': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2521, mythic: 0.0779 },
    '10-4': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2427, mythic: 0.0873 },
    '10-5': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2323, mythic: 0.0977 },
    '10-6': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2205, mythic: 0.1095 },
    '10-7': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.2074, mythic: 0.1226 },
    '10-8': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.1927, mythic: 0.1373 },
    '10-9': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.1762, mythic: 0.1538 },
    '10-10': { common: 0.175, rare: 0.165, epic: 0.165, legendary: 0.165, ultimate: 0.165, mythic: 0.165 }
};

// Base hatching times in minutes
const baseHatchingTimes = {
    common: 30,      // 30 minutes
    rare: 120,       // 2 hours
    epic: 240,       // 4 hours
    legendary: 480,  // 8 hours
    ultimate: 960,   // 16 hours
    mythic: 1920     // 32 hours (1 day 8 hours)
};

// Tier names
const tierNames = {
    common: 'Common',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
    ultimate: 'Ultimate',
    mythic: 'Mythic'
};

// Pet stats by rarity (from Excel)
const petStats = {
    common: [
        { name: 'Snail', damage: 50, health: 1200 },
        { name: 'Turtle', damage: 50, health: 1200 },
        { name: 'Mouse', damage: 100, health: 800 },
        { name: 'Chicken', damage: 100, health: 800 },
        { name: 'Cat', damage: 100, health: 800 },
        { name: 'Dog', damage: 150, health: 400 }
    ],
    rare: [
        { name: 'Hedgehog', damage: 250, health: 6000 },
        { name: 'Bear', damage: 250, health: 6000 },
        { name: 'Ostrich', damage: 500, health: 4000 },
        { name: 'Scorpion', damage: 750, health: 2000 },
        { name: 'Spider', damage: 750, health: 2000 }
    ],
    epic: [
        { name: 'Panda', damage: 1250, health: 30000 },
        { name: 'Griffin', damage: 1250, health: 30000 },
        { name: 'Unicorn', damage: 2500, health: 20000 },
        { name: 'Saber Tooth', damage: 3750, health: 10000 },
        { name: 'Tiger', damage: 3750, health: 10000 }
    ],
    legendary: [
        { name: 'Cerberus', damage: 12500, health: 100000 },
        { name: 'Kitsune', damage: 18750, health: 50000 },
        { name: 'Serpent', damage: 18750, health: 50000 }
    ],
    ultimate: [
        { name: 'Treant', damage: 31200, health: 750000 },
        { name: 'Enchanted Elk', damage: 62500, health: 500000 },
        { name: 'Electry', damage: 93700, health: 250000 }
    ],
    mythic: [
        { name: 'Genie', damage: 156250, health: 3750000 },
        { name: 'Baby Dragon', damage: 312500, health: 2500000 },
        { name: 'Spectral Tiger', damage: 468750, health: 1250000 }
    ]
};

// Egg unlocking info
const eggUnlockInfo = {
    common: 'Drops from 1-1',
    rare: 'Drops from 1-1',
    epic: 'Drops from 1-4',
    legendary: 'Drops from 3-1',
    ultimate: 'Drops from 5-1',
    mythic: 'Drops from 7-1'
};

// DOM Elements
const difficultySelect = document.getElementById('difficultyLevel');
const techTreeSpeed = document.getElementById('techTreeSpeed');
const probabilityGrid = document.getElementById('probabilityGrid');
const hatchingTimesGrid = document.getElementById('hatchingTimesGrid');

function init() {
    populateDifficulties();
    loadSavedDifficulty();
    setupEventListeners();
    calculate();
    registerServiceWorker();
}

function populateDifficulties() {
    const difficulties = Object.keys(eggDropRates);
    difficulties.forEach(diff => {
        const option = document.createElement('option');
        option.value = diff;
        option.textContent = `Stage ${diff}`;
        difficultySelect.appendChild(option);
    });
}

function loadSavedDifficulty() {
    const saved = localStorage.getItem('eggDifficulty');
    if (saved && eggDropRates[saved]) {
        difficultySelect.value = saved;
    } else {
        difficultySelect.value = '1-1';
    }
}

function saveDifficultyToStorage(diff) {
    localStorage.setItem('eggDifficulty', diff);
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .catch(err => console.log('SW registration failed:', err));
    }
}

function setupEventListeners() {
    difficultySelect.addEventListener('change', () => {
        saveDifficultyToStorage(difficultySelect.value);
        calculate();
    });
    techTreeSpeed.addEventListener('input', calculate);
}

function calculate() {
    const difficulty = difficultySelect.value;
    const speedBonus = parseFloat(techTreeSpeed.value) || 0;

    updateProbabilityBreakdown(difficulty);
    updateHatchingTimes(speedBonus);
}

function updateProbabilityBreakdown(difficulty) {
    const rates = eggDropRates[difficulty];
    probabilityGrid.innerHTML = '';

    if (!rates) return;

    const tiers = ['common', 'rare', 'epic', 'legendary', 'ultimate', 'mythic'];

    for (const tier of tiers) {
        if (rates[tier]) {
            const item = document.createElement('div');
            item.className = 'prob-item';

            const tierSpan = document.createElement('span');
            tierSpan.className = `prob-tier tier ${tier}`;
            
            // Add egg icon
            const eggIcon = document.createElement('span');
            eggIcon.className = `egg-icon tiny ${tier}`;
            tierSpan.appendChild(eggIcon);
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

function updateHatchingTimes(speedBonus) {
    hatchingTimesGrid.innerHTML = '';

    const tiers = ['common', 'rare', 'epic', 'legendary', 'ultimate', 'mythic'];

    for (const tier of tiers) {
        const baseTime = baseHatchingTimes[tier];
        // Speed bonus formula: Base Time / (1 + Speed%)
        const adjustedTime = baseTime / (1 + speedBonus / 100);

        const item = document.createElement('div');
        item.className = 'prob-item';

        const tierSpan = document.createElement('span');
        tierSpan.className = `prob-tier tier ${tier}`;
        
        // Add egg icon
        const eggIcon = document.createElement('span');
        eggIcon.className = `egg-icon tiny ${tier}`;
        tierSpan.appendChild(eggIcon);
        tierSpan.appendChild(document.createTextNode(' ' + tierNames[tier]));

        const valueSpan = document.createElement('span');
        valueSpan.className = 'prob-value';
        valueSpan.textContent = formatTime(adjustedTime);

        item.appendChild(tierSpan);
        item.appendChild(valueSpan);
        hatchingTimesGrid.appendChild(item);
    }
}

function formatTime(minutes) {
    if (minutes >= 1440) {
        const days = Math.floor(minutes / 1440);
        const hours = Math.floor((minutes % 1440) / 60);
        const mins = Math.round(minutes % 60);
        return `${days}d ${hours}h ${mins}m`;
    } else if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours}h ${mins}m`;
    } else {
        return `${Math.round(minutes)}m`;
    }
}

document.addEventListener('DOMContentLoaded', init);
