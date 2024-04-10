import React from 'react';
import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, renderHook, act } from '@testing-library/react';
import useGame from '../../src/game/useGame';
import { JSDOM } from 'jsdom';
import Game from '../../src/game/Game';
import { ENHANCEMENTS, MISSIONS } from '../../src/game/constants';
import localStorageMock from '../helpers/localStorageMock';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).document = jsdom.window.document;
(global as any).window = jsdom.window;

global.localStorage = localStorageMock;

describe('useGame', () => {
    afterEach(() => {
        cleanup();
        localStorage.clear();
    });

    it('generates correctly mission and enhancements arrays', () => {
        const { result } = renderHook(() => useGame());

        expect(result.current.missionsList).toStrictEqual(MISSIONS);
        expect(result.current.enhancementsList).toStrictEqual(ENHANCEMENTS);
    });

    it('creates new game if no game to load on initial render', () => {
        const { result } = renderHook(() => useGame());

        expect(localStorage.getItem('game')).toBeTruthy();
        const game = result.current.game;

        expect(game).toBeInstanceOf(Game);
        expect(game?.missions).toStrictEqual({});
        expect(game?.enhancements).toStrictEqual([]);
    });

    it('loads the game on initial render', () => {
        const newGame: Game = new Game(10, 10, 50, { '001': true, '002': false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);
        const gameJson: any = JSON.stringify(newGame.getGameData());

        const encodedData = btoa(gameJson);

        localStorage.setItem('game', encodedData);

        const { result } = renderHook(() => useGame());

        expect(localStorage.getItem('game')).toBeTruthy();

        const game = result.current.game;

        expect(game).toBeInstanceOf(Game);
        expect(game?.money).toBe(10);
        expect(game?.happiness).toBe(10);
        expect(game?.money).toBe(10);
        expect(game?.happiness).toBe(10);
        expect(game?.hunger).toBe(50);
        expect(game?.missions).toStrictEqual({ '001': true, '002': false });
        expect(game?.enhancements).toStrictEqual(['001']);
        expect(game?.recoverHunger).toBe(6);
        expect(game?.loseHunger).toBe(0.8);
        expect(game?.recoverHappiness).toBe(10);
        expect(game?.loseHappiness).toBe(0.1);
        expect(game?.clickMoney).toBe(8);
        expect(game?.idleMoney).toBe(12);
        expect(game?.missionProgress).toBe(15)
    });

    it('saves game updated if any change happens', () => {
        const newGame: Game = new Game(10, 10, 50, { '001': true, '002': false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);
        const gameJson: any = JSON.stringify(newGame.getGameData());

        const encodedData = btoa(gameJson);

        localStorage.setItem('game', encodedData);

        const { result } = renderHook(() => useGame());

        act(() => {
            result.current.game?.updateHunger(-50)
        })

        const game = result.current.game;

        expect(game).toBeInstanceOf(Game);
        expect(game?.hunger).toBe(0);
    });
});