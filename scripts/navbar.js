// JavaScript to toggle menu visibility
        const menuButton = document.getElementById('menuButton');
        const menu = document.getElementById('menu');

        menuButton.addEventListener('click', () => {
            // Toggle the display of the menu
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Optional: Close menu if clicked outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
                menu.style.display = 'none';
            }
        });