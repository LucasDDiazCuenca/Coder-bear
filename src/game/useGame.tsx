import { useEffect, useState } from 'react';
import Game from './Game';
import GameRepository from './GameRepository';
import { ENHANCEMENTS, MISSIONS } from './constants';

/**
 * A custom React hook for managing game state and operations.
 * This hook provides functionality to automatically save, load or create new game data, besides a function to delete game saved.
 * It also returns a Game instance, allowing to manage any update or act of gameplay.
 * It also exposes a complete lists of missions and enhancements available in the game.
 *
 * @returns An object containing game state and operations.
 */
const useGame = () => {
    // State variables
    const [game, setGame] = useState<Game | null>(null); // Current game state
    const gameRepository = new GameRepository(); // Repository for saving and loading game data

    // Constants
    const missionsList = MISSIONS; // List of missions available in the game
    const enhancementsList = ENHANCEMENTS; // List of enhancements available in the game

    /**
     * Save the current game state to the repository.
     * This function is triggered whenever the game state changes.
     */
    const saveGame = () => {
        if (game) {
            gameRepository.save(game);
        }
    };

    /**
     * Delete the current game state from the repository and reset game state to null.
     */
    const deleteGame = () => {
        gameRepository.delete();
        setGame(null);
    };

    /**
     * Effect to load the game state from the repository when the component mounts.
     * If no saved game is found, initializes a new game.
     */
    useEffect(() => {
        try {
            const loadedGame = gameRepository.load();
            setGame(loadedGame);
        } catch {
            const newGame = new Game(); // Initialize a new game if loading fails
            setGame(newGame);
        }
    }, []);

    /**
     * Effect to save the game state whenever it changes.
     * This ensures that the game state is persisted to the repository.
     */
    useEffect(() => {
        saveGame();
    }, [game]);

    // Return game and operations
    return {
        game, // Current game instance of Game
        deleteGame, // Function to delete the game
        missionsList, // List of missions available in the game
        enhancementsList // List of enhancements available in the game
    };
};

export default useGame;