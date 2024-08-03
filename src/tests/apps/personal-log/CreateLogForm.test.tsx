import { render, fireEvent, waitFor } from "@testing-library/react";
import { createLog } from "@/src/lib/requestTypes";
import CreateLogForm from "@/src/app/apps/personal-log/create/CreateLogForm";

jest.mock("@/src/lib/requestTypes", () => ({
	createLog: jest.fn(),
}));

describe("CreateLogForm", () => {
	test("renders form", () => {
		const { getByLabelText } = render(<CreateLogForm />);
		
		expect(getByLabelText("Start date*")).toBeInTheDocument();
		expect(getByLabelText("Select log type")).toBeInTheDocument();
		expect(getByLabelText("Description*")).toBeInTheDocument();
		// Add more assertions for other form elements
	});

	test("creates a log", async () => {
		const { getByLabelText, getByText } = render(<CreateLogForm />);
		
		fireEvent.change(getByLabelText("Start date*"), { target: { value: "2022-01-01" } });
		fireEvent.change(getByLabelText("Description*"), { target: { value: "Test log" } });
		fireEvent.change(getByLabelText("Select log type"), { target: { value: "Programming" } });
		
		fireEvent.click(getByText("Create log"));
		
		await waitFor(() => {
			expect(createLog).toHaveBeenCalledTimes(1);
		});
	});
});
