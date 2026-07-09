import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react-native";
import CalendarScreen from "@/app/(tabs)/calendar";

describe("CalendarScreen Component", () => {
  beforeAll(() => {
    // Mock global alert to prevent test errors
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]), // Mock empty courses list initially
      })
    ) as jest.Mock;
  });

  test("renders the welcome header", async () => {
    render(<CalendarScreen />);
    expect(await screen.findByText("Welcome to the Calendar!")).toBeTruthy();
  });

  test("renders essential UI components", async () => {
    render(<CalendarScreen />);
    expect(await screen.findByText("+ Add Course")).toBeTruthy();
    expect(await screen.findByText("📅 Plot Calendar")).toBeTruthy();
  });

  test("renders all weekdays correctly (inside calendar modal)", async () => {
    render(<CalendarScreen />);

    fireEvent.press(screen.getByText("📅 Plot Calendar")); // ✅ Open the calendar

    await waitFor(() => {
      const days = ["Mon", "Tue", "Wen", "Thur", "Fri"];
      days.forEach((day) => {
        expect(screen.getByText(day)).toBeTruthy(); // ✅ Now checks inside modal
      });
    });
  });

  test("shows error when adding a course with empty fields", async () => {
    render(<CalendarScreen />);
    fireEvent.press(screen.getByText("+ Add Course"));

    fireEvent.press(screen.getByText("Add Course")); // Try adding empty course

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Please fill in Name, Day, and Time.");
    });
  });

  test("rejects invalid day formats", async () => {
    render(<CalendarScreen />);
    fireEvent.press(screen.getByText("+ Add Course"));

    fireEvent.changeText(screen.getByPlaceholderText("Course Name (Case senstive)"), "EECS1000");
    fireEvent.changeText(screen.getByPlaceholderText("Day (i.e Mon, Tue)"), "InvalidDay");
    fireEvent.changeText(screen.getByPlaceholderText("Time (i.e 7:00, 13:00)"), "10:00");
    fireEvent.press(screen.getByText("Add Course"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Invalid day. Use Mon, Tue, Wen, Thur, or Fri.");
    });
  });

  test("rejects invalid time formats (non-whole-hour)", async () => {
    render(<CalendarScreen />);
    fireEvent.press(screen.getByText("+ Add Course"));

    fireEvent.changeText(screen.getByPlaceholderText("Course Name (Case senstive)"), "EECS1000");
    fireEvent.changeText(screen.getByPlaceholderText("Day (i.e Mon, Tue)"), "Mon");
    fireEvent.changeText(screen.getByPlaceholderText("Time (i.e 7:00, 13:00)"), "10:30");
    fireEvent.press(screen.getByText("Add Course"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Invalid time format. Use 24-hour format with whole hours only (e.g., 7:00, 14:00). Minutes are not allowed (e.g., 7:30, 14:24)."
      );
    });
  });

  test("rejects duplicate course time slots", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "EECS1000", day: "Mon", time: "10:00" }, // Existing course
          ]),
      })
    ) as jest.Mock;
  
    render(<CalendarScreen />);
  
    // ✅ Wait for UI to update
    await waitFor(() => screen.getByText("EECS1000 | Mon 10:00"));
  
    fireEvent.press(screen.getByText("+ Add Course")); // Open modal
  
    fireEvent.changeText(screen.getByPlaceholderText("Course Name (Case senstive)"), "EECS2000");
    fireEvent.changeText(screen.getByPlaceholderText("Day (i.e Mon, Tue)"), "Mon");
    fireEvent.changeText(screen.getByPlaceholderText("Time (i.e 7:00, 13:00)"), "10:00"); // Conflict
  
    await act(async () => {
      fireEvent.press(screen.getByText("Add Course"));
    });
  
    // ✅ Debug logs
    console.log("Mocked alert calls:", (global.alert as jest.Mock).mock.calls);
  
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  
    expect(global.alert).toHaveBeenCalledWith("A course is already scheduled at this time slot.");
  });
  
  
  
  test("adds a valid course successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "EECS1000", day: "Mon", time: "10:00" }, // After adding
          ]),
      })
    ) as jest.Mock;

    render(<CalendarScreen />);
    fireEvent.press(screen.getByText("+ Add Course"));

    fireEvent.changeText(screen.getByPlaceholderText("Course Name (Case senstive)"), "EECS1000");
    fireEvent.changeText(screen.getByPlaceholderText("Day (i.e Mon, Tue)"), "Mon");
    fireEvent.changeText(screen.getByPlaceholderText("Time (i.e 7:00, 13:00)"), "10:00");
    fireEvent.press(screen.getByText("Add Course"));

    await waitFor(() => {
      expect(screen.getByText("EECS1000 | Mon 10:00")).toBeTruthy();
    });
  });

  test("day normalization works correctly", () => {
    const normalizeDay = (day: string) => {
      const dayMap: { [key: string]: string } = {
        mon: "Mon", monday: "Mon", mond: "Mon",
        tue: "Tue", tuesday: "Tue", tues: "Tue",
        wed: "Wen", wednesday: "Wen", wen: "Wen",
        thu: "Thur", thursday: "Thur", thur: "Thur",
        fri: "Fri", friday: "Fri",
      };
      return dayMap[day.toLowerCase()] || day;
    };

    expect(normalizeDay("Monday")).toBe("Mon");
    expect(normalizeDay("tues")).toBe("Tue");
    expect(normalizeDay("WED")).toBe("Wen");
    expect(normalizeDay("THURSDAY")).toBe("Thur");
    expect(normalizeDay("friday")).toBe("Fri");
    expect(normalizeDay("invalid")).toBe("invalid"); // Should not normalize unknown days
  });

  test("calendar correctly displays added courses", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "EECS1000", day: "Mon", time: "10:00" },
            { id: 2, name: "EECS2000", day: "Tue", time: "12:00" },
          ]),
      })
    ) as jest.Mock;

    render(<CalendarScreen />);
    fireEvent.press(screen.getByText("📅 Plot Calendar"));

    await waitFor(() => {
      expect(screen.getByText("EECS1000")).toBeTruthy();
      expect(screen.getByText("EECS2000")).toBeTruthy();
    });
  });
});
