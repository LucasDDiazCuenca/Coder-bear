/// <reference types="node" />

import React from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import MissionsMenu from "../../src/components/MissionsMenu";
import { JSDOM } from "jsdom";
import localStorageMock from "../helpers/localStorageMock";
import Game from "../../src/game/Game";

const missionsMock = [{
    id: "1",
    name: "A",
    description: "A",
    goal: 1,
    reward: {
        type: "A",
        value: 1
    }
}]

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).document = jsdom.window.document;
(global as any).window = jsdom.window;

global.localStorage = localStorageMock;

describe("MissionsMenu:", () => {
    afterEach(() => {
        cleanup();
        localStorage.clear();
    });

    it("should render missions menu with all info", () => {
        const game: Game = new Game();

        const { getByText } = render(<MissionsMenu game={game} isMissionActive={false} missions={missionsMock} onClose={() => null} onEnhancements={() => null} onActivateMission={() => null} />);

        const close = getByText(`x`);
        const toEnhance = getByText(`To Enhancements`);
        const missionsH1 = getByText(`Missions:`);
        const missionsH2 = getByText(`A:`);
        expect(close).toBeDefined;
        expect(toEnhance).toBeDefined;
        expect(missionsH1).toBeDefined;
        expect(missionsH2).toBeDefined;
    });

    it("should call onWorkClick function when clicked", () => {
        const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
        const game: Game = new Game();

        const { getByText } = render(<MissionsMenu game={game} isMissionActive={false} missions={missionsMock} onClose={() => console.log('onClose test')} onEnhancements={() => null} onActivateMission={() => null} />);

        const close = getByText("x");
        fireEvent.click(close);

        expect(consoleMock).toHaveBeenCalledWith('onClose test');
        consoleMock.mockReset();
    });

    it("should call onWorkClick function when clicked", () => {
        const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
        const game: Game = new Game();

        const { getByText } = render(<MissionsMenu game={game} isMissionActive={false} missions={missionsMock} onClose={() => null} onEnhancements={() => null} onActivateMission={() => console.log('onMission test')} />);

        const toMission = getByText(`Activate`);
        fireEvent.click(toMission);

        expect(consoleMock).toHaveBeenCalledWith('onMission test');
        consoleMock.mockReset();
    });

    it("should call onWorkClick function when clicked", () => {
        const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
        const game: Game = new Game();

        const { getByText } = render(<MissionsMenu game={game} isMissionActive={false} missions={missionsMock} onClose={() => null} onEnhancements={() => console.log('onEnhance test')} onActivateMission={() => null} />);

        const toEnhance = getByText(`To Enhancements`);
        fireEvent.click(toEnhance);

        expect(consoleMock).toHaveBeenCalledWith('onEnhance test');
        consoleMock.mockReset();
    });


});
