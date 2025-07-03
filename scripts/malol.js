// scripts/font_resizer.js (بدون تغییر از نسخه قبلی)
document.addEventListener('DOMContentLoaded', () => {
    // انتخاب عناصر اصلی کنترل فونت و سایدبار
    const increaseBtn = document.getElementById('increase-font');
    const decreaseBtn = document.getElementById('decrease-font');
    const resetAllBtn = document.getElementById('reset-all'); // Overall reset button

    const openSidebarBtn = document.getElementById('open-font-controls');
    const closeSidebarBtn = document.getElementById('close-font-controls');
    const fontControlsSidebar = document.getElementById('font-controls-sidebar');

    const mainContent = document.getElementById('main-content'); // Main content target (body)

    // Select new toggle buttons
    const toggleFontWeightBtn = document.getElementById('toggle-font-weight');
    const cycleTextColorBtn = document.getElementById('cycle-text-color'); // New color cycler button
    const currentColorIndicator = cycleTextColorBtn.querySelector('.current-color-indicator'); // The small dot

    // **مهم:** بررسی می‌کنیم که آیا mainContent پیدا شده است یا خیر
    if (!mainContent) {
        console.error("Error: Element with ID 'main-content' not found. Please add id='main-content' to your <body> tag or the main content container.");
        return;
    }

    // --- Current State Variables ---
    let initialFontSize = parseFloat(getComputedStyle(mainContent).fontSize);
    let currentFontSize = initialFontSize;
    let currentFontWeight = 'normal'; // 'normal', 'bold'

    // Define the array of text colors to cycle through
    const textColors = [
        '#333333', // Default (black)
        '#28a745', // Green
        '#FFFFFF', // White (will need a contrasting background if body is white)
        '#fd7e14', // Orange
        '#6f42c1', // Purple
        '#dc3545'  // Red
    ];
    let currentTextColorIndex = 0; // Index for the current color in the array

    // --- Constants ---
    const minFontSize = 12;
    const maxFontSize = 24;
    const step = 1;

    // --- Style Application Functions ---

    // Apply Font Size
    function applyFontSize(size) {
        mainContent.style.fontSize = `${size}px`;
        localStorage.setItem('savedFontSize', size);
    }

    // Apply Font Weight
    function applyFontWeight(weight) {
        mainContent.classList.remove('font-weight-normal', 'font-weight-bold');
        if (weight === 'bold') {
            mainContent.classList.add('font-weight-bold');
            toggleFontWeightBtn.classList.add('active'); // Activate button
        } else {
            mainContent.classList.add('font-weight-normal');
            toggleFontWeightBtn.classList.remove('active'); // Deactivate button
        }
        currentFontWeight = weight;
        localStorage.setItem('savedFontWeight', weight);
    }

    // Apply Text Color using CSS Variable
    function applyTextColor(color) {
        document.documentElement.style.setProperty('--global-text-color', color);
        currentColorIndicator.style.backgroundColor = color; // Update the indicator dot
        localStorage.setItem('savedTextColor', color);
    }

    // --- Load Settings from Local Storage ---
    function loadSettings() {
        const savedFontSize = localStorage.getItem('savedFontSize');
        const savedFontWeight = localStorage.getItem('savedFontWeight');
        const savedTextColor = localStorage.getItem('savedTextColor'); // Saved color string

        if (savedFontSize) {
            currentFontSize = parseFloat(savedFontSize);
            if (currentFontSize < minFontSize) currentFontSize = minFontSize;
            if (currentFontSize > maxFontSize) currentFontSize = maxFontSize;
            applyFontSize(currentFontSize);
        } else {
            applyFontSize(initialFontSize);
        }

        if (savedFontWeight) {
            applyFontWeight(savedFontWeight);
        } else {
            applyFontWeight('normal');
        }

        if (savedTextColor) {
            const index = textColors.indexOf(savedTextColor);
            if (index !== -1) {
                currentTextColorIndex = index;
                applyTextColor(textColors[currentTextColorIndex]);
            } else {
                currentTextColorIndex = 0;
                applyTextColor(textColors[currentTextColorIndex]);
                localStorage.setItem('savedTextColor', textColors[currentTextColorIndex]);
            }
        } else {
            currentTextColorIndex = 0;
            applyTextColor(textColors[currentTextColorIndex]);
        }
    }

    // --- Event Listeners for Font Controls ---

    increaseBtn.addEventListener('click', () => {
        if (currentFontSize < maxFontSize) {
            currentFontSize += step;
            applyFontSize(currentFontSize);
        }
    });

    decreaseBtn.addEventListener('click', () => {
        if (currentFontSize > minFontSize) {
            currentFontSize -= step;
            applyFontSize(currentFontSize);
        }
    });

    // Event Listener for Font Weight Toggle
    toggleFontWeightBtn.addEventListener('click', () => {
        if (currentFontWeight === 'normal') {
            applyFontWeight('bold');
        } else {
            applyFontWeight('normal');
        }
    });

    // Event Listener for Text Color Cycling Button
    cycleTextColorBtn.addEventListener('click', () => {
        currentTextColorIndex = (currentTextColorIndex + 1) % textColors.length;
        applyTextColor(textColors[currentTextColorIndex]);
    });

    // Overall Reset Button
    resetAllBtn.addEventListener('click', () => {
        currentFontSize = initialFontSize;
        currentFontWeight = 'normal';
        currentTextColorIndex = 0;

        applyFontSize(currentFontSize);
        applyFontWeight(currentFontWeight);
        applyTextColor(textColors[currentTextColorIndex]);

        localStorage.removeItem('savedFontSize');
        localStorage.removeItem('savedFontWeight');
        localStorage.removeItem('savedTextColor');
    });

    // --- Sidebar Open/Close Logic ---
    openSidebarBtn.addEventListener('click', () => {
        fontControlsSidebar.classList.add('open');
        document.body.classList.add('sidebar-open');
        openSidebarBtn.style.display = 'none';
    });

    closeSidebarBtn.addEventListener('click', () => {
        fontControlsSidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        openSidebarBtn.style.display = 'flex';
    });

    // Load settings on initial page load
    loadSettings();
});
