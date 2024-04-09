import Game from "./Game";

/**
 * Represents a game repository instance that allows to save, load and delete the game.
 */
export default class GameRepository {
    /**
     * Saves a game instance as encrypted JSON to local storage.
     * @param game The instance of Game class to save.
    */
    save(game: Game): void {
        const gameData = game.getGameData();
        const encodedData = btoa(JSON.stringify(gameData));
        localStorage.setItem('game', encodedData);
    }

    /**
     * Loads a game saved to local storage and decrypts it.
     * @returns An instance of Game class with the loaded game.
    */
    load(): Game {
        const encodedData = localStorage.getItem('game');
        if (encodedData === null) throw new Error('Error: No game saved.');

        try {
            const gameData = JSON.parse(atob(encodedData));

            const game = new Game(
                gameData.money,
                gameData.happiness,
                gameData.hunger,
                gameData.missions,
                gameData.enhancements,
                gameData.recoverHunger,
                gameData.loseHunger,
                gameData.recoverHappiness,
                gameData.loseHappiness,
                gameData.clickMoney,
                gameData.idleMoney,
                gameData.missionProgress
            );
            return game;
        } catch (error) {
            throw new Error('Error loading game.');
        }
    }

    /**
     * Deletes any saved game.
    */
    delete(): void {
        localStorage.removeItem('game');
    }
}

