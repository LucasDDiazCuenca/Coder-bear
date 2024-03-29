/* Class Constructor Validator */

import { ENHANCEMENTS, MISSIONS, maxUpdateValues, startingUpdateValues } from "./constants";

/**TODO: documentate */

type Missions = { [key: string]: boolean };

const validateAttribute = (attr: string, value: any): void => {
    const msgIntro = 'Invalid arguments.';
    if (attr === 'money' || attr === 'happiness' || attr === 'hunger') {
        if (attr === 'money' && value < 0) throw new Error(`${msgIntro} Argument '${attr}' should be equal or higher than 0.`);
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

/* Add class documentation */
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
    }

    updateMoney(value: number): void {
        if (this.money + value < 0) throw new Error('Invalid operation. Money can not be less than 0.');
        this.money = this.money + value;
    }

    updateHappiness(value: number): void {
        if (0 <= this.happiness + value && this.happiness + value <= 100) this.happiness = this.happiness + value
        else this.happiness = 0 > this.happiness + value ? 0 : 100
    }

    updateHunger(value: number): void {
        if (0 <= this.hunger + value && this.hunger + value <= 100) this.hunger = this.hunger + value
        else this.hunger = 0 > this.hunger + value ? 0 : 100
    }

    updateRecoverHunger(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');
        if (this.recoverHunger + value > maxUpdateValues['recover-hunger']) throw new Error('Invalid operation. Value will overpass max.');

        this.recoverHunger += value;
    }

    updateLoseHunger(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');
        if (this.loseHunger - value < maxUpdateValues['lose-hunger']) throw new Error('Invalid operation. Value will overpass max.');

        this.loseHunger -= value;
    }

    updateRecoverHappiness(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');
        if (this.recoverHappiness + value > maxUpdateValues['recover-happiness']) throw new Error('Invalid operation. Value will overpass max.');

        this.recoverHappiness += value;
    }

    updateLoseHappiness(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');
        if (this.loseHappiness - value < maxUpdateValues['lose-happiness']) throw new Error('Invalid operation. Value will overpass max.');

        this.loseHappiness -= value;
    }

    updateClickMoney(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');

        this.clickMoney += value;
    }

    updateIdleMoney(value: number): void {
        if (value <= 0) throw new Error('Invalid operation. Value is not valid.');

        this.idleMoney += value;
    }

    updateMissions(mission: string): void {
        if ((MISSIONS.map(({ id }) => id)).includes(mission) === false) throw Error('Invalid operation. Mission does not exist.');
        if (this.missions[mission] === true) throw Error('Invalid operation. Mission is already complete.');

        if (this.missions[mission] === false) {
            this.missions[mission] = true;
            const reward: any = MISSIONS.find(_mission => _mission.id === mission)?.reward;
            reward.type === 'money' ? this.updateMoney(reward.value) : this.updateHappiness(reward.value);
        } else {
            this.missions[mission] = false;
        }
    }

    updateEnhancements(enhancement: string): void {
        if ((ENHANCEMENTS.map(({ id }) => id)).includes(enhancement) === false) throw new Error('Invalid operation. Enhancement does not exist.');
        if (this.enhancements.includes(enhancement)) throw new Error('Invalid operation. Enhancement is already unlocked.');

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
}