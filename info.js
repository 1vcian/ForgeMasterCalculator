// ===== ForgeMaster Info Page =====
// Tab navigation for info page

document.addEventListener('DOMContentLoaded', () => {
    const tabNav = document.getElementById('tabNav');
    const tabButtons = tabNav.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Load saved tab or default to 'war'
    const savedTab = localStorage.getItem('infoTab') || 'war';
    activateTab(savedTab);

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            activateTab(tab);
            localStorage.setItem('infoTab', tab);
        });
    });

    function activateTab(tabId) {
        // Update buttons
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        // Update content
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .catch(err => console.log('SW registration failed:', err));
    }
});
