import { afterEach, describe, expect, it } from 'vitest';
import { cleanup } from '@testing-library/react';
import Game from '../../src/game/Game';
import { getRandomEnhancementId, getRandomMissionId } from './helpers';
import { ENHANCEMENTS, MISSIONS, startingUpdateValues } from '../../src/game/constants';

describe('Initialize Game', () => {
   afterEach(cleanup);

   it('initializes with correct predeterminate properties a new Game', () => {
      const game: Game = new Game();
      expect(game.money).toBe(50);
      expect(game.happiness).toBe(90);
      expect(game.hunger).toBe(100);
      expect(game.missions).toStrictEqual({});
      expect(game.enhancements).toStrictEqual([]);
      expect(game.recoverHunger).toBe(startingUpdateValues['recover-hunger']);
      expect(game.loseHunger).toBe(startingUpdateValues['lose-hunger']);
      expect(game.recoverHappiness).toBe(startingUpdateValues['recover-happiness']);
      expect(game.loseHappiness).toBe(startingUpdateValues['lose-happiness']);
      expect(game.clickMoney).toBe(startingUpdateValues['click-money']);
      expect(game.idleMoney).toBe(startingUpdateValues['idle-money']);
      expect(game.missionProgress).toBe(0);
   });

   it('initializes with correct transfered properties a previous Game', () => {
      const game: Game = new Game(10, 10, 50, { '001': true, '002': false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);
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

   it('fails with incorrect money value (<0)', () => {
      expect(() => new Game(-10, 50, 50)).toThrowError(
         /^Invalid arguments. Argument 'money' should be equal or higher than 0.$/,
      )
   });

   it('fails with incorrect mission progress value (<0)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, -15)).toThrowError(
         /^Invalid arguments. Argument 'mission-progress' should be equal or higher than 0.$/,
      )
   });

   it('fails with incorrect happiness value (<0)', () => {
      expect(() => new Game(10, -50, 50)).toThrowError(
         /^Invalid arguments. Argument 'happiness' should be between 0 and 100.$/,
      )
   });

   it('fails with incorrect happiness value (>100)', () => {
      expect(() => new Game(10, 150, 50)).toThrowError(
         /^Invalid arguments. Argument 'happiness' should be between 0 and 100.$/,
      )
   });

   it('fails with incorrect hunger value (<0)', () => {
      expect(() => new Game(10, 50, -50)).toThrowError(
         /^Invalid arguments. Argument 'hunger' should be between 0 and 100.$/,
      )
   });

   it('fails with incorrect hunger value (>100)', () => {
      expect(() => new Game(10, 50, 150)).toThrowError(
         /^Invalid arguments. Argument 'hunger' should be between 0 and 100.$/,
      )
   });

   it('fails with incorrect recover-hunger value (<Start)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 0.01, 0.8, 10, 0.1, 8, 12)).toThrowError(
         /^Invalid arguments. Argument 'recover-hunger' should be equal or higher than starting value.$/,
      )
   });

   it('fails with incorrect recover-hunger value (>Max)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 106, 0.8, 10, 0.1, 8, 12)).toThrowError(
         /^Invalid arguments. Argument 'recover-hunger' should be equal or lower than max value.$/,
      )
   });

   it('fails with incorrect lose-hunger value (>Start)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 8, 10, 0.1, 8, 12)).toThrowError(
         /^Invalid arguments. Argument 'lose-hunger' should be equal or lower starting value.$/,
      )
   });

   it('fails with incorrect lose-hunger value (<Max)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0, 10, 0.1, 8, 12)).toThrowError(
         /^Invalid arguments. Argument 'lose-hunger' should be equal or higher than max value.$/,
      )
   });

   it('fails with incorrect recover-happiness value (<Start)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 1, 0.8, 1, 0.1, 8, 12)).toThrowError(
         /^Invalid arguments. Argument 'recover-happiness' should be equal or higher than starting value.$/,
      )
   });

   it('fails with incorrect recover-happiness value (>Max)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 110, 0.1, 8, 12)).toThrowError(
         /^Invalid arguments. Argument 'recover-happiness' should be equal or lower than max value.$/,
      )
   });

   it('fails with incorrect lose-happiness value (>Start)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 10, 10, 8, 12)).toThrowError(
         /^Invalid arguments. Argument 'lose-happiness' should be equal or lower starting value.$/,
      )
   });

   it('fails with incorrect lose-happiness value (<Max)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 10, 0, 8, 12)).toThrowError(
         /^Invalid arguments. Argument 'lose-happiness' should be equal or higher than max value.$/,
      )
   });

   it('fails with incorrect click-money value (<Start)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 8, 0.18, 0, 12)).toThrowError(
         /^Invalid arguments. Argument 'click-money' should be equal or higher starting value.$/,
      )
   });

   it('fails with incorrect idle-money value (<Start)', () => {
      expect(() => new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 8, 0.18, 10, -12)).toThrowError(
         /^Invalid arguments. Argument 'idle-money' should be equal or higher starting value.$/,
      )
   });
});

