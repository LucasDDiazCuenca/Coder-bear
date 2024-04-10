/// <reference types="node" />

import React from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import EnhancementsMenu from "../../src/components/EnhancementsMenu";
import { JSDOM } from "jsdom";
import localStorageMock from "../helpers/localStorageMock";
import Game from "../../src/game/Game";

const enhancementsMock = [{
    id: "001",
    name: "A",
    description: "A",
    price: 1,
    effect: {
        type: "A",
        value: 1
    }
}]

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).document = jsdom.window.document;
(global as any).window = jsdom.window;

global.localStorage = localStorageMock;

describe("EnhancementsMenu:", () => {
    afterEach(() => {
        cleanup();
        localStorage.clear();
    });

    it("should render missions menu with all info", () => {
        const game: Game = new Game();

        const { getByText } = render(<EnhancementsMenu game={game} enhancements={enhancementsMock} onClose={() => null} onMissions={() => null} save={() => null} />);

        const close = getByText(`x`);
        const toMissions = getByText(`To Missions`);
        const stats = getByText(`Current stats:`);
        const missionsH1 = getByText(`Enhancements:`);
        const missionsH2 = getByText(`A:`);
        expect(close).toBeDefined;
        expect(toMissions).toBeDefined;
        expect(stats).toBeDefined;
        expect(missionsH1).toBeDefined;
        expect(missionsH2).toBeDefined;
    });

    it("should call onWorkClick function when clicked", () => {
        const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
        const game: Game = new Game();

        const { getByText } = render(<EnhancementsMenu game={game} enhancements={enhancementsMock} onClose={() => console.log('onClose test')} onMissions={() => null} save={() => null} />);

        const close = getByText("x");
        fireEvent.click(close);

        expect(consoleMock).toHaveBeenCalledWith('onClose test');
        consoleMock.mockReset();
    });

    it("should call onWorkClick function when clicked", () => {
        const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
        const game: Game = new Game();

        const { getByText } = render(<EnhancementsMenu game={game} enhancements={enhancementsMock} onClose={() => null} onMissions={() => console.log('onMissions test')} save={() => null} />);

        const toMissions = getByText(`To Missions`);
        fireEvent.click(toMissions);

        expect(consoleMock).toHaveBeenCalledWith('onMissions test');
        consoleMock.mockReset();
    });

    it("should call onWorkClick function when clicked", () => {
        const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
        const game: Game = new Game();

        const { getByText } = render(<EnhancementsMenu game={game} enhancements={enhancementsMock} onClose={() => null} onMissions={() => null} save={() => console.log('onSave test')} />);

        const toBuy = getByText(`Buy`);
        fireEvent.click(toBuy);

        expect(consoleMock).toHaveBeenCalledWith('onSave test');
        consoleMock.mockReset();
    });


});
