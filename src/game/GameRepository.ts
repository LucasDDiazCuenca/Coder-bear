import Game from "./Game";

export default class GameRepository {

    save(game: Game): void {
        const gameData = game.getGameData();
        const jsonGame = JSON.stringify(gameData);
        try {
            localStorage.setItem('game', jsonGame);
        } catch (error) {
            console.error('Error saving data to local storage:', error);
        }
    }

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

    delete(): void {
        localStorage.clear();
    }
}