describe('Update Game Money', () => {
   afterEach(cleanup);

   it('adds correct amount of money', () => {
      const game: Game = new Game(150, 50, 50, {}, []);
      game.updateMoney(10)

      expect(game.money).toBe(160);
   });

   it('removes correct amount of money', () => {
      const game: Game = new Game(150, 50, 50, {}, []);
      game.updateMoney(-10)

      expect(game.money).toBe(140);
   });

   it('fails with money to remove higher than money available', () => {
      const game: Game = new Game(150, 50, 50, {}, []);
      expect(() => game.updateMoney(-190)).toThrowError(
         /^Invalid operation. Money can not be less than 0.$/,
      )
   });

});

describe('Update Game Happiness', () => {
   afterEach(cleanup);

   it('adds correct amount of happiness', () => {
      const game: Game = new Game(90, 50, 90, {}, []);
      game.updateHappiness(10)

      expect(game.happiness).toBe(60);
   });

   it('removes correct amount of happiness', () => {
      const game: Game = new Game(90, 50, 90, {}, []);
      game.updateHappiness(-10)

      expect(game.happiness).toBe(40);
   });

   it('returns 0 happiness if negative update value is higher than previous happiness', () => {
      const game: Game = new Game(90, 50, 90, {}, []);
      game.updateHappiness(-90)

      expect(game.happiness).toBe(0);
   });

   it('returns 100 happiness if update value hits max happiness value', () => {
      const game: Game = new Game(90, 50, 90, {}, []);
      game.updateHappiness(90)

      expect(game.happiness).toBe(100);
   });

});

describe('Update Game Hunger', () => {
   afterEach(cleanup);

   it('adds correct amount of hunger', () => {
      const game: Game = new Game(90, 90, 50, {}, []);
      game.updateHunger(10)

      expect(game.hunger).toBe(60);
   });

   it('removes correct amount of hunger', () => {
      const game: Game = new Game(90, 90, 50, {}, []);
      game.updateHunger(-10)

      expect(game.hunger).toBe(40);
   });

   it('returns 0 hunger if negative update value is higher than previous hunger', () => {
      const game: Game = new Game(90, 90, 50, {}, []);
      game.updateHunger(-90)

      expect(game.hunger).toBe(0);
   });

   it('returns 100 hunger if update value hits max hunger value', () => {
      const game: Game = new Game(90, 90, 50, {}, []);
      game.updateHunger(90)

      expect(game.hunger).toBe(100);
   });

});

describe('Update Game recover-hunger', () => {
   afterEach(cleanup);

   it('adds correct amount of recover-hunger', () => {
      const game: Game = new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 8, 0.18, 10, 12);

      game.updateRecoverHunger(50);

      expect(game.recoverHunger).toBe(56);
   });

   it('fails if value to add is <= 0', () => {
      const game: Game = new Game();

      expect(() => game.updateRecoverHunger(-50)).toThrowError(
         /^Invalid operation. Value is not valid.$/,
      )
   });

   it('fails if update value becomes higher than max', () => {
      const game: Game = new Game();

      expect(() => game.updateRecoverHunger(1000)).toThrowError(
         /^Invalid operation. Value will overpass max.$/,
      )
   });

});

describe('Update Game lose-hunger', () => {
   afterEach(cleanup);

   it('adds correct amount of lose-hunger', () => {
      const game: Game = new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 8, 0.18, 10, 12);

      game.updateLoseHunger(0.01);

      expect(game.loseHunger).toBe(0.79);
   });

   it('fails if value to add is <= 0', () => {
      const game: Game = new Game();

      expect(() => game.updateLoseHunger(-50)).toThrowError(
         /^Invalid operation. Value is not valid.$/,
      )
   });

   it('fails if update value becomes higher than max', () => {
      const game: Game = new Game();

      expect(() => game.updateLoseHunger(1000)).toThrowError(
         /^Invalid operation. Value will overpass max.$/,
      )
   });

});

describe('Update Game recover-happiness', () => {
   afterEach(cleanup);

   it('adds correct amount of recover-happiness', () => {
      const game: Game = new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 8, 0.18, 10, 12);

      game.updateRecoverHappiness(2);

      expect(game.recoverHappiness).toBe(10);
   });

   it('fails if value to add is <= 0', () => {
      const game: Game = new Game();

      expect(() => game.updateRecoverHappiness(-50)).toThrowError(
         /^Invalid operation. Value is not valid.$/,
      )
   });

   it('fails if update value becomes higher than max', () => {
      const game: Game = new Game();

      expect(() => game.updateRecoverHappiness(1000)).toThrowError(
         /^Invalid operation. Value will overpass max.$/,
      )
   });

});

describe('Update Game lose-happiness', () => {
   afterEach(cleanup);

   it('adds correct amount of lose-happiness', () => {
      const game: Game = new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 8, 0.1, 10, 12);

      game.updateLoseHappiness(0.05);

      expect(game.loseHappiness).toBe(0.05);
   });

   it('fails if value to add is <= 0', () => {
      const game: Game = new Game();

      expect(() => game.updateLoseHappiness(-50)).toThrowError(
         /^Invalid operation. Value is not valid.$/,
      )
   });

   it('fails if update value becomes higher than max', () => {
      const game: Game = new Game();

      expect(() => game.updateLoseHappiness(1000)).toThrowError(
         /^Invalid operation. Value will overpass max.$/,
      )
   });

});

describe('Update Game click-money', () => {
   afterEach(cleanup);

   it('adds correct amount of click-money', () => {
      const game: Game = new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 8, 0.1, 10, 12);

      game.updateClickMoney(10);

      expect(game.clickMoney).toBe(20);
   });

   it('fails if value to add is <= 0', () => {
      const game: Game = new Game();

      expect(() => game.updateClickMoney(-50)).toThrowError(
         /^Invalid operation. Value is not valid.$/,
      )
   });

});

describe('Update Game idle-money', () => {
   afterEach(cleanup);

   it('adds correct amount of idle-money', () => {
      const game: Game = new Game(10, 10, 50, { '001': true, '002': false }, [], 6, 0.8, 8, 0.1, 10, 12);

      game.updateIdleMoney(12);

      expect(game.idleMoney).toBe(24);
   });

   it('fails if value to add is <= 0', () => {
      const game: Game = new Game();

      expect(() => game.updateIdleMoney(-50)).toThrowError(
         /^Invalid operation. Value is not valid.$/,
      )
   });

});

