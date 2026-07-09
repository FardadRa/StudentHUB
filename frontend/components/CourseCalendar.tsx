import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Button,
    Modal,
} from "react-native";

const days = ["Mon", "Tue", "Wen", "Thur", "Fri"]; // Mon - Fri

const hours = Array.from({ length: 25 }, (_, i) => `${i}:00`); // 0:00 - 24:00

type Course = {
    id?: number;
    name: string;
    day: string;
    time: string;
    professor?: string | null;
    room?: string | null;
};

type CalendarModalProps = {
    courses: Course[];
    visible: boolean;
    onClose: () => void;
};

export default function CalendarModal({ courses, visible, onClose }: CalendarModalProps) {
      const getCourseForSlot = (day: string, time: string) => {
        return courses.find((course) => {
          return course.day.trim() === day.trim() && course.time.trim().split(":")[0] === time.trim().split(":")[0];
        });
      };

    return (
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Course Calendar</Text>
                    <ScrollView horizontal>
                        <ScrollView>
                            <View>
                                {/* Header Row */}
                                <View style={styles.headerRow}>
                                    <Text style={styles.timeHeader}></Text>
                                    {days.map((day) => (
                                        <Text key={day} style={styles.dayHeader}>{day}</Text>
                                    ))}
                                </View>

                                {/* Time Slots */}
                                {hours.map((time) => (
                                    <View key={time} style={styles.row}>
                                        <Text style={styles.timeColumn}>{time}</Text>
                                        {days.map((day) => {
                                            const course = getCourseForSlot(day, time);
                                            return (
                                                <View key={day + time} style={styles.cell}>
                                                    {course && (
                                                        <Text style={styles.courseText}>{course.name}</Text>
                                                    )}
                                                </View>
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </ScrollView>
                    <Button title="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "95%",
        height: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "black",
    },
    timeHeader: {
        width: 50,
        textAlign: "center",
        fontWeight: "bold",
    },
    dayHeader: {
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
        paddingHorizontal: 15, // ⬅️ Added padding to space them out
        fontSize: 16, // ⬆️ Bigger font for readability
        minWidth: 80, // ⬆️ Forces more space between days
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    timeColumn: {
        width: 80, // ⬆️ Increased from 50 to 80 to take up more space
        textAlign: "center",
        fontWeight: "bold",
        borderRightWidth: 1,
        borderRightColor: "black",
    },
    cell: {
        flex: 1,
        height: 60, // ⬆️ Adjust if needed for better spacing
        minWidth: 100, // ⬆️ Make cells wider to match the extra space
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
    },
    courseText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "blue",
        padding: 5, // Increased padding
        borderRadius: 5,
        minWidth: 50, // Ensure text is readable
        textAlign: "center",
    }
});
