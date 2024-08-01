// Utility function to initialize players
function initializePlayers(playerNames) {
    const players = {};
    playerNames.forEach(player => {
        players[player] = { points: 0, difference: 0 };
    });
    return players;
}

// Start FIFA Tournament
function startFifaTournament() {
    const playerNames = document.getElementById('fifa-players').value.split(',').map(name => name.trim());
    if (playerNames.length !== 8) {
        alert('Please enter exactly 8 player names.');
        return;
    }
    localStorage.setItem('fifaPlayers', JSON.stringify(initializePlayers(playerNames)));
    generateFifaMatches(playerNames);
    updateFifaLeaderboard();
}

// Generate FIFA Matches
function generateFifaMatches(playerNames) {
    const matchesContainer = document.getElementById('fifa-match-list');
    matchesContainer.innerHTML = '';
    let matchNumber = 1;
    for (let i = 0; i < playerNames.length; i++) {
        for (let j = i + 1; j < playerNames.length; j++) {
            matchesContainer.innerHTML += `
                <div class="match">
                    <p>Match #${matchNumber}: ${playerNames[i]} vs ${playerNames[j]}</p>
                    <select onchange="updateFifaResult('${playerNames[i]}', '${playerNames[j]}', this.value)">
                        <option value="">Select Winner</option>
                        <option value="${playerNames[i]}">${playerNames[i]}</option>
                        <option value="${playerNames[j]}">${playerNames[j]}</option>
                    </select>
                </div>
            `;
            matchNumber++;
        }
    }
}

// Update FIFA Result
function updateFifaResult(player1, player2, winner) {
    const players = JSON.parse(localStorage.getItem('fifaPlayers'));
    if (winner === player1) {
        players[player1].points += 1;
        players[player1].difference += 1;
        players[player2].difference -= 1;
    } else if (winner === player2) {
        players[player2].points += 1;
        players[player2].difference += 1;
        players[player1].difference -= 1;
    }
    localStorage.setItem('fifaPlayers', JSON.stringify(players));
    updateFifaLeaderboard();
}

// Update FIFA Leaderboard
function updateFifaLeaderboard() {
    const leaderboardTable = document.getElementById('fifa-leaderboard-table').querySelector('tbody');
    const players = JSON.parse(localStorage.getItem('fifaPlayers'));
    const playerNames = Object.keys(players).sort((a, b) => players[b].points - players[a].points || players[b].difference - players[a].difference);
    leaderboardTable.innerHTML = '';
    playerNames.forEach(player => {
        leaderboardTable.innerHTML += `
            <tr>
                <td>${player}</td>
                <td>${players[player].points}</td>
                <td>${players[player].difference}</td>
            </tr>
        `;
    });
}

// Start Rocket League Tournament
function startRocketLeagueTournament() {
    const playerNames = document.getElementById('rocket-players').value.split(',').map(name => name.trim());
    if (playerNames.length !== 8) {
        alert('Please enter exactly 8 player names.');
        return;
    }
    localStorage.setItem('rocketLeaguePlayers', JSON.stringify(initializePlayers(playerNames)));
    generateRocketLeagueMatches(playerNames);
    updateRocketLeagueLeaderboard();
}

// Generate Rocket League Matches
function generateRocketLeagueMatches(playerNames) {
    const matchesContainer = document.getElementById('rocket-league-match-list');
    matchesContainer.innerHTML = '';
    let matchNumber = 1;
    for (let i = 0; i < playerNames.length; i++) {
        for (let j = i + 1; j < playerNames.length; j++) {
            matchesContainer.innerHTML += `
                <div class="match">
                    <p>Match #${matchNumber}: ${playerNames[i]} vs ${playerNames[j]}</p>
                    <select onchange="updateRocketLeagueResult('${playerNames[i]}', '${playerNames[j]}', this.value)">
                        <option value="">Select Winner</option>
                        <option value="${playerNames[i]}">${playerNames[i]}</option>
                        <option value="${playerNames[j]}">${playerNames[j]}</option>
                    </select>
                </div>
            `;
            matchNumber++;
        }
    }
}

// Update Rocket League Result
function updateRocketLeagueResult(player1, player2, winner) {
    const players = JSON.parse(localStorage.getItem('rocketLeaguePlayers'));
    if (winner === player1) {
        players[player1].points += 1;
        players[player1].difference += 1;
        players[player2].difference -= 1;
    } else if (winner === player2) {
        players[player2].points += 1;
        players[player2].difference += 1;
        players[player1].difference -= 1;
    }
    localStorage.setItem('rocketLeaguePlayers', JSON.stringify(players));
    updateRocketLeagueLeaderboard();
}

// Update Rocket League Leaderboard
function updateRocketLeagueLeaderboard() {
    const leaderboardTable = document.getElementById('rocket-league-leaderboard-table').querySelector('tbody');
    const players = JSON.parse(localStorage.getItem('rocketLeaguePlayers'));
    const playerNames = Object.keys(players).sort((a, b) => players[b].points - players[a].points || players[b].difference - players[a].difference);
    leaderboardTable.innerHTML = '';
    playerNames.forEach(player => {
        leaderboardTable.innerHTML += `
            <tr>
                <td>${player}</td>
                <td>${players[player].points}</td>
                <td>${players[player].difference}</td>
            </tr>
        `;
    });
}
