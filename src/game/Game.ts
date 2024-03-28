/* Class Constructor Validator */

import { MISSIONS } from "./constants";

/**TODO: documentate */

type Missions = { [key: string]: boolean };
type Enhancements = { [key: string]: boolean };

const validateAttribute = (attr: string, value: any): void => {
    const msgIntro = 'Invalid arguments.';
    if (attr === 'money' || attr === 'happiness' || attr === 'hunger') {
        if (attr === 'money' && value < 0) throw new Error(`${msgIntro} Argument '${attr}' should be equal or higher than 0.`);
        if ((attr === 'happiness' || attr === 'hunger') && (value < 0 || value > 100)) throw new Error(`${msgIntro} Argument '${attr}' should be between 0 and 100.`);
    }
}

/* Add class documentation */
export default class Game {
    money: number;
    happiness: number;
    hunger: number;
    missions: Missions;
    enhancements: Enhancements;
    /*Add per second update values*/

    constructor(
        money: number = 50,
        happiness: number = 90,
        hunger: number = 100,
        missions: Missions | {} = {},
        enhancements: Enhancements | {} = {}
    ) {
        validateAttribute('money', money);
        validateAttribute('happiness', happiness);
        validateAttribute('hunger', hunger);

        this.money = money;
        this.happiness = happiness;
        this.hunger = hunger;
        this.missions = missions;
        this.enhancements = enhancements;
    }

    updateMoney(value: number): void {
        if (this.money + value < 0) throw Error('Invalid operation. Money can not be less than 0.');
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
}