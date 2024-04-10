/// <reference types="node" />

import React from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import GameTopBar from "../../src/components/GameTopBar";
import { JSDOM } from "jsdom";
import localStorageMock from "../helpers/localStorageMock";
import Game from "../../src/game/Game";
import { getRandomMissionId } from "../helpers/helpers";
import { MISSIONS } from "../../src/game/constants";

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).document = jsdom.window.document;
(global as any).window = jsdom.window;

global.localStorage = localStorageMock;

describe("GameTopBar:", () => {
    afterEach(() => {
        cleanup();
        localStorage.clear();
    });

    it("should render bar with money information", () => {
        const game: Game = new Game();

        const { getByText } = render(<GameTopBar game={game} isMissionActive={false} missions={MISSIONS} />);
        const money = getByText(`Money: ${game.money}`);
        expect(money).toBeDefined;
    });

    it("should render bar with mission progress information", () => {
        const missionId = getRandomMissionId();
        const game: Game = new Game(10, 10, 50, { [missionId]: false }, ['001'], 6, 0.8, 10, 0.1, 8, 12, 15);

        const missionInProgress = MISSIONS.find(mission => mission.id === missionId);
        const goal = missionInProgress?.goal || 0

        const { getByText } = render(<GameTopBar game={game} isMissionActive={true} missions={MISSIONS} />);
        const progress = getByText(`${missionInProgress?.name}: ${goal - game.missionProgress}`);
        expect(progress).toBeDefined;
    });

});
