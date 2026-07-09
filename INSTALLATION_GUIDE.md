# **🛠️ StudentHUB Installation Guide**  

## **Authored by The Architect (Abdulkadir Ahmed)**  

---

## **📌 Overview**  
This guide provides both a **high-level and low-level** overview of how to **set up, test, and understand** the **StudentHUB** app.  

The **installation process is straightforward**, but **understanding how the project will evolve over time** is where things get interesting.  

### **📌 Why High & Low Level?**  
- At a **high level**, getting the app up and running is simple—just follow the setup instructions.  
- At a **low level**, this project follows a **long-term roadmap**, structured into **generations**, each improving the app step by step.  

This journey started as a small idea and grew into a **structured, multi-generation vision**. If you're curious about how far it's come, check out **[BRAINSTORMING.txt](StudentHUB-Project/BRAINSTORMING)**—it's a cool reminder of how ideas evolve over time.  

📌 **How It Started vs. How It's Going**  
- **BRAINSTORMING.txt** is where the first thoughts were put together—back then, the **platform (website vs. mobile app) was undecided**, and the **database-backend connection was uncertain**.  
- Over time, through **real-world software development**, everything became structured into **clear development phases (generations)**.  
- Now, StudentHUB is designed to grow from a **mobile app → website → desktop application**, with each generation bringing something new.  

For **testing purposes**, only the **frontend** needs to be downloaded and set up. The **backend is already hosted remotely**, so API requests will work automatically.  

Additionally, an **APK file** is released for every version, allowing **manual installation for Android testing** if preferred.  

---

## **🔵 BASIC VIEW vs. 🔴 GOING DEEPER**  
That’s enough of me talking… **now you choose your path.**  

🔵 **Take the blue pill** – just follow the simple steps and run the app.  

🔴 **Take the red pill** – dive deeper into the vision, see where this project is going, and explore the structured development plan.  

The choice is yours.  

---

# **🔵 BASIC VIEW: Just Want to Run It?**  
(If you just want to **application** without worrying about the details, this section is for you!)  

## **🚀 How to Set Up the Frontend**  
For detailed setup and step-by-step instructions, refer to the **Frontend Setup Guide**:  

📌 **[Frontend Setup Guide](frontend/FRONTEND_SETUP.md)**  

This guide contains:  
- How to install dependencies  
- How to start the Expo server  
- How to run the app on a device, emulator, or browser  

The **StudentHUB frontend** is built with **React Native & Expo**, ensuring cross-platform compatibility.  

---

# **🔴 GOING DEEPER: Want to See the Future?**  
(*You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes...*)  

## **📜 Generational Development Plan**  

The **StudentHUB project** is structured into **generations**, each focusing on different development aspects.  

### **📱 1st & 2nd Generation (Mobile App Focus)**  
- **1st Generation (v1.1 - v.x.x)** → **Initial development phase**, setting up the **core app structure, UI, and backend integration**.  
  - This phase follows the **Big User Stories and Detailed User Stories standard**, ensuring structured development.  
  - 📌 **Refer to:** `StudentHUB-Project/Student-HUB Project ITR0 (copy 1.1).pdf` [ITR0](Student-HUB%20Project%20ITR0(copy%201.1).pdf) for detailed planning and breakdown of features.  
  - The **focus is on completing core functionalities** before expanding further in later generations.    
- **2nd Generation (v2.1 - v.x.x)** → **Advanced mobile app development**, focusing on making the app **production-ready** for **millions of users**.  
- 🚀 **Once the mobile app is complete (App Store-ready), development shifts to the website.**  

### **🌍 3rd Generation (Website Development Focus)**  
- **3rd Generation (v3.1 - v.x.x)** → **Dedicated web version development** with a **fully functional online platform**.  
- 🔹 **Goal:** Ensure the website is **searchable**, user-friendly, and has **its own separate design & functionality**.  
- 📌 **The website will be hosted with a custom domain & optimized for search engines.**  

### **💻 4th Generation (Desktop Application Focus)**  
- **4th Generation (v4.1 - v.x.x)** → Expanding **StudentHUB** into a **desktop application**.  
- 🔹 **Goal:** Provide a **native desktop experience** that integrates seamlessly with existing mobile & web platforms.  
- 📌 **The desktop version will be downloadable from the official website.**  

### **🚀 5th Generation & Beyond**  
- **5th Generation+** → Continuous updates, security patches, AI/ML features, and future scalability.  

---

## **📱 Android APK for Testing (Planned for 2nd Generation)**  
In **Version 2.0 (2nd Generation)**, an **APK file** will be provided for **Android testing**, allowing users to install and test the app **without needing Expo or a development environment**.  

- Once available, the **latest release** can be found in the **"Releases" section** of this repository.  
- This option is **not available in Version 1.x** but will be introduced in **Version 2.0**.  

### **🔹 Beta APK (Version 1.3 Pre-Release)**  
- **Version 1.3 included an APK file**, but this was a **pre-release (Beta version)** for testing purposes.  
- The **APK for v1.3 is compatible with Android devices only** and can be found in the **"Pre-releases" section** of this repository.  
- This version was primarily used for **early testing** and is **not the final stable release**.  

For now, **testing requires running the frontend locally** using Expo. Follow the **Frontend Setup Guide** for detailed installation steps.  

---

## **📜 Developer Logs & Versioning**  

### **📝 DevLogsFrontEnd.md**  
📌 **Location:** `StudentHUB-Project/frontend/DevLogsFrontEnd.md` [DevLogsFrontEnd](frontend/DevLogsFrontEnd.md)

- Contains a **detailed walkthrough** of all frontend changes from **Log 1.1 to Log x.x**.  
- Tracks UI updates, feature additions, and any modifications made to the frontend.  
- Changes in the frontend are referred to as **"Logs"** (e.g., Log 1.1, Log 1.2, etc.).  

---

### **🛠️ DevLogsBackEnd.md**  
📌 **Location:** `StudentHUB-Project/backend/DevLogsBackEnd.md` [DevLogsBackEnd](backend/DevLogsBackEnd.md)

- Documents backend updates, API changes, database modifications, and optimizations.  
- Backend changes are named **"Versions"** (e.g., `back v1.0`, `back v2.0`).  
- These backend versions do not follow a **linear** relationship with frontend logs but exist separately.  

---

### **🔖 Project Versioning (Tags)**  
- The **entire project** follows a versioning system (e.g., `v1.1.0` - `vx.x.x`) which closely correlates the projects generation.  
- Some **tags correspond to specific Logs/Back Versions**, but it is **not a linear progression**.  
- When reviewing changes, **Logs (frontend)** and **Back Versions (backend)** should be seen as **separate entities**, rather than being directly tied to overall project versions.  

---

## **📖 StudentHUB Documentation**  
📌 **This project maintains structured documentation for clarity and easy testing.**  

- **Installation & Setup:** 📌 **[Frontend Setup Guide](frontend/FRONTEND_SETUP.md)**  
- **Developer Logs:**  
  - 📝 **Frontend Updates:** `DevLogsFrontEnd.md`  
  - 🛠 **Backend Updates:** `DevLogsBackEnd.md`  
- **Versioning & Releases:** Tags (`v1.x.x` - `v2.x.x`), front end logs (`Log 1.x` to `Log 4.x`) and separate backend versions (`back v1.x`, `back v2.x`)  

For any issues, please refer to the **StudentHUB documentation** and setup files or contact me directly. 🚀  
