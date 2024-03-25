import React from "react";
import { afterEach, describe, it, expect, vi } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import HelloWorld from "../../src/components/HelloWorld";

describe("Hello:", () => {
	afterEach(cleanup);

	it("should render button with correct text", () => {
		const { getByText } = render(<HelloWorld />);
		const button = getByText("Hi!");
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
