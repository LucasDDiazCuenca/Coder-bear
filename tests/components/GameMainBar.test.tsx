/// <reference types="node" />

import React from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import GameMainBar from "../../src/components/GameMainBar";
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

    it("should render bar with hunger and happy information, plus button to work and access menu", () => {
        const game: Game = new Game();

        const { getByText } = render(<GameMainBar game={game} />);
        const hunger = getByText(`Hunger: ${game.hunger}%`);
        const happiness = getByText(`Happy: ${game.happiness}%`);
        const work = getByText(`Work!`);
        const menu = getByText(`M&E`);
        expect(hunger).toBeDefined;
        expect(happiness).toBeDefined;
        expect(work).toBeDefined;
        expect(menu).toBeDefined;
    });

});