describe('Update Game mission-progress', () => {
   afterEach(cleanup);

   it('adds correct amount of progress', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 50, { [randomMission]: false }, [], 6, 0.8, 8, 0.1, 10, 12, 1);

      game.updateMissionProgress(2);

      expect(game.missionProgress).toBe(3);
      expect(game.missions).toStrictEqual({ [randomMission]: false });
   });

   it('resets progress and completes mission when goal achieved', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 50, { [randomMission]: false }, [], 6, 0.8, 8, 0.1, 10, 12, 1);
      const mission = MISSIONS.find(_mission => _mission.id === randomMission);

      if (mission) game.updateMissionProgress(mission.goal);

      expect(game.missionProgress).toBe(0);
      expect(game.missions).toStrictEqual({ [randomMission]: true });
   });

   it('fails if value to add is <= 0', () => {
      const game: Game = new Game();

      expect(() => game.updateMissionProgress(-50)).toThrowError(
         /^Invalid operation. Value is not valid.$/,
      )
   });

   it('fails if there is no mission in progress', () => {
      const game: Game = new Game();

      expect(() => game.updateMissionProgress(5)).toThrowError(
         /^Invalid operation. No mission in progress.$/,
      )
   });

});

describe('Update Game Missions', () => {
   afterEach(cleanup);

   it('adds correct new mission in progress to missions object', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(90, 90, 50, {}, []);
      game.updateMissions(randomMission);

      const expectedMissions: { [key: string]: boolean } = {};
      expectedMissions[randomMission] = false;

      expect(game.missions).toStrictEqual(expectedMissions);
   });

   it('completes the correct mission and updates its reward when mission was in progress', () => {
      const randomMission: string = getRandomMissionId();
      const reward: any = MISSIONS.find(mission => mission.id === randomMission)?.reward;
      const game: Game = new Game(0, 0, 10, { [randomMission]: false }, []);
      game.updateMissions(randomMission);

      const updatedMoney = reward.type === 'money' ? reward.value : 0;
      const updatedHappiness = reward.type === 'happiness' ? reward.value : 0;

      const expectedMissions: { [key: string]: boolean } = {};
      expectedMissions[randomMission] = true;

      expect(game.missions).toStrictEqual(expectedMissions);
      expect(game.money).toBe(updatedMoney);
      expect(game.happiness).toBe(updatedHappiness);
      expect(game.missionProgress).toBe(0);
   });

   it('fails when trying to update a complete mission', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(90, 90, 50, { [randomMission]: true }, []);

      expect(() => game.updateMissions(randomMission)).toThrowError(
         /^Invalid operation. Mission is already complete.$/,
      )
   });


   it('fails when trying to start a new mission while on another one', () => {
      const randomMission: string = getRandomMissionId();
      let randomMission2: string = getRandomMissionId();
      while (randomMission2 === randomMission) {
         randomMission2 = getRandomMissionId()
      }
      const game: Game = new Game(90, 90, 50, { [randomMission]: false }, []);

      expect(() => game.updateMissions(randomMission2)).toThrowError(
         /^Invalid operation. Another mission is already active.$/,
      )

   });

   it('fails when trying to update a mission that does not exist', () => {
      const game: Game = new Game(90, 90, 50, {}, []);

      expect(() => game.updateMissions('NOT A REAL MISSION ID')).toThrowError(
         /^Invalid operation. Mission does not exist.$/,
      )
   });
});

describe('Delete Game Mission', () => {
   afterEach(cleanup);

   it('deletes correct mission in progress', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 50, { [randomMission]: false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      game.deleteMission(randomMission);

      const expectedMissions: object = {};

      expect(game.missions).toStrictEqual(expectedMissions);
      expect(game.missionProgress).toBe(0)
   });

   it('fails when trying to delete a complete mission', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(90, 90, 50, { [randomMission]: true }, []);

      expect(() => game.deleteMission(randomMission)).toThrowError(
         /^Invalid operation. Mission is already complete.$/,
      )
   });


   it('fails when trying to delete a not started mission', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game();

      expect(() => game.deleteMission(randomMission)).toThrowError(
         /^Invalid operation. Mission is not active.$/,
      )


   });

   it('fails when trying to update a mission that does not exist', () => {
      const game: Game = new Game(90, 90, 50, {}, []);

      expect(() => game.updateMissions('NOT A REAL MISSION ID')).toThrowError(
         /^Invalid operation. Mission does not exist.$/,
      )
   });
});

