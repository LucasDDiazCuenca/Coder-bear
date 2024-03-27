import { afterEach, describe, expect, it } from 'vitest';
import { cleanup } from "@testing-library/react";
import Game from '../../src/game/Game';
import { getRandomMissionId } from './helpers';
import { MISSIONS } from '../../src/game/constants';

describe('Initialize Game', () => {
   afterEach(cleanup);

   it('initializes with correct predeterminate properties a new Game', () => {
      const game: Game = new Game();
      expect(game.money).toBe(50);
      expect(game.happiness).toBe(90);
      expect(game.hunger).toBe(100);
      expect(game.missions).toStrictEqual({});
      expect(game.enhancements).toStrictEqual({});
   });

   it('initializes with correct transfered properties a previous Game', () => {
      const game: Game = new Game(10, 10, 50, { '001': true, '002': false }, { '001': true, '002': true });
      expect(game.money).toBe(10);
      expect(game.happiness).toBe(10);
      expect(game.hunger).toBe(50);
      expect(game.missions).toStrictEqual({ '001': true, '002': false });
      expect(game.enhancements).toStrictEqual({ '001': true, '002': true });
   });

   it('fails with incorrect money value (<0)', () => {
      expect(() => new Game(-10, 50, 50, { '001': true, '002': false }, { '001': true, '002': true })).toThrowError(
         /^Invalid arguments. Argument 'money' should be equal or higher than 0.$/,
      )
   });

   it('fails with incorrect happiness value (<0)', () => {
      expect(() => new Game(10, -50, 50, { '001': true, '002': false }, { '001': true, '002': true })).toThrowError(
         /^Invalid arguments. Argument 'happiness' should be between 0 and 100.$/,
      )
   });

   it('fails with incorrect happiness value (>100)', () => {
      expect(() => new Game(10, 150, 50, { '001': true, '002': false }, { '001': true, '002': true })).toThrowError(
         /^Invalid arguments. Argument 'happiness' should be between 0 and 100.$/,
      )
   });

   it('fails with incorrect hunger value (<0)', () => {
      expect(() => new Game(10, 50, -50, { '001': true, '002': false }, { '001': true, '002': true })).toThrowError(
         /^Invalid arguments. Argument 'hunger' should be between 0 and 100.$/,
      )
   });

   it('fails with incorrect hunger value (>100)', () => {
      expect(() => new Game(10, 50, 150, { '001': true, '002': false }, { '001': true, '002': true })).toThrowError(
         /^Invalid arguments. Argument 'hunger' should be between 0 and 100.$/,
      )
   });
});

describe('Update Game Money', () => {
   afterEach(cleanup);

   it('adds correct amount of money', () => {
      const game: Game = new Game(150, 50, 50, {}, {});
      game.updateMoney(10)

      expect(game.money).toBe(160);
   });

   it('removes correct amount of money', () => {
      const game: Game = new Game(150, 50, 50, {}, {});
      game.updateMoney(-10)

      expect(game.money).toBe(140);
   });

   it('fails with money to remove higher than money available', () => {
      const game: Game = new Game(150, 50, 50, {}, {});
      expect(() => game.updateMoney(-190)).toThrowError(
         /^Invalid operation. Money can not be less than 0.$/,
      )
   });

});

describe('Update Game Happiness', () => {
   afterEach(cleanup);

   it('adds correct amount of happiness', () => {
      const game: Game = new Game(90, 50, 90, {}, {});
      game.updateHappiness(10)

      expect(game.happiness).toBe(60);
   });

   it('removes correct amount of happiness', () => {
      const game: Game = new Game(90, 50, 90, {}, {});
      game.updateHappiness(-10)

      expect(game.happiness).toBe(40);
   });

   it('returns 0 happiness if negative update value is higher than previous happiness', () => {
      const game: Game = new Game(90, 50, 90, {}, {});
      game.updateHappiness(-90)

      expect(game.happiness).toBe(0);
   });

   it('returns 100 happiness if update value hits max happiness value', () => {
      const game: Game = new Game(90, 50, 90, {}, {});
      game.updateHappiness(90)

      expect(game.happiness).toBe(100);
   });

});

describe('Update Game Hunger', () => {
   afterEach(cleanup);

   it('adds correct amount of hunger', () => {
      const game: Game = new Game(90, 90, 50, {}, {});
      game.updateHunger(10)

      expect(game.hunger).toBe(60);
   });

   it('removes correct amount of hunger', () => {
      const game: Game = new Game(90, 90, 50, {}, {});
      game.updateHunger(-10)

      expect(game.hunger).toBe(40);
   });

   it('returns 0 hunger if negative update value is higher than previous hunger', () => {
      const game: Game = new Game(90, 90, 50, {}, {});
      game.updateHunger(-90)

      expect(game.hunger).toBe(0);
   });

   it('returns 100 hunger if update value hits max hunger value', () => {
      const game: Game = new Game(90, 90, 50, {}, {});
      game.updateHunger(90)

      expect(game.hunger).toBe(100);
   });

});

describe('Update Game Missions', () => {
   afterEach(cleanup);

   it('adds correct new mission in progress to missions object', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(90, 90, 50, {}, {});
      game.updateMissions(randomMission);

      const expectedMissions: { [key: string]: boolean } = {};
      expectedMissions[randomMission] = false;

      expect(game.missions).toStrictEqual(expectedMissions);
   });

   it('completes the correct mission and updates its reward when mission was in progress', () => {
      const randomMission: string = getRandomMissionId();
      const reward: any = MISSIONS.find(mission => mission.id === randomMission)?.reward;
      const game: Game = new Game(0, 0, 10, { [randomMission]: false }, {});
      game.updateMissions(randomMission);

      const updatedMoney = reward.type === 'money' ? reward.value : 0;
      const updatedHappiness = reward.type === 'happiness' ? reward.value : 0;

      const expectedMissions: { [key: string]: boolean } = {};
      expectedMissions[randomMission] = true;

      expect(game.missions).toStrictEqual(expectedMissions);
      expect(game.money).toBe(updatedMoney);
      expect(game.happiness).toBe(updatedHappiness);
   });

   it('fails when trying to update a complete mission', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(90, 90, 50, { [randomMission]: true }, {});

      expect(() => game.updateMissions(randomMission)).toThrowError(
         /^Invalid operation. Mission is already complete.$/,
      )
   });

   it('fails when trying to update a mission that does not exist', () => {
      const game: Game = new Game(90, 90, 50, {}, {});

      expect(() => game.updateMissions('NOT A REAL MISSION ID')).toThrowError(
         /^Invalid operation. Mission does not exist.$/,
      )
   });
});