import Game from "./Game";

/**
 * Represents a game repository instance that allows to save, load and delete the game.
*/
export default class GameRepository {

    /**
     * Saves a game instance as json to local storage.
     * @param game The instance of Game class to save.
    */
    save(game: Game): void {
        const gameData = game.getGameData();
        const jsonGame = JSON.stringify(gameData);
        try {
            localStorage.setItem('game', jsonGame);
        } catch (error) {
            console.error('Error saving data to local storage:', error);
        }
    }

    /**
     * Loads a game saved to local storage.
     * @returns An instance of Game class with the load game.
    */
    load(): Game {
        try {
            const jsonGame: any = localStorage.getItem('game');
            const gameData = JSON.parse(jsonGame);
            const game = new Game(gameData.money,
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
                gameData.missionProgress)
            return game;

        } catch (error: any) {
            throw new Error('Error loading game. No game saved.');
        }
    }

    /**
     * Deletes any saved game
    */
    delete(): void {
        localStorage.clear();
    }
}
