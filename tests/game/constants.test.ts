import { ENHANCEMENTS, MISSIONS } from '../../src/game/constants';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup } from "@testing-library/react";
import { areAllDescriptionsWritten, areAllNamesWritten, areEnhancementsEffectSumValuesValid, areEnhancementsEffectTypeValid, areEnhancementsIdsCorrect, areIdsUnique, areMissionGoalsValid, areMissionIdsCorrect, areMissionRewardsTypeValid, areMissionRewardsValueTypeValid } from '../helpers/helpers';

describe('Game Constants', () => {
    afterEach(cleanup);

    it('all MISSIONS id are unique', () => {
        const areMissionsIdsUnique = areIdsUnique(MISSIONS);

        expect(areMissionsIdsUnique).toBe(true);
    });

    it('all MISSIONS id are correct format (T || M || S + ###)', () => {
        const areMissionsIdsGood = areMissionIdsCorrect();

        expect(areMissionsIdsGood).toBe(true);
    });

    it('all ENHANCEMENTS id are unique', () => {
        const areEnhancementsIdsUnique = areIdsUnique(ENHANCEMENTS);

        expect(areEnhancementsIdsUnique).toBe(true);
    });

    it('all ENHANCEMENTS id are correct format (0 <= ### <= 999)', () => {
        const areEnhancementsIdsGood = areEnhancementsIdsCorrect();

        expect(areEnhancementsIdsGood).toBe(true);
    });


    it('all MISSIONS have a description', () => {
        const areMissionsDescriptionWritten = areAllDescriptionsWritten(MISSIONS);

        expect(areMissionsDescriptionWritten).toBe(true);
    });

    it('all ENHANCEMENTS have a description', () => {
        const areEnhancementsDescriptionWritten = areAllDescriptionsWritten(ENHANCEMENTS);

        expect(areEnhancementsDescriptionWritten).toBe(true);
    });

    it('all MISSIONS have a name', () => {
        const areMissionsNameWritten = areAllNamesWritten(MISSIONS);

        expect(areMissionsNameWritten).toBe(true);
    });

    it('all ENHANCEMENTS have a name', () => {
        const areEnhancementsNameWritten = areAllNamesWritten(ENHANCEMENTS);

        expect(areEnhancementsNameWritten).toBe(true);
    });

    it('all MISSIONS have a name', () => {
        const areMissionsNameWritten = areAllNamesWritten(MISSIONS);

        expect(areMissionsNameWritten).toBe(true);
    });

    it('all ENHANCEMENTS have a name', () => {
        const areEnhancementsNameWritten = areAllNamesWritten(ENHANCEMENTS);

        expect(areEnhancementsNameWritten).toBe(true);
    });

    it('all MISSIONS have a valid goals', () => {
        const areMissionGoalsValids = areMissionGoalsValid();

        expect(areMissionGoalsValids).toBe(true);
    });

    it('all MISSIONS have a valid reward type', () => {
        const areMissionRewardsValid = areMissionRewardsTypeValid();

        expect(areMissionRewardsValid).toBe(true);
    });

    it('all ENHANCEMENTS have a valid effect type', () => {
        const areEnhancementEffectsTypeValid = areEnhancementsEffectTypeValid();

        expect(areEnhancementEffectsTypeValid).toBe(true);
    });

    it('all MISSIONS have a valid reward value', () => {
        const areMissionRewardsValueValid = areMissionRewardsValueTypeValid();

        expect(areMissionRewardsValueValid).toBe(true);
    });

    it('all ENHANCEMENTS have a valid effect value', () => {
        const areEnhancementEffectsValueValid = areEnhancementsEffectTypeValid();

        expect(areEnhancementEffectsValueValid).toBe(true);
    });

    it('total of ENHANCEMENTS that modify recover-hunger sum up a valid value', () => {
        const areEnhancementEffectsRecoverHungerValid = areEnhancementsEffectSumValuesValid('recover-hunger');

        expect(areEnhancementEffectsRecoverHungerValid).toBe(true);
    });

    it('total of ENHANCEMENTS that modify recover-happiness sum up a valid value', () => {
        const areEnhancementEffectsRecoverHappyValid = areEnhancementsEffectSumValuesValid('recover-happiness');

        expect(areEnhancementEffectsRecoverHappyValid).toBe(true);
    });

    it('total of ENHANCEMENTS that modify lose-hunger sum up a valid value', () => {
        const areEnhancementEffectsLoseHungerValid = areEnhancementsEffectSumValuesValid('lose-hunger');

        expect(areEnhancementEffectsLoseHungerValid).toBe(true);
    });

    it('total of ENHANCEMENTS that modify lose-happiness sum up a valid value', () => {
        const areEnhancementEffectsLoseHappyValid = areEnhancementsEffectSumValuesValid('lose-happiness');

        expect(areEnhancementEffectsLoseHappyValid).toBe(true);
    });
})