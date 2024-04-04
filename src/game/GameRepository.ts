import Game from "./Game";
import crypto from "crypto";

/**
 * Represents a game repository instance that allows to save, load and delete the game.
 */
export default class GameRepository {
    constructor(private key: Buffer, private iv: Buffer) { }

    private serializeKeyAndIV(): string {
        return JSON.stringify({
            k: this.key.toString('hex'),
            i: this.iv.toString('hex')
        });
    }

    private deserializeKeyAndIV(serialized: string): { key: Buffer, iv: Buffer } {
        const { k, i } = JSON.parse(serialized);
        return {
            key: Buffer.from(k, 'hex'),
            iv: Buffer.from(i, 'hex')
        };
    }

    /**
     * Saves a game instance as encrypted JSON to local storage.
     * @param game The instance of Game class to save.
    */
    save(game: Game): void {
        const gameData = game.getGameData();
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        let data = cipher.update(JSON.stringify(gameData), 'utf-8', 'hex');
        data += cipher.final('hex');
        const settings = this.serializeKeyAndIV();
        localStorage.setItem('game', JSON.stringify({ settings, data }));
    }

    /**
     * Loads a game saved to local storage and decrypts it.
     * @returns An instance of Game class with the loaded game.
    */
    load(): Game {
        try {
            const { settings, data } = JSON.parse(localStorage.getItem('game') || '');
            if (!settings || !data) throw new Error('No game saved.');

            const { key, iv } = this.deserializeKeyAndIV(settings);
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decryptedData = decipher.update(data, 'hex', 'utf-8');
            decryptedData += decipher.final('utf-8');
            const gameData = JSON.parse(decryptedData);
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
