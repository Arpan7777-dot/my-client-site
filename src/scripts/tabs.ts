export function setupIndicatorTabs() {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    const indicator = document.getElementById('tab-indicator');

    function updateIndicator(activeBtn: HTMLButtonElement) {
        if (!indicator || !activeBtn) return;

        indicator.style.left = `${activeBtn.offsetLeft}px`;
        indicator.style.width = `${activeBtn.offsetWidth}px`;
    }

    function switchTab(tabName: string, updateUrl = true) {
        buttons.forEach((btn) => {
            const isActive = btn.getAttribute('data-tab') === tabName;
            
            if(isActive) updateIndicator(btn);
            btn.classList.toggle('text-ktx-lavender', isActive);
            btn.classList.toggle('font-semibold', isActive);
            btn.classList.toggle('text-ktx-subtext0', !isActive);

            
            
            
        });
        panels.forEach((panel) => {
            if (panel.id !== `tab-${tabName}`) {
                panel.classList.add('hidden');
                panel.classList.remove('block', 'opacity-100', 'translate-y-0');
                panel.classList.add('opacity-0', 'translate-y-2');
            }
        });

        const activePanel = document.getElementById(`tab-${tabName}`);
        if (activePanel) {
            activePanel.classList.remove('hidden');
            activePanel.classList.add('block');
        }

        // Request animation frame ensures display:block applies before transition begins
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                activePanel?.classList.remove('opacity-0', 'translate-y-2');
                activePanel?.classList.add('opacity-100', 'translate-y-0');
            });
        });

        // Update Hash URL
        if (updateUrl) {
            history.pushState(null, '', `#${tabName}`);
        }
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            if (target) switchTab(target);
        });
    });

    function handleHashChange() {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(`tab-${hash}`)) {
            switchTab(hash, false);
        } else {
            switchTab('home', false);
        }
    }

    window.addEventListener('popstate', handleHashChange);
    handleHashChange();

    
}