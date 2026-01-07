document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const inputText = document.getElementById('inputText');
    const colorList = document.getElementById('colorList');
    const startColor = document.getElementById('startColor');
    const startColorHex = document.getElementById('startColorHex');
    const endColor = document.getElementById('endColor');
    const endColorHex = document.getElementById('endColorHex');
    const addColorBtn = document.getElementById('addColorBtn');
    const gradientMode = document.getElementById('gradientMode');
    const previewBox = document.getElementById('previewBox');
    const outputCode = document.getElementById('outputCode');
    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');

    // --- State ---
    // Store middle colors: array of { id, hex }
    let middleColors = [];
    let nextColorId = 1;

    // --- Initialization ---
    init();

    function init() {
        attachListeners();
        updatePreview();
    }

    function attachListeners() {
        // Main inputs
        inputText.addEventListener('input', updatePreview);
        gradientMode.addEventListener('change', updatePreview);

        // Start/End colors
        function syncColorInputs(picker, text) {
            picker.addEventListener('input', () => {
                text.value = picker.value.toUpperCase();
                updatePreview();
            });
            text.addEventListener('input', () => {
                const hex = normalizeHex(text.value);
                if (hex) {
                    picker.value = hex;
                    updatePreview();
                }
            });
        }

        syncColorInputs(startColor, startColorHex);
        syncColorInputs(endColor, endColorHex);

        // Add middle color
        addColorBtn.addEventListener('click', addMiddleColor);

        // Copy button
        copyBtn.addEventListener('click', copyToClipboard);
    }

    function addMiddleColor() {
        const id = nextColorId++;
        const defaultColor = '#00FF00';

        const colorRow = document.createElement('div');
        colorRow.className = 'color-row';
        colorRow.dataset.id = id;

        colorRow.innerHTML = `
            <div class="color-picker-wrapper">
                <input type="color" value="${defaultColor}">
            </div>
            <input type="text" class="color-hex-input" value="${defaultColor}">
            <span class="color-label">Middle Color</span>
            <button class="remove-color-btn" title="Remove color">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        // Insert before the last child (End Color)
        // colorList has children: [Start Color, ...Middle Colors..., End Color]
        // We want to insert before End Color, which is the last element
        const endColorRow = colorList.lastElementChild;
        colorList.insertBefore(colorRow, endColorRow);

        // Add to state
        middleColors.push({ id, hex: defaultColor });

        // Bind events for new row
        const picker = colorRow.querySelector('input[type="color"]');
        const text = colorRow.querySelector('input[type="text"]');
        const removeBtn = colorRow.querySelector('.remove-color-btn');

        picker.addEventListener('input', () => {
            text.value = picker.value.toUpperCase();
            updateColorState(id, picker.value);
            updatePreview();
        });

        text.addEventListener('input', () => {
            const hex = normalizeHex(text.value);
            if (hex) {
                picker.value = hex;
                updateColorState(id, hex);
                updatePreview();
            }
        });

        removeBtn.addEventListener('click', () => {
            colorRow.remove();
            middleColors = middleColors.filter(c => c.id !== id);
            updatePreview();
        });

        updatePreview();
    }

    function updateColorState(id, hex) {
        const idx = middleColors.findIndex(c => c.id === id);
        if (idx !== -1) {
            middleColors[idx].hex = hex;
        }
    }

    // --- Core Logic ---

    function updatePreview() {
        const text = inputText.value || '';
        const mode = gradientMode.value;

        // Gather all colors: Start -> Middle... -> End
        const colors = [
            startColor.value,
            ...middleColors.map(c => c.hex),
            endColor.value
        ];

        // 1. Generate Gradient Data
        // We need (text length OR word count) steps
        const result = generateGradient(text, colors, mode);

        // 2. Render Check Preview (HTML span colors)
        let htmlPreview = '';
        if (mode === 'chars') {
            htmlPreview = result.map(item => `<span style="color:${item.hex}">${escapeHtml(item.char)}</span>`).join('');
        } else {
            htmlPreview = result.map(item => {
                if (item.isSpace) return item.char;
                return `<span style="color:${item.hex}">${escapeHtml(item.char)}</span>`;
            }).join('');
        }
        previewBox.innerHTML = htmlPreview || '<span style="opacity:0.5">Type something...</span>';

        // 3. Render Output Code
        let codeOutput = '';
        if (mode === 'chars') {
            codeOutput = result.map(item => formatTag(item.char, item.hex)).join('');
        } else {
            codeOutput = result.map(item => {
                if (item.isSpace) return item.char;
                return formatTag(item.char, item.hex);
            }).join('');
        }
        outputCode.value = codeOutput;
    }


    function generateGradient(text, colors, mode) {
        if (!text) return [];

        const steps = mode === 'words' ?
            text.split(/(\s+)/).filter(p => !/^\s*$/.test(p)).length :
            text.replace(/\s/g, '').length; // Count non-space chars for steps

        // If we have 1 char, just use start color
        if (steps <= 1) {
            // ... strict simple implementation
        }

        // Create color scale
        // We have N stops (colors.length). We need to distribute 'steps' items across them.
        // E.g. 5 steps, 3 colors (A, B, C).
        // 0 -> A
        // 0.5 -> B
        // 1 -> C

        const gradientColors = getGradientColors(colors, Math.max(steps, 2));

        // Map text to colors
        // If mode=chars: map each non-space char to a color step. Spaces get no color (normally).
        // If mode=words: map each word to a color step.

        const output = [];
        let stepIndex = 0;

        if (mode === 'chars') {
            for (const char of text) {
                if (/\s/.test(char)) {
                    // Space: just emit without color info (or handle per requirement)
                    // User requested "skipSpaces" logic essentially. 
                    // Let's assume we skip assigning a color index to space, preserving gradient continuity.
                    output.push({ char, hex: null, isSpace: true });
                } else {
                    const hex = gradientColors[Math.min(stepIndex, gradientColors.length - 1)];
                    output.push({ char, hex, isSpace: false });
                    stepIndex++;
                }
            }
        } else {
            // Words
            const parts = text.split(/(\s+)/);
            for (const part of parts) {
                if (!part) continue;
                if (/^\s+$/.test(part)) {
                    output.push({ char: part, hex: null, isSpace: true });
                } else {
                    const hex = gradientColors[Math.min(stepIndex, gradientColors.length - 1)];
                    // For words, we color the whole word
                    output.push({ char: part, hex, isSpace: false });
                    stepIndex++;
                }
            }
        }
        return output;
    }

    function getGradientColors(colors, steps) {
        // Multi-stop interpolation
        // colors = ['#f00', '#0f0', '#00f']
        // Segments = colors.length - 1  (2 segments: R->G, G->B)
        // We need 'steps' total colors.

        if (steps === 0) return [];
        if (steps === 1) return [colors[0]];

        const result = [];
        const segmentCount = colors.length - 1;

        for (let i = 0; i < steps; i++) {
            const t = i / (steps - 1); // 0 to 1 global progress

            // Find which segment we are in
            const segmentPos = t * segmentCount; // 0 to 2
            const segmentIdx = Math.min(Math.floor(segmentPos), segmentCount - 1);
            const segmentProgress = segmentPos - segmentIdx; // 0 to 1 within segment

            const c1 = hexToRgb(colors[segmentIdx]);
            const c2 = hexToRgb(colors[segmentIdx + 1]);

            const r = lerp(c1.r, c2.r, segmentProgress);
            const g = lerp(c1.g, c2.g, segmentProgress);
            const b = lerp(c1.b, c2.b, segmentProgress);

            result.push(rgbToHex(r, g, b));
        }
        return result;
    }

    // --- Helpers ---

    function formatTag(text, hex) {
        if (!hex) return text;
        const h = hex.replace('#', '').toLowerCase(); // User sample was lowercase
        return `<#${h}>${text}`;
    }

    function hexToRgb(hex) {
        let h = hex.replace('#', '');
        if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        const num = parseInt(h, 16);
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255
        };
    }

    function rgbToHex(r, g, b) {
        const toHex = (c) => {
            const hex = Math.round(c).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function normalizeHex(input) {
        const match = input.match(/#?([0-9a-fA-F]{3,6})/);
        if (match) {
            let color = match[1];
            if (color.length === 3) {
                color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
            }
            if (color.length === 6) return '#' + color;
        }
        return null;
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function copyToClipboard() {
        outputCode.select();
        document.execCommand('copy');

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
});
