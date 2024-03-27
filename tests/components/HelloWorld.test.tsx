/// <reference types="node" />

import React from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import HelloWorld from "../../src/components/HelloWorld";
import { JSDOM } from "jsdom";

// Set up JSDOM before running tests
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
(global as any).document = jsdom.window.document;
(global as any).window = jsdom.window;

describe("Hello:", () => {
	afterEach(cleanup);

	it("should render button with correct text", () => {
		const { getByText } = render(<HelloWorld />);
		const button = getByText("Work!");
		expect(button).toBeDefined;
	});

	it("should call hello function when button is clicked", () => {
		const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);
		const { getByText } = render(<HelloWorld />);
		const button = getByText("Work!");
		fireEvent.click(button);
		expect(consoleMock).toHaveBeenCalledWith("hello world");
		consoleMock.mockReset();
	});
});
