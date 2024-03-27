/*TODO: documentate*/
import { MISSIONS } from '../../src/game/constants';

export const getRandomMissionId = (): string => {
    const index: number = Math.floor(Math.random() * MISSIONS.length);
    return MISSIONS[index].id;
}