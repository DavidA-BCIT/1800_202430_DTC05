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

        result_html<`div`>
        // JavaScript to toggle menu visibility
        document.getElementById('menuButton').addEventListener('click', () => {
            const menu = document.getElementById('menu');
    // Toggle the display of the menu
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });

        // Optional: Close the menu if clicked outside
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('menu');
    const menuButton = document.getElementById('menuButton');
    if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
        menu.style.display = 'none';
            }
        });