describe('Update Game Enhancements', () => {
   afterEach(cleanup);

   it('adds correct new enhancement in progress to enhancement array and updates its effect', () => {
      const randomEnhancement: string = getRandomEnhancementId();
      const game: Game = new Game(90, 90, 50, {}, []);
      const effect: any = ENHANCEMENTS.find(enhancement => enhancement.id === randomEnhancement)?.effect;

      const recoverHunger = effect.type === 'recover-hunger' ? game.recoverHunger + effect.value : game.recoverHunger;
      const loseHunger = effect.type === 'lose-hunger' ? game.loseHunger - effect.value : game.loseHunger;
      const recoverHappiness = effect.type === 'recover-happiness' ? game.recoverHappiness + effect.value : game.recoverHappiness;
      const loseHappiness = effect.type === 'lose-happiness' ? game.loseHappiness - effect.value : game.loseHappiness;
      const clickMoney = effect.type === 'click-money' ? game.clickMoney + effect.value : game.clickMoney;
      const idleMoney = effect.type === 'idle-money' ? game.idleMoney + effect.value : game.idleMoney;

      game.updateEnhancements(randomEnhancement);

      const expectedEnhancements: Array<String> = [randomEnhancement];

      expect(game.enhancements).toStrictEqual(expectedEnhancements);
      expect(game.recoverHunger).toBe(recoverHunger);
      expect(game.loseHunger).toBe(loseHunger);
      expect(game.recoverHappiness).toBe(recoverHappiness);
      expect(game.loseHappiness).toBe(loseHappiness);
      expect(game.clickMoney).toBe(clickMoney);
      expect(game.idleMoney).toBe(idleMoney);
   });

   it('fails when trying to update an already unlocked enhancement', () => {
      const randomEnhancement: string = getRandomEnhancementId();
      const game: Game = new Game(90, 90, 50, {}, [randomEnhancement]);

      expect(() => game.updateEnhancements(randomEnhancement)).toThrowError(
         /^Invalid operation. Enhancement is already unlocked.$/,
      )
   });
});

describe('Game On Click', () => {
   afterEach(cleanup);

   it('updates stats correctly after clicking with no mission active', () => {
      const game: Game = new Game(10, 10, 50);

      game.gameOnClick();

      expect(game.hunger).toBe(50 - startingUpdateValues['lose-hunger']);
      expect(game.happiness).toBe(10 - startingUpdateValues['lose-happiness']);
      expect(game.money).toBe(10 + startingUpdateValues['click-money']);
   });

   it('updates stats correctly (half) if unhappy after clicking with no mission active', () => {
      const game: Game = new Game(10, 0, 50);

      game.gameOnClick();

      expect(game.hunger).toBe(50 - startingUpdateValues['lose-hunger']);
      expect(game.happiness).toBe(0);
      expect(game.money).toBe(10 + (startingUpdateValues['click-money'] / 2));
   });

   it('updates stats correctly after clicking with a mission active', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 50, { [randomMission]: false });

      const mission = MISSIONS.find(_mission => _mission.id === randomMission);
      const goal: number = mission ? mission.goal : 0;

      const expectedMissions: { [key: string]: boolean } = {};
      expectedMissions[randomMission] = goal <= game.clickMoney;
      const expectedMissionProgress: number = goal <= game.clickMoney ? 0 : game.clickMoney

      game.gameOnClick();

      expect(game.hunger).toBe(50 - game.loseHunger);
      expect(game.happiness).toBe(10 - game.loseHappiness);
      expect(game.missionProgress).toBe(expectedMissionProgress);
      expect(game.missions).toStrictEqual(expectedMissions);
   });

   it('updates stats correctly (half) if unhappy after clicking with a mission active', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 0, 50, { [randomMission]: false });

      const mission = MISSIONS.find(_mission => _mission.id === randomMission);
      const goal: number = mission ? mission.goal : 0;

      const expectedMissions: { [key: string]: boolean } = {};
      expectedMissions[randomMission] = goal <= game.clickMoney / 2;
      const expectedMissionProgress: number = goal <= game.clickMoney / 2 ? 0 : game.clickMoney / 2

      game.gameOnClick();

      expect(game.hunger).toBe(50 - game.loseHunger);
      expect(game.happiness).toBe(0);
      expect(game.missionProgress).toBe(expectedMissionProgress);
      expect(game.missions).toStrictEqual(expectedMissions);
   });

   it('fails when trying to click with hunger === 0', () => {
      const game: Game = new Game(90, 90, 0);

      expect(() => game.gameOnClick()).toThrowError(
         /^Invalid operation. Not available with hunger === 0.$/,
      )
   });
});

