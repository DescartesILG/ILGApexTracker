const shipClassSelect = document.getElementById('ship-class');
const shipSelect = document.getElementById('ship');
const shipDisplay = document.getElementById('ship-display');

let currentData = {};

// Load ships when a class is selected
shipClassSelect.addEventListener('change', () => {
    const shipClass = shipClassSelect.value;
    shipSelect.innerHTML = '<option value="">--Select Ship--</option>';
    shipDisplay.innerHTML = '';

    if (!shipClass) return;

    fetch(`data/${shipClass}.json`)
        .then(response => response.json())
        .then(data => {
            currentData = data;
            Object.keys(data).forEach(ship => {
                const option = document.createElement('option');
                option.value = ship;
                option.textContent = ship;
                shipSelect.appendChild(option);
            });
        });
});

// Display ship data when a ship is selected
shipSelect.addEventListener('change', () => {
    const shipName = shipSelect.value;
    shipDisplay.innerHTML = '';

    if (!shipName) return;

    const variants = currentData[shipName];
    for (const variantName in variants) {
        const variant = variants[variantName];
        const tile = document.createElement('div');
        tile.className = 'ship-tile';
        tile.innerHTML = `<h3>${variantName}</h3>
            <table>
                <tr><th>Level</th><th>HP</th><th>Buffs</th></tr>
                ${Object.entries(variant).map(([level, info]) => {
                    return `<tr>
                        <td>${level}</td>
                        <td>${info.hp}</td>
                        <td>${info.buffs}</td>
                    </tr>`;
                }).join('')}
            </table>`;
        shipDisplay.appendChild(tile);
    }
});
