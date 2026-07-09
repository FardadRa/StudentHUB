# Project: StudentHUB

## Author of Logs

✨ Documented and Verified with Excellence ✨
### Author: Abdulkadir Ahmed (henceforth referred to as The Architect)

📜 Every log, update, and piece of documentation in this project has been meticulously crafted, rigorously reviewed, and proudly maintained by The Architect. These logs are more than just records—they symbolize countless hours of innovation, dedication, and refinement.

🌟 Acknowledgments:

🛠️ The Architect has devoted significant time and energy to ensure each detail is precise, clear, and impactful.

🤝 Team Collaboration: While The Architect oversees and verifies all entries, contributions from team members are always acknowledged with gratitude.

🔍 Commitment to Quality: Behind every log is a commitment to achieving the highest standards of quality and professionalism.

📌 Contributor Recognition: For collaborative efforts, the name(s) of the contributor(s) are explicitly mentioned in the relevant log entries.

📖 A Living Document: This documentation isn’t merely a summary—it’s a testament to the relentless hard work and passion poured into every phase of this project.

⚖️ Copyright and Ownership:

🚨 This documentation is the exclusive intellectual property of The Architect. Unauthorized copying, redistribution, or misrepresentation of this work as your own is both unethical and a disservice to the immense dedication that brought it to life.

🙏 Please respect the effort, the time, and the ingenuity behind this work. Every keystroke tells a story of perseverance and creativity. 🚀

## Logs (Log = Version i.e Log 1.2 = v1.2) 

### Log 1.1 1/31/2025