describe('Game On Idle', () => {
   afterEach(cleanup);

   it('updates stats correctly when idle with no mission active', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: true }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      game.gameOnIdle();

      expect(game.hunger).toBe(10 + game.recoverHunger);
      expect(game.happiness).toBe(10 + game.recoverHappiness);
      expect(game.money).toBe(10 + game.idleMoney);
   });

   it('updates stats correctly when idle with a mission active', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      game.gameOnIdle();

      expect(game.hunger).toBe(10 + game.recoverHunger);
      expect(game.happiness).toBe(10 + game.recoverHappiness);
   });
});

describe('Get Game Data', () => {
   afterEach(cleanup);

   it('retrieve game data needed to create or save the current Game', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: true }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      const gameData = game.getGameData();

      expect(gameData['money']).toBe(game.money);
      expect(gameData['happiness']).toBe(game.happiness);
      expect(gameData['hunger']).toBe(game.hunger);
      expect(gameData['missions']).toStrictEqual(game.missions);
      expect(gameData['enhancements']).toStrictEqual(game.enhancements);
      expect(gameData['recoverHunger']).toBe(game.recoverHunger);
      expect(gameData['loseHunger']).toBe(game.loseHunger);
      expect(gameData['recoverHappiness']).toBe(game.recoverHappiness);
      expect(gameData['loseHappiness']).toBe(game.loseHappiness);
      expect(gameData['clickMoney']).toBe(game.clickMoney);
      expect(gameData['idleMoney']).toBe(game.idleMoney);
      expect(gameData['missionProgress']).toBe(game.missionProgress)
   });

   it('retrieve game stats (hunger, happy, money)', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: true }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      const gameStats = game.getGameStats();

      expect(gameStats['money']).toBe(game.money);
      expect(gameStats['happiness']).toBe(game.happiness);
      expect(gameStats['hunger']).toBe(game.hunger);
   });

   it('retrieve game update values (recoverHunger, loseHunger, recoverHappiness, loseHappiness, clickMoney, idleMoney)', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: true }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      const gameUpdateValues = game.getGameUpdateValues();

      expect(gameUpdateValues['recoverHunger']).toBe(game.recoverHunger);
      expect(gameUpdateValues['loseHunger']).toBe(game.loseHunger);
      expect(gameUpdateValues['recoverHappiness']).toBe(game.recoverHappiness);
      expect(gameUpdateValues['loseHappiness']).toBe(game.loseHappiness);
      expect(gameUpdateValues['clickMoney']).toBe(game.clickMoney);
      expect(gameUpdateValues['idleMoney']).toBe(game.idleMoney);
   });

   it('retrieve game mission in progress (if exists)', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      const gameMissionInProgress = game.getMissionInProgress();

      expect(gameMissionInProgress).toBe(randomMission);
   });

   it('retrieve none if there not missions in progress', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: true }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      const gameMissionInProgress = game.getMissionInProgress();

      expect(gameMissionInProgress).toBe('none');
   });

   it('retrieve array with complete missions', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: true }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      const missions = game.getCompleteMissions();

      expect(missions).toStrictEqual([randomMission]);
   });

   it('retrieve empty array with missions if none complete', () => {
      const randomMission: string = getRandomMissionId();
      const game: Game = new Game(10, 10, 10, { [randomMission]: false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

      const missions = game.getCompleteMissions();

      expect(missions).toStrictEqual([]);
   });
});