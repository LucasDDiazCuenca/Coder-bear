// Class Constructor Validator

import { ENHANCEMENTS, MISSIONS, maxUpdateValues, startingUpdateValues } from "./constants";
type Missions = { [key: string]: boolean };

const validateAttribute = (attr: string, value: any): void => {
    const msgIntro = 'Invalid arguments.';
    if (attr === 'money' || attr === 'happiness' || attr === 'hunger' || attr === 'mission-progress') {
        if ((attr === 'money' || attr === 'mission-progress') && value < 0) throw new Error(`${msgIntro} Argument '${attr}' should be equal or higher than 0.`);
        if ((attr === 'happiness' || attr === 'hunger') && (value < 0 || value > 100)) throw new Error(`${msgIntro} Argument '${attr}' should be between 0 and 100.`);
    }
    if ((attr === 'click-money' || attr === 'idle-money') && (value < startingUpdateValues[attr])) {
        throw new Error(`${msgIntro} Argument '${attr}' should be equal or higher starting value.`);
    }
    if (attr.includes('recover')) {
        if (value < startingUpdateValues[attr]) throw new Error(`${msgIntro} Argument '${attr}' should be equal or higher than starting value.`)
        if (value > maxUpdateValues[attr]) throw new Error(`${msgIntro} Argument '${attr}' should be equal or lower than max value.`)
    }
    if (attr.includes('lose')) {
        if (value > startingUpdateValues[attr]) throw new Error(`${msgIntro} Argument '${attr}' should be equal or lower starting value.`)
        if (value < maxUpdateValues[attr]) throw new Error(`${msgIntro} Argument '${attr}' should be equal or higher than max value.`)
    }
}

/**
 * Represents a game instance with all its attributes and functionalities.
 */
export default class Game {
    money: number;
    happiness: number;
    hunger: number;
    missions: Missions;
    enhancements: Array<String>;
    recoverHunger: number;
    loseHunger: number;
    recoverHappiness: number;
    loseHappiness: number;
    clickMoney: number;
    idleMoney: number;
    missionProgress: number;

    /**
     * Constructor for creating a new game instance.
     * @param money Initial amount of money.
     * @param happiness Initial level of happiness.
     * @param hunger Initial level of hunger.
     * @param missions Object containing mission statuses.
     * @param enhancements Array containing unlocked enhancements.
     * @param recoverHunger Amount of hunger recovered over time.
     * @param loseHunger Amount of hunger lost over time.
     * @param recoverHappiness Amount of happiness recovered over time.
     * @param loseHappiness Amount of happiness lost over time.
     * @param clickMoney Amount of money gained per click.
     * @param idleMoney Amount of money gained while idle.
     * @param missionProgress Progress towards the current mission.
    */
    constructor(
        money: number = 50,
        happiness: number = 90,
        hunger: number = 100,
        missions: Missions | {} = {},
        enhancements: Array<String> | [] = [],
        recoverHunger: number = startingUpdateValues['recover-hunger'],
        loseHunger: number = startingUpdateValues['lose-hunger'],
        recoverHappiness: number = startingUpdateValues['recover-happiness'],
        loseHappiness: number = startingUpdateValues['lose-happiness'],
        clickMoney: number = startingUpdateValues['click-money'],
        idleMoney: number = startingUpdateValues['idle-money'],
        missionProgress: number = 0,

    ) {
        validateAttribute('money', money);
        validateAttribute('happiness', happiness);
        validateAttribute('hunger', hunger);
        validateAttribute('recover-hunger', recoverHunger);
        validateAttribute('lose-hunger', loseHunger);
        validateAttribute('recover-happiness', recoverHappiness);
        validateAttribute('lose-happiness', loseHappiness);
        validateAttribute('click-money', clickMoney);
        validateAttribute('idle-money', idleMoney);
        validateAttribute('mission-progress', missionProgress);

        this.money = money;
        this.happiness = happiness;
        this.hunger = hunger;
        this.missions = missions;
        this.enhancements = enhancements;
        this.recoverHunger = recoverHunger;
        this.loseHunger = loseHunger;
        this.recoverHappiness = recoverHappiness;
        this.loseHappiness = loseHappiness;
        this.clickMoney = clickMoney;
        this.idleMoney = idleMoney;
        this.missionProgress = missionProgress
    }

    /**
     * Update the current amount of money.
     * @param value The amount to add to the money.
    */
    updateMoney(value: number): void {
        if (this.money + value < 0) throw new Error('Invalid operation. Money can not be less than 0.');
        this.money = this.money + value;
    }

    /**
     * Update the current level of happiness.
     * @param value The amount to add/remove to happiness.
    */
    updateHappiness(value: number): void {
        if (0 <= this.happiness + value && this.happiness + value <= 100) this.happiness = this.happiness + value
        else this.happiness = 0 > this.happiness + value ? 0 : 100
    }

    /**
     * Update the current level of hunger.
     * @param value The amount to add/remove to hunger.
    */
    updateHunger(value: number): void {
        if (0 <= this.hunger + value && this.hunger + value <= 100) this.hunger = this.hunger + value
        else this.hunger = 0 > this.hunger + value ? 0 : 100
    }

    /**
     * Update the parameter to update recover-hunger.
     * @param value The amount to add to recover-hunger.
    */
    updateRecoverHunger(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');
        if (this.recoverHunger + value > maxUpdateValues['recover-hunger']) throw new Error('Invalid operation. Value will overpass max.');

        this.recoverHunger += value;
    }

    /**
     * Update the parameter to update lose-hunger.
     * @param value The amount to remove to lose-hunger.
    */
    updateLoseHunger(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');
        if (this.loseHunger - value < maxUpdateValues['lose-hunger']) throw new Error('Invalid operation. Value will overpass max.');

        this.loseHunger -= value;
    }

    /**
     * Update the parameter to update recover-happiness.
     * @param value The amount to add to recover-happiness.
    */
    updateRecoverHappiness(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');
        if (this.recoverHappiness + value > maxUpdateValues['recover-happiness']) throw new Error('Invalid operation. Value will overpass max.');

        this.recoverHappiness += value;
    }

    /**
     * Update the parameter to update lose-happiness.
     * @param value The amount to remove to lose-happiness.
    */
    updateLoseHappiness(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');
        if (this.loseHappiness - value < maxUpdateValues['lose-happiness']) throw new Error('Invalid operation. Value will overpass max.');

        this.loseHappiness -= value;
    }

    /**
     * Update the parameter to update click-money.
     * @param value The amount to add to click-money.
    */
    updateClickMoney(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');

        this.clickMoney += value;
    }

    /**
     * Update the parameter to update idle-money.
     * @param value The amount to add to idle-money.
    */
    updateIdleMoney(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');

        this.idleMoney += value;
    }

    /**
     * Get the id of the mission active or none in case of no mission active.
     * @returns An string with the id/none.
    */
    getMissionInProgress(): string {
        for (const mission in this.missions) {
            if (this.missions.hasOwnProperty(mission) && this.missions[mission] === false) {
                return mission;
            }
        }
        return 'none';
    }

    /**
     * Update the missions object.
     * If the mission id is not active it sets it up as false.
     * If the mission id is active it sets it up as true (complete) and resets the missionProgress.
     * @param mission The mission id.
    */
    updateMissions(mission: string): void {
        if ((MISSIONS.map(({ id }) => id)).includes(mission) === false) throw new Error('Invalid operation. Mission does not exist.');
        if (Object.values(this.missions).some(complete => !complete) && this.missions[mission] === undefined) throw new Error('Invalid operation. Another mission is already active.');
        if (this.missions[mission] === true) throw new Error('Invalid operation. Mission is already complete.');

        if (this.missions[mission] === false) {
            this.missions[mission] = true;
            this.missionProgress = 0;
            const reward: any = MISSIONS.find(_mission => _mission.id === mission)?.reward;
            reward.type === 'money' ? this.updateMoney(reward.value) : this.updateHappiness(reward.value);
        } else {
            this.missions[mission] = false;
        }
    }

    /**
     * Delete a mission of the array if it's not complete (false).
     * @param mission The mission id.
    */
    deleteMission(mission: string): void {
        if ((MISSIONS.map(({ id }) => id)).includes(mission) === false) throw new Error('Invalid operation. Mission does not exist.');
        if (this.missions[mission] === undefined) throw new Error('Invalid operation. Mission is not active.');
        if (this.missions[mission] === true) throw new Error('Invalid operation. Mission is already complete.');

        delete this.missions[mission]
        this.missionProgress = 0;
    }

    /**
     * Update the current level of mission progress if a mission is in progress. If it reaches the mission goal marks this mission as complete and resets the mission progress.
     * @param value The amount to add to mission-progress.
    */
    updateMissionProgress(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');

        const missionId = this.getMissionInProgress();
        const mission = MISSIONS.find(_mission => _mission.id === missionId);

        if (!mission) throw new Error('Invalid operation. No mission in progress.');

        this.missionProgress += value;

        if (mission.goal <= this.missionProgress) {
            this.updateMissions(mission.id)
        }
    }

    /**
     * Update the enhancements array and updates values related to that enhancement.
     * @param enhancement The enhancement id.
    */
    updateEnhancements(enhancement: string): void {
        if ((ENHANCEMENTS.map(({ id }) => id)).includes(enhancement) === false) throw new Error('Invalid operation. Enhancement does not exist.');
        if (this.enhancements.includes(enhancement)) throw new Error('Invalid operation. Enhancement is already unlocked.');
        const price = ENHANCEMENTS.find(_enhancement => _enhancement.id === enhancement)?.price
        if (price && price > this.money) throw new Error('Invalid operation. Enhancement is too expensive.');

        if (price) this.money -= price;

        const effect: any = ENHANCEMENTS.find(_enhancement => _enhancement.id === enhancement)?.effect;
        switch (effect.type) {
            case 'recover-hunger':
                this.updateRecoverHunger(effect.value)
                break;
            case 'lose-hunger':
                this.updateLoseHunger(effect.value)
                break;
            case 'recover-happiness':
                this.updateRecoverHappiness(effect.value)
                break;
            case 'lose-happiness':
                this.updateLoseHappiness(effect.value)
                break;
            case 'click-money':
                this.updateClickMoney(effect.value)
                break;
            case 'idle-money':
                this.updateIdleMoney(effect.value)
                break;
        }

        this.enhancements.push(enhancement)
    }

    /**
     * Applies all effects relative to a click in game depending of if there's a mission active.
    */
    gameOnClick(): void {
        if (this.hunger === 0) throw new Error('Invalid operation. Not available with hunger === 0.');
        const updateOnClick = this.happiness <= 1 ? this.clickMoney / 2 : this.clickMoney;
        if (Object.values(this.missions).some(complete => !complete)) {
            this.updateMissionProgress(updateOnClick);
            this.updateHappiness(-this.loseHappiness);
            this.updateHunger(-this.loseHunger);
        } else {
            this.updateMoney(updateOnClick);
            this.updateHappiness(-this.loseHappiness);
            this.updateHunger(-this.loseHunger)
        }
    }

    /**
     * Applies all effects relative to idle in game depending of if there's a mission active.
    */
    gameOnIdle(): void {
        const recoverHappinessSpeed = this.hunger > 20 ? this.recoverHappiness : this.recoverHappiness / 2
        if (Object.values(this.missions).some(complete => !complete)) {
            this.updateHunger(this.recoverHunger);
            this.updateHappiness(recoverHappinessSpeed);
        } else {
            if (this.happiness > 1 && this.hunger > 1) this.updateMoney(this.idleMoney);
            this.updateHappiness(recoverHappinessSpeed);
            this.updateHunger(this.recoverHunger);
        }
    }

    /**
     * Get the data of the game instance necesary to save the whole game.
     * @returns An object containing the game data.
    */
    getGameData(): object {
        return {
            money: this.money,
            happiness: this.happiness,
            hunger: this.hunger,
            missions: this.missions,
            enhancements: this.enhancements,
            recoverHunger: this.recoverHunger,
            loseHunger: this.loseHunger,
            recoverHappiness: this.recoverHappiness,
            loseHappiness: this.loseHappiness,
            clickMoney: this.clickMoney,
            idleMoney: this.idleMoney,
            missionProgress: this.missionProgress
        }
    }

    /**
     * Get the basic stats of the game instance.
     * @returns An object containing basic game stats (money, happiness, hunger).
    */
    getGameStats(): object {
        return {
            money: this.money,
            happiness: this.happiness,
            hunger: this.hunger
        }
    }

    /**
     * Get the update values of the game instance.
     * @returns An object containing the update values (recoverHunger, loseHunger, etc.).
    */
    getGameUpdateValues(): object {
        return {
            recoverHunger: this.recoverHunger,
            loseHunger: this.loseHunger,
            recoverHappiness: this.recoverHappiness,
            loseHappiness: this.loseHappiness,
            clickMoney: this.clickMoney,
            idleMoney: this.idleMoney,
        }
    }

    /**
     * Get the list of completed missions.
     * @returns An array containing the ids of completed missions.
    */
    getCompleteMissions(): Array<string> {
        const completeMissions: Array<string> = [];
        for (const mission in this.missions) {
            if (this.missions.hasOwnProperty(mission) && this.missions[mission] === true) {
                completeMissions.push(mission)
            }
        }
        return completeMissions;
    }
}