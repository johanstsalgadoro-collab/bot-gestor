// ================================
// DATOS INICIALES
// ================================
let games = [
    {
        id: 1,
        name: "Cyber Arena",
        status: "online",
        players: 15420
    },
    {
        id: 2,
        name: "Battle Legends",
        status: "online",
        players: 8932
    },
    {
        id: 3,
        name: "Speed Racing X",
        status: "maintenance",
        players: 0
    },
    {
        id: 4,
        name: "Galaxy Warriors",
        status: "online",
        players: 12540
    },
    {
        id: 5,
        name: "Zombie World",
        status: "offline",
        players: 0
    },
    {
        id: 6,
        name: "Football Masters",
        status: "online",
        players: 18420
    }
];

// ================================
// OBTENER VIDEOJUEGOS
// ================================
export function getGames() {
    return games.map(game => ({ ...game }));
}

// ================================
// SIMULAR ACTUALIZACIÓN
// ================================
export function updateGames() {
    games = games.map(game => {
        if (game.status !== "online") {
            return game;
        }

        const variation =
            Math.floor(
                Math.random() * 1000
            ) - 500;

        let newPlayers =
            game.players + variation;

        if (newPlayers < 0) {
            newPlayers = 0;
        }

        return {
            ...game,
            players: newPlayers
        };
    });

    return getGames();
}
