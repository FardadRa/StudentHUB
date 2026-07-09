import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { BACKEND_URL } from "@/constants/api";
import CalendarModal from "@/components/CourseCalendar"; // ✅ Import the Calendar Modal

// Define Course Type
type Course = {
  id?: number;
  name: string;
  day: string;
  time: string;
  professor?: string | null;
  room?: string | null;
};

export default function CalendarScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modalVisible, setAddCourseModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false); // For Plot Calendar Modal

  // Temporary states for new course inputs
  const [courseName, setCourseName] = useState("");
  const [courseDay, setCourseDay] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [courseProfessor, setCourseProfessor] = useState("");
  const [courseRoom, setCourseRoom] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

const fetchCourses = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/courses`);
    const data = await res.json();
    setCourses(data);
    console.log("Updated courses state:", data); // ✅ Debug state updates
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

  const validDays = ["Mon", "Tue", "Wen", "Thur", "Fri"];

  const normalizeDay = (day: string) => {
    const dayMap: { [key: string]: string } = {
      mon: "Mon", monday: "Mon", mond: "Mon",
      tue: "Tue", tuesday: "Tue", tues: "Tue",
      wed: "Wen", wednesday: "Wen", wen: "Wen",
      thu: "Thur", thursday: "Thur", thur: "Thur",
      fri: "Fri", friday: "Fri",
    };

    return dayMap[day.toLowerCase()] || day; // Normalize input to lowercase & match
  };

  const isValidTimeFormat = (time: string) => {
    const timeRegex = /^(0?[0-9]|1[0-9]|2[0-4]):00$/; // Matches 0:00 - 24:00
    return timeRegex.test(time);
  };

  const handleAddCourse = () => {
    if (!courseName || !courseDay || !courseTime) {
      alert("Please fill in Name, Day, and Time.");
      return;
    }

    // Normalize day format
    const normalizedDay = normalizeDay(courseDay);

    const isValidCourseLength = (name: string) => {
      return name.length >= 3 && name.length <= 30;
    };

    if (!isValidCourseLength(courseName)) {
      alert("Course name must be between 3 and 30 characters.");
      return;
    }

    // Check if a course already exists at that time slot
    const courseExists = courses.some(
      (course) => course.day === normalizedDay && course.time === courseTime
    );

    //Ensure doesn't exist
    if (courseExists) {
      alert("A course is already scheduled at this time slot.");
      return;
    }

    // Ensure it's a valid day
    if (!validDays.includes(normalizedDay)) {
      alert("Invalid day. Use Mon, Tue, Wen, Thur, or Fri.");
      return;
    }

    //Ensure correct time format
    if (!isValidTimeFormat(courseTime)) {
      alert("Invalid time format. Use 24-hour format with whole hours only (e.g., 7:00, 14:00). Minutes are not allowed (e.g., 7:30, 14:24).");
      return;
    }

    fetch(`${BACKEND_URL}/api/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: courseName,
        day: normalizedDay,
        time: courseTime,
        professor: courseProfessor || null,
        room: courseRoom || null,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setCourseName("");
        setCourseDay("");
        setCourseTime("");
        setCourseProfessor("");
        setCourseRoom("");
        setAddCourseModalVisible(false);
        fetchCourses();
      })
      .catch((error) => console.error("Error adding course:", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Calendar!</Text>
      <Text style={styles.coursesHeading}>Courses:</Text>

      {courses.length === 0 ? (
        <Text style={styles.noCoursesText}>No courses yet. Add one!</Text>
      ) : (
        <ScrollView style={styles.coursesList}>
          {courses.map((course) => (
            <View key={course.id} style={styles.courseItem}>
              <Text style={styles.courseText}>
                {course.name} | {course.day} {course.time}
              </Text>
              {course.professor && <Text style={styles.courseSubText}>Prof: {course.professor}</Text>}
              {course.room && <Text style={styles.courseSubText}>Room: {course.room}</Text>}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setAddCourseModalVisible(true)}>
          <Text style={styles.buttonText}>+ Add Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.plotButton} onPress={() => setCalendarVisible(true)}>
          <Text style={styles.buttonText}>📅 Plot Calendar</Text>
        </TouchableOpacity>
      </View>

      {/* Add Course Modal */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setAddCourseModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Course</Text>
            <TextInput style={styles.input} placeholder="Course Name (Case senstive)" value={courseName} onChangeText={setCourseName} />
            <TextInput style={styles.input} placeholder="Day (i.e Mon, Tue)" value={courseDay} onChangeText={setCourseDay} />
            <TextInput style={styles.input} placeholder="Time (i.e 7:00, 13:00)" value={courseTime} onChangeText={setCourseTime} />
            <TextInput style={styles.input} placeholder="Professor (Optional)" value={courseProfessor} onChangeText={setCourseProfessor} />
            <TextInput style={styles.input} placeholder="Room (Optional)" value={courseRoom} onChangeText={setCourseRoom} />
            <View style={styles.modalButtons}>
              <View style={styles.buttonWrapper}>
                <Button title="Cancel" onPress={() => setAddCourseModalVisible(false)} color="red" />
              </View>
              <View style={styles.buttonWrapper}>
                <Button title="Add Course" onPress={handleAddCourse} color="blue" />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Plot Calendar Modal */}
      <CalendarModal
        courses={courses} // ✅ Pass course data
        visible={calendarVisible} // ✅ Pass modal visibility state
        onClose={() => setCalendarVisible(false)} // ✅ Handle closing
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  coursesHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  noCoursesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 20, // Keep spacing consistent
  },
  coursesList: {
    width: "90%",
    maxHeight: 250,
    marginBottom: 20, // Ensures spacing between list and buttons
  },
  courseItem: {
    backgroundColor: "#ffffff",
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  courseText: {
    fontSize: 14,
    fontWeight: "600",
  },
  courseSubText: {
    fontSize: 12,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 30, // Fixed margin so buttons stay in the same place
  },
  addButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  plotButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
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
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15, // Added spacing between input fields and buttons
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});


