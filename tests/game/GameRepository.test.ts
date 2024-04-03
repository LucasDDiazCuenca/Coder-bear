import { afterEach, describe, expect, it, beforeEach } from 'vitest';
import { render, fireEvent, cleanup } from "@testing-library/react";
import Game from '../../src/game/Game';
import GameRepository from '../../src/game/GameRepository';
import { getRandomEnhancementId, getRandomMissionId } from './helpers';
import { ENHANCEMENTS, MISSIONS, startingUpdateValues } from '../../src/game/constants';
import { JSDOM } from "jsdom";

// Set up JSDOM before running tests
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).document = jsdom.window.document;
(global as any).window = jsdom.window;

const localStorageMock = (() => {
   let store: { [key: string]: string } = {};

   const localStorageInstance: Storage = {
      getItem: function (key: string) {
         return store[key] || null;
      },
      get: function () {
         return store
      },
      setItem: function (key: string, value: string) {
         store[key] = value;
      },
      removeItem: function (key: string) {
         delete store[key];
      },
      clear: function () {
         store = {};
      },
      key: function (index: number) {
         return Object.keys(store)[index] || null;
      },
      get length() {
         return Object.keys(store).length;
      }
   };

   return localStorageInstance;
})();

global.localStorage = localStorageMock;

describe('Game Repository', () => {
   afterEach(() => {
      cleanup();
      localStorage.clear();
   }
   );

   it('saves game as json in local storage', () => {
      const game: Game = new Game();
      const gameData: object = game.getGameData();
      const gameJson: any = JSON.stringify(gameData)

      const repository = new GameRepository();

      repository.save(game);

      expect(localStorage.getItem('game')).toStrictEqual(gameJson);

   });

   it('retrieve correct data for created game as class game from local storage', () => {
      const newGame: Game = new Game(10, 10, 50, { '001': true, '002': false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);
      const gameJson: any = JSON.stringify(newGame.getGameData());
      localStorage.setItem('game', gameJson);

      const repository = new GameRepository();

      const game = repository.load();

      expect(game).toBeInstanceOf(Game);
      expect(game.money).toBe(10);
      expect(game.happiness).toBe(10);
      expect(game.hunger).toBe(50);
      expect(game.missions).toStrictEqual({ '001': true, '002': false });
      expect(game.enhancements).toStrictEqual(['001']);
      expect(game.recoverHunger).toBe(6);
      expect(game.loseHunger).toBe(0.8);
      expect(game.recoverHappiness).toBe(10);
      expect(game.loseHappiness).toBe(0.1);
      expect(game.clickMoney).toBe(8);
      expect(game.idleMoney).toBe(12);
      expect(game.missionProgress).toBe(15)
   });

   it('fails when no game to load', () => {
      const repository = new GameRepository();

      expect(() => repository.load()).toThrowError(
         /^Error loading game. No game saved.$/,
      )
   });

   it('deletes saved game in local storage', () => {
      const newGame: Game = new Game(10, 10, 50, { '001': true, '002': false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);
      const gameJson: any = JSON.stringify(newGame.getGameData());
      localStorage.setItem('game', gameJson);

      const repository = new GameRepository();

      repository.delete();

      expect(localStorage.get()).toStrictEqual({});

   });
});