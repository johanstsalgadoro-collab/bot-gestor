import {
    getGames
} from "./api.js";
import {
    startBot,
    stopBot
} from "./bot.js";

// =================================
// ELEMENTOS HTML
// =================================
const gamesContainer =
    document.getElementById(
        "gamesContainer"
    );

const alertsContainer =
    document.getElementById(
        "alertsContainer"
    );

const totalGames =
    document.getElementById(
        "totalGames"
    );

const onlineGames =
    document.getElementById(
        "onlineGames"
    );

const totalPlayers =
    document.getElementById(
        "totalPlayers"
    );

const totalAlerts =
    document.getElementById(
        "totalAlerts"
    );

const botStatus =
    document.getElementById(
        "botStatus"
    );

const lastUpdate =
    document.getElementById(
        "lastUpdate"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const startButton =
    document.getElementById(
        "startBot"
    );

const stopButton =
    document.getElementById(
        "stopBot"
    );

const themeButton =
    document.getElementById(
        "themeButton"
    );

// =================================
// VARIABLES
// =================================
let currentGames =
    getGames();

let alertCount = 0;

// =================================
// MOSTRAR VIDEOJUEGOS
// =================================
function renderGames(games) {
    gamesContainer.innerHTML = "";

    if (games.length === 0) {
        gamesContainer.innerHTML =
            "<p>No se encontraron videojuegos.</p>";
        return;
    }

    games.forEach(game => {
        const card =
            document.createElement(
                "div"
            );

        card.className =
            "game-card";

        card.innerHTML = `
            <h3>
                🎮 ${game.name}
            </h3>
            <p>
                Estado:
                <span class="status ${game.status}">
                    ${game.status}
                </span>
            </p>
            <p>
                👥 Jugadores:
                <strong>
                    ${game.players.toLocaleString()}
                </strong>
            </p>
            <p>
                ID:
                ${game.id}
            </p>
        `;

        gamesContainer.appendChild(
            card
        );
    });
}

// =================================
// ACTUALIZAR ESTADÍSTICAS
// =================================
function updateStatistics(games) {
    totalGames.textContent =
        games.length;

    const online =
        games.filter(
            game =>
                game.status === "online"
        ).length;

    onlineGames.textContent =
        online;

    const players =
        games.reduce(
            (total, game) =>
                total + game.players,
            0
        );

    totalPlayers.textContent =
        players.toLocaleString();

    totalAlerts.textContent =
        alertCount;
}

// =================================
// MOSTRAR ALERTAS
// =================================
function renderAlerts(alerts) {
    if (alerts.length === 0) {
        return;
    }

    const emptyMessage =
        alertsContainer.querySelector(
            ".empty"
        );

    if (emptyMessage) {
        emptyMessage.remove();
    }

    alerts.forEach(alert => {
        const element =
            document.createElement(
                "div"
            );

        element.className =
            "alert";

        element.textContent =
            alert.message;

        alertsContainer.prepend(
            element
        );

        alertCount++;
    });

    totalAlerts.textContent =
        alertCount;
}

// =================================
// ACTUALIZAR APLICACIÓN
// =================================
function updateApplication(
    games,
    alerts = []
) {
    currentGames =
        games;

    renderGames(
        currentGames
    );

    updateStatistics(
        currentGames
    );

    renderAlerts(
        alerts
    );

    const now =
        new Date();

    lastUpdate.textContent =
        now.toLocaleTimeString();
}

// =================================
// INICIAR BOT
// =================================
startButton.addEventListener(
    "click",
    () => {
        startBot(
            updateApplication
        );

        botStatus.textContent =
            " Bot ejecutándose";

        botStatus.style.color =
            "green";
    }
);

// =================================
// DETENER BOT
// =================================
stopButton.addEventListener(
    "click",
    () => {
        stopBot();

        botStatus.textContent =
            " Bot detenido";

        botStatus.style.color =
            "red";
    }
);

// =================================
// BUSCADOR
// =================================
searchInput.addEventListener(
    "input",
    event => {
        const search =
            event.target.value
                .toLowerCase();

        const filtered =
            currentGames.filter(
                game =>
                    game.name
                        .toLowerCase()
                        .includes(search)
            );

        renderGames(
            filtered
        );
    }
);

// =================================
// MODO OSCURO
// =================================
themeButton.addEventListener(
    "click",
    () => {
        document.body.classList.toggle(
            "dark"
        );

        const dark =
            document.body.classList.contains(
                "dark"
            );

        themeButton.textContent =
            dark
                ? "☀️ Modo claro"
                : "🌙 Modo oscuro";

        localStorage.setItem(
            "darkMode",
            dark
        );
    }
);

// =================================
// RECUPERAR TEMA
// =================================
const savedTheme =
    localStorage.getItem(
        "darkMode"
    );

if (savedTheme === "true") {
    document.body.classList.add(
        "dark"
    );

    themeButton.textContent =
        "☀️ Modo claro";
}

// =================================
// INICIALIZAR
// =================================
updateApplication(
    currentGames
);