- **Home Page**:
  - Created the Home page with the text:  
    "Welcome to STUDENT-HUB App!"
  - **Screenshot**:  
    ![Home Page](https://i.imgur.com/buYiSAt.jpeg)

- **Calendar Page**:
  - Added a page called **Calendar** with the text:  
    "Welcome to the Calendar!"
  - **Screenshot**:  
    ![Calendar Page](https://i.imgur.com/rvEU32U.jpeg)

- **App Navigation**:
  - Used **Expo Router** to handle navigation between pages.
  - Added **tabs** for Home and Calendar.
  - Clicking the **Home** tab displays the "Welcome to STUDENT-HUB App!" page.
  - Clicking the **Calendar** tab displays the "Welcome to the Calendar!" page.

---

### Log 1.2 2/3/2025

- **New Pages and Buttons**:
  - Added two new pages and buttons for **Advising** and **Group Chat**.
    - **Advising Page** (`advising.tsx`): Displays the text: "Welcome to the Academic Advising!"
    - **Group Chat Page** (`groupchat.tsx`): Displays the text: "Welcome to the Student Group Chat!"
    
  - **Screenshot** of **Group Chat Page**:  
    ![Group Chat Page](https://i.imgur.com/aIFErUD.jpeg)

  - **Screenshot** of **Advising Page**:  
    ![Advising Page](https://i.imgur.com/qOgUtI5.jpeg)
  
  - **App Navigation**:
    - Added new buttons for **Advising** and **Group Chat** tabs in the app.
    - Clicking **Advising** tab displays the "Welcome to the Academic Advising!" page.
    - Clicking **Group Chat** tab displays the "Welcome to the Student Group Chat!" page.

---

### Log 1.3 2/5/2025

- **Website Navigation Bar**:
  - Designed and implemented a custom **Navigation Bar** for the website (web platform only).
  - Added a **logo** to the left of the navigation bar.
  - Styled **tabs** for Home, Calendar, Advising, Group Chat, and Login on the right side.
  - Verified proper navigation using `expo-router` with `Link`.

  - **Website Screenshot**:  
    ![Website Navigation Bar](https://i.imgur.com/Q7FEQmU.png)

- **Mobile Navigation Bar**:
  - Kept the navigation tabs at the bottom for mobile apps.
  - Verified the tab functionality for Home, Calendar, Advising, Group Chat, and Login.
  - Verified icons display correctly in the tab navigation.

  - **Mobile App Screenshot**:  
    ![Mobile Navigation Bar](https://i.imgur.com/uO2fC85.jpeg)

- **New Page Added**:
  - Added the **Login Page** (`signup.tsx`): Displays the text: "Redirecting..."
  - Integrated the Login tab into both the website and mobile app.

- **APK Addition**:
  - Added an `.apk` file for v1.3 to the project directory.  
  - **Note**: The APK is compatible with **Android devices only** and downloading it on other platforms will not launch the app.
  
---

### Log 1.3.1 2/7/2025

- **Mobile Navigation Enhancements**:
  - Added **icons** for the following tabs in the mobile app (Android):
    - **Calendar**
    - **Advising**
    - **Group Chat**
    - **Login**
  - Ensured icons render properly on Android devices.  
    - **Screenshot**:  
      ![Updated Mobile Navigation](https://i.imgur.com/l8cXLsn.png)

---

### Log 1.4 2/8/2025

- **Calendar Frontend Update**:
  - Added significant enhancements to the **Calendar** tab:
    - Designed a new time-slot system for better schedule visualization.
    - Introduced a "+ Add Course" button at the bottom for ease of use.
    - Improved header design with day labels: **Mon**, **Tue**, **Wed**, **Thu**, and **Fri**.
    - Styled the calendar for a clean, user-friendly interface.
  - Verified functionality and design consistency across devices.
  - **Contribution Note**: This update was implemented by **Daksh Patel**, with verification and documentation by The Architect.

  - **Screenshot of Updated Calendar**:  
    ![Calendar Tab Update](https://i.imgur.com/8mX192c.png)

---

### **Log 1.5 2/12/2025**  

- **Academic Advising Feature Update**:  
  - Enhanced the **Advising** tab with a structured prompt-based interaction system.  
  - Users can now select from three advising prompts:  
    - *"What courses should I take?"*  
    - *"How do I drop a course?"*  
    - *"When is the last day to enroll?"*  
  - **Before (Blank Advising Page)**:  
    ![Blank Advising Page](https://i.imgur.com/h0BfTLI.png)  
  - **After (3 Prompts Added)**:  
    ![Advising Page with Prompts](https://i.imgur.com/aETdVKa.png)  

- **UI & UX Enhancements**:  
  - Implemented **structured layout** for advising prompts.  
  - Improved the user experience for smoother interactions.  

- **Contribution Note**:  
  - **Developed by**: Sandeepon Saha & Fardad Rashidian.  
  - **Credits**: All implementation and logic handled by them.
  - **Verification and documentation**: Handled by The Architect.

- **Verified across devices for functionality and design consistency.**  

---

### **Log 1.6 2/14/2025**  

- **Updated Login Page**:  
  - Implemented a **basic UI** for the login page.  
  - Includes fields for:  
    - **Username**  
    - **Password**  
  - **Screenshot of Login Page**:  
    ![Login Page](https://i.imgur.com/flTNih1.png)  

- **Expanded Advising Chatbot Responses**:  
  - The chatbot now recognizes additional advising-related queries:  
    - **"How do I change my major?"**  
    - **"What are different offered Engineerings?"**  
    - **"What are some courses taken for Electrical Engineering?"**  
  - **Screenshot of Updated Chatbot**:  
    ![Updated Chatbot](https://i.imgur.com/iGYG21O.png)  

- **Contribution Note**:  
  - This update was implemented by **Daksh Patel**, with verification and documentation by **The Architect**.  

---

### **Log 1.7 3/7/2025**  

- **Massive Calendar Tab Overhaul**:
  - The entire **Calendar tab** received a **major visual and functional revamp**.
  - Implemented a **scrolling UI** that **automatically lists** all courses added.
  - Enhanced **UI/UX** to ensure smooth and intuitive navigation.

  - **Calendar Page (No Courses Added)**:
    ![Calendar Page (No Courses)](https://i.imgur.com/QgkAdEt.png)

- **New "+ Add Course" Feature**:
  - A **new modal** now appears upon clicking **"+ Add Course"**.
  - Allows users to **enter course details**, including:
    - **Course Name**
    - **Day** (Mon, Tue, Wen, Thur, Fri)
    - **Time** (24-hour format)
  - **Strict validation rules** enforced:
    - Prevents **duplicate course times**.
    - Ensures **valid day and time formats**.
    - Requires a **minimum of 3 characters** for the course name.

  - **"+ Add Course" Pop-up**:
    ![+ Add Course Modal](https://i.imgur.com/5UoqzR1.png)

- **Dynamic Course Addition**:
  - Once added, **courses instantly appear** in the **scrollable list**.
  - **Courses persist**, ensuring seamless experience.
  - Verified smooth UI updates.

  - **Calendar Page (With Courses Added)**:
    ![Calendar Page (Courses Added)](https://i.imgur.com/aImbgJU.png)

- **New "+ Plot Calendar" Feature**:
  - Clicking **"📅 Plot Calendar"** generates a **dynamic calendar**.
  - Courses **auto-populate their respective time slots**.
  - Supports **scrolling up/down & left/right** to navigate all time slots.
  - **24-hour format** used for accuracy.
  - (Potential future update: Change to **7:00 - 24:00** instead of **0:00 - 24:00**)

  - **Plot Calendar Pop-up**:
    ![Plot Calendar View](https://i.imgur.com/itCcivb.png)

  - **Scrollable View Example**:
    ![Scrollable Calendar](https://i.imgur.com/8bKPXkU.png)

- **Implemented Full Jest Unit Tests** 🧪:
  - Ensured **full coverage for core functionalities**, including:
    - **Adding Courses**
    - **Duplicate Course Prevention**
    - **Invalid Input Handling**
    - **Plot Calendar Rendering**
  - This marks a **major milestone** for **project test coverage**.

- **Technical Enhancements**:
  - Implemented **state updates** to track course changes dynamically.
  - Optimized **performance** when handling **multiple courses**.
  - Verified **backend compatibility** (planned backend expansion for future iterations).

---

## Reproduction Steps:

### **Log 1.7  - Reproduction Steps**  

1. **Clone the Repository**:  
   - Clone the project using Git:  
     ```bash
     git clone https://github.com/AbdulkadirAhmed1/StudentHUB-Project.git
     cd mainApp
     ```

2. **Start the Project**:  
   - Run the following command to start the **Expo development server**:  
     ```bash
     npx expo start
     ```
   - Scan the **QR code** with the **Expo Go** app or open the app in the browser.

3. **Calendar Tab Overhaul**:  
   - Open the **Calendar tab**.
   - Observe the **new UI layout** and **scrollable course list**.
   - Click **"+ Add Course"** and **input valid details**.

4. **Test Course Addition**:  
   - Add a course using the modal.
   - Confirm that the course **instantly appears in the list**.

5. **Test "+ Plot Calendar" Feature**:  
   - Click **"📅 Plot Calendar"**.
   - Ensure courses appear in their correct **time slots**.
  
6. **Run Jest Unit Tests** (Ensure test cases pass):  
     ```bash
     npx expo start
     ```
---

## Next Steps:

### Log 1.1 1/31/2025

- **To Test**: 
   - Open the app on Expo Go or in a browser.
   - Confirm both tabs (Home and Calendar) load correctly.
   - Verify that the text matches the updates mentioned above.

### Log 1.2 2/3/2025

- **To Test**:
   - Open the app on Expo Go or in a browser.
   - Confirm all tabs (Home, Calendar, Advising, and Group Chat) load correctly.
   - Verify that the text matches the updates mentioned above.
   - Ensure the buttons for **Advising** and **Group Chat** work and display the correct pages.

### Log 1.3 2/3/2025

- **Styling Enhancements**:
  - Ensure consistency in styles across both mobile and web platforms.
  - Add icons for all tabs on mobile for better UX.

- **To Test**:
   - Open the app on Expo Go or in a browser.
   - Confirm all tabs (Home, Calendar, Advising, Group Chat and Login) load correctly.
   - Verify that the text matches the updates mentioned above.
   - Ensure the button for **Login** work and display the correct pages.

- **Testing**:
  - Verify navigation works seamlessly on all platforms.
  - Conduct UI tests for both web and mobile platforms.

### Log 1.3.1 2/7/2025

- **Styling Enhancements**:
  - Ensure consistency in styles across both mobile and web platforms.
  - Improve the visual design of the navigation bar for a cleaner and more professional look.
  - Verify that icons and text are correctly aligned across devices.

- **Testing**:
  - Verify navigation works seamlessly on all platforms.
  - Conduct UI tests for both web and mobile platforms.
  - Ensure that tab icons render correctly across different devices.

- **APK Distribution**:
  - Test the `.apk` on various Android devices to confirm stability.
  - Optimize the APK size for better performance.
  - Plan for future deployments and app store submission.

### Log 1.4 2/8/2025

- **Backend Integration**:
  - Begin setting up the backend for the calendar feature using **Node.js** and **Express.js**.
  - Host the backend on **Render** and connect it to the frontend.git

- **Database Setup**:
  - Collaboratively design and implement the **PostgreSQL/MongoDB** database schema with the team.
  - Ensure seamless integration of backend APIs with the database and frontend.

- **Testing**:
  - Verify the "Add Course" button functionality after backend integration.
  - Conduct UI and functionality tests for the updated calendar tab.
  - Ensure cross-platform compatibility and performance.

- **Future Releases**:
  - Plan for the next pre-release with backend and database functionalities integrated.
  - Finalize and optimize features for production readiness.

### Log 1.5 2/12/2025

- **To Test**:  
  - Open the app on **Expo Go** or in a web browser.  
  - Navigate to the **Advising tab** and confirm the new advising prompts appear.  
  - Select each prompt and verify that they return the expected response.  
  - Ensure that UI elements display correctly across different screen sizes and devices.  

- **Styling & UX Enhancements**:  
  - Further refine the advising layout for better readability.  
  - Improve button styling and alignment for a **seamless user experience**.  

- **Testing**:  
  - Verify navigation between prompts works **without errors**.  
  - Ensure all advising prompts function as expected.  
  - Conduct UI tests to **verify mobile and tablet responsiveness**.  

- **Database Integration**:  
  - Begin integrating **PostgreSQL/MongoDB** for managing advising data.  
  - Store student queries and responses for **better advising insights**.  
  - Enable adding courses dynamically in the **Calendar tab**.  
  - Allow students to **book advising sessions** directly from the app.  

- **Future Features**:  
  - Expand advising prompts to include **more academic-related queries**.  
  - Implement **dynamic response handling** for advising questions.  
  - Introduce **personalized advising recommendations** based on user input.  
  - Ensure seamless backend integration with frontend for **real-time course updates**.  

### Log 1.6 2/12/2025

- **User Authentication Implementation**:  
  - Begin setting up **user authentication** for login functionality.  
  - Secure login credentials using **backend authentication & database storage**.  

- **Database Expansion (PostgreSQL)**:  
  - Store **user credentials** for secure login.  
  - Expand the **chatbot database** to allow a wider range of advising responses.  

- **Testing & Enhancements**:  
  - Conduct **UI tests** for the login page.  
  - Ensure **seamless integration** of chatbot updates across all devices.  
  - Verify that new advising chatbot responses work as expected. 

### Log 1.7 3/7/2025

- **Backend API Development (Node.js & Express)**:
  - Ensure seamless **backend integration** with the **frontend UI**.

- **Optimize Calendar Layout**:
  - Adjust time range from **0:00-24:00** to **7:00-24:00**.
  - Improve spacing and readability for better usability.

- **Enhance Course Input Validations**:
  - Add **professor names & room numbers** (Optional fields currently, but UI will show them).
  - Implement **better error handling messages** for user clarity.