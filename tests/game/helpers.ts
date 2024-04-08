/*TODO: documentate*/
import { ENHANCEMENTS, MISSIONS, maxUpdateValues, startingUpdateValues } from '../../src/game/constants';

export const getRandomMissionId = (): string => {
    const index: number = Math.floor(Math.random() * MISSIONS.length);
    return MISSIONS[index].id;
}

export const getRandomEnhancementId = (): string => {
    const index: number = Math.floor(Math.random() * ENHANCEMENTS.length);
    return ENHANCEMENTS[index].id;
}

export const areIdsUnique = (array: any[]): boolean => {
    const encounteredValues = new Set<any>();

    for (const obj of array) {
        const value = obj['id'];
        if (encounteredValues.has(value)) {
            return false;
        }
        encounteredValues.add(value);
    }

    return true;
}

export const areMissionIdsCorrect = (): boolean => {
    for (const obj of MISSIONS) {
        const id = obj['id'];
        const numberId = `${id[1] + id[2] + id[3]}`
        if (id[0] !== 'T' && id[0] !== 'M' && id[0] !== 'S') {
            return false;
        }
        if (typeof Number(numberId) !== 'number') {
            return false;
        }
    }

    return true;
}

export const areEnhancementsIdsCorrect = (): boolean => {
    for (const obj of ENHANCEMENTS) {
        const id = obj['id'];
        const numberId = Number(id)

        if (typeof numberId !== 'number') {
            return false;
        }

        if (numberId < 0 || numberId > 999) {
            return false;
        }
    }

    return true;
}

export const areAllDescriptionsWritten = (array: any[]): boolean => {
    for (const obj of array) {
        const description = obj['description'];
        if (description.trim() === '') {
            return false;
        }
    }

    return true;
}

export const areAllNamesWritten = (array: any[]): boolean => {
    for (const obj of array) {
        const description = obj['name'];
        if (description.trim() === '') {
            return false;
        }
    }

    return true;
}

export const areMissionGoalsValid = (): boolean => {

    for (const mission of MISSIONS) {
        ;
        if (typeof mission.goal !== 'number' || mission.goal <= 0) {
            return false;
        }
    }

    return true;
}

export const areMissionRewardsTypeValid = (): boolean => {
    const validMissionRewardType = ['happiness', 'money'];

    for (const mission of MISSIONS) {
        const reward = mission['reward'].type;
        if (!validMissionRewardType.includes(reward)) {
            return false;
        }
    }

    return true;
}

export const areEnhancementsEffectTypeValid = (): boolean => {
    const validEnhancementsEffectType = ['recover-hunger', 'lose-hunger', 'recover-happiness', 'lose-happiness', 'click-money', 'idle-money']

    for (const enhancement of ENHANCEMENTS) {
        const effect = enhancement['effect'].type;
        if (!validEnhancementsEffectType.includes(effect)) {
            return false;
        }
    }

    return true;
}

export const areMissionRewardsValueTypeValid = (): boolean => {
    for (const mission of MISSIONS) {
        const reward = mission['reward'].value;
        if (typeof reward !== 'number') {
            return false;
        }
    }

    return true;
}

export const areEnhancementsEffectSumValuesValid = (factor: string): boolean => {
    let totalValue = startingUpdateValues[factor];
    const effect = factor.includes('recover') ? '+' : '-'

    ENHANCEMENTS.forEach(enhancement => {
        if (enhancement.effect.type === factor) {
            totalValue = effect === '+' ? totalValue + enhancement.effect.value : totalValue - enhancement.effect.value
        }
    });

    return effect === '+' ? totalValue <= maxUpdateValues[factor] : totalValue >= maxUpdateValues[factor]
}




