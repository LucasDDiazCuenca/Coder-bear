/// <reference types="node" />

import React from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import GameMainBar from "../../src/components/GameMainBar";
import { JSDOM } from "jsdom";
import localStorageMock from "../helpers/localStorageMock";
import Game from "../../src/game/Game";

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).document = jsdom.window.document;
(global as any).window = jsdom.window;

global.localStorage = localStorageMock;

describe("GameMainBar:", () => {
    afterEach(() => {
        cleanup();
        localStorage.clear();
    });

    it("should render bar with hunger and happy information, plus buttons", () => {
        const game: Game = new Game();

        const { getByText } = render(<GameMainBar game={game} onWorkClick={() => null} onMenuClick={() => null} />);
        const hunger = getByText(`Hunger: ${game.hunger}%`);
        const happiness = getByText(`Happy: ${game.happiness}%`);
        const work = getByText(`Work!`);
        const menu = getByText(`M&E`);
        expect(hunger).toBeDefined;
        expect(happiness).toBeDefined;
        expect(work).toBeDefined;
        expect(menu).toBeDefined;
    });

    it("should call onWorkClick function when clicked", () => {
        const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
        const game: Game = new Game();

        const { getByText } = render(<GameMainBar game={game} onWorkClick={() => console.log('onWork test')} onMenuClick={() => null} />);

        const button = getByText("Work!");
        fireEvent.click(button);

        expect(consoleMock).toHaveBeenCalledWith('onWork test');
        consoleMock.mockReset();
    });

    it("should call onMenuClick function when clicked", () => {
        const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
        const game: Game = new Game();

        const { getByText } = render(<GameMainBar game={game} onWorkClick={() => null} onMenuClick={() => console.log('onMenu test')} />);

        const button = getByText("M&E");
        fireEvent.click(button);

        expect(consoleMock).toHaveBeenCalledWith('onMenu test');
        consoleMock.mockReset();
    });

});
