import {
    getGames,
    updateGames
} from "./api.js";

let botInterval = null;

function generateAlerts(previousGames, updatedGames) {
    const alerts = [];

    updatedGames.forEach(game => {
        const previous = previousGames.find(
            item => item.id === game.id
        );

        if (!previous || game.status !== "online") {
            return;
        }

        const difference = game.players - previous.players;

        if (Math.abs(difference) >= 300) {
            if (difference > 0) {
                alerts.push({
                    message: `BOT: ${game.name} aumentó ${difference.toLocaleString()} jugadores.`
                });
            } else {
                alerts.push({
                    message: `ALERTA: Se detectó una caída de ${Math.abs(difference).toLocaleString()} jugadores en ${game.name}.`
                });
            }
        }
    });

    return alerts;
}

function runMonitoringCycle(onUpdate) {
    const previousGames = getGames();
    const updatedGames = updateGames();
    const alerts = generateAlerts(
        previousGames,
        updatedGames
    );

    onUpdate(
        updatedGames,
        alerts
    );
}

export function startBot(onUpdate) {
    if (botInterval !== null) {
        return;
    }

    runMonitoringCycle(onUpdate);

    botInterval = setInterval(() => {
        runMonitoringCycle(onUpdate);
    }, 10000);
}

export function stopBot() {
    if (botInterval !== null) {
        clearInterval(botInterval);
        botInterval = null;
    }
}
