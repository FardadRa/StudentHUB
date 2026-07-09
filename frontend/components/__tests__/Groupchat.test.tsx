import GroupChatScreen from "@/app/(tabs)/groupchat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";

// ✅ Mocks for React Native dependencies
jest.mock("react-native-safe-area-context", () => ({
    SafeAreaView: ({ children }: any) => children,
}));

jest.mock("react-native-gesture-handler", () => {
    const View = ({ children }: any) => children;
    return {
        GestureHandlerRootView: View,
    };
});

// ✅ Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
}));

// ✅ Supabase Client Mock
jest.mock("@supabase/supabase-js", () => ({
    createClient: () => ({
        from: (table: string) => {
            if (table === "chat_groups") {
                return {
                    select: () => ({
                        order: () => ({
                            data: [
                                { id: 1, course_name: "Computer Architecture", course_code: "EECS2021", yearofstudy: 2 },
                                { id: 2, course_name: "2nd Year Students", course_code: "YEAR2", yearofstudy: 2 },
                            ],
                            error: null,
                        }),
                    }),
                };
            }

            if (table === "supabase_messages") {
                return {
                    select: () => ({
                        eq: () => ({
                            order: () => ({
                                data: [
                                    {
                                        id: 101,
                                        senderid: 1,
                                        sendername: "UserTest",
                                        senderyear: "2",
                                        senderprogram: "CS",
                                        content: "Hello from test!",
                                        timestamp: new Date().toISOString(),
                                        group_id: 1,
                                    },
                                ],
                                error: null,
                            }),
                        }),
                    }),
                    insert: jest.fn(() => Promise.resolve({ error: null })),
                };
            }

            return { select: () => ({ data: [], error: null }) };
        },
        channel: () => ({
            on: () => ({ subscribe: () => ({}) }),
        }),
        removeChannel: jest.fn(),
    }),
}));

describe("GroupChatScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("shows login prompt if user not logged in", async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

        render(<GroupChatScreen />);
        expect(await screen.findByText("Please log in to access group chat.")).toBeTruthy();
    });

    test("renders group list when logged in", async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
            JSON.stringify({ id: 1, name: "Test User", yearofstudy: 2, program: "CS" })
        );

        render(<GroupChatScreen />);
        expect(await screen.findByText("Computer Architecture")).toBeTruthy();
        expect(screen.getByText("2nd Year Students")).toBeTruthy();
    });

    test("prevents sending empty message", async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
            JSON.stringify({ id: 1, name: "Test User", yearofstudy: 2, program: "CS" })
        );

        render(<GroupChatScreen />);

        await waitFor(() => {
            fireEvent.press(screen.getByText("Computer Architecture"));
        });

        await waitFor(() => {
            fireEvent.press(screen.getByText("Send")); // Try to send empty
        });

        expect(screen.getByPlaceholderText("Type your message...").props.value).toBe("");
    });
});