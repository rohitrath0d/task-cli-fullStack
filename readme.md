# https://roadmap.sh/projects/task-tracker
# Task Tracker (CLI + Web)  
A simple **Task Tracker** available as both a **Command Line Interface (CLI) tool** and a **Web Application**. The CLI version is built with **Node.js** and **Commander.js**, while the frontend is built with **React.js**, providing an intuitive user experience. Tasks are stored in a **JSON file (CLI)** and **local storage/database (Web App)**, ensuring persistence across sessions.  

---  

## 🔥 Features  
✅ Add, update, delete tasks | ✅ Mark tasks as **in-progress** or **done** | ✅ List all tasks or filter by status | ✅ Stores tasks persistently | ✅ **Timestamps** stored in **IST (Indian Standard Time)**  

---  

# 📥 Installation  

## CLI Task Tracker  
### Prerequisites  
- **Node.js** (>=14.0)  
- **npm** (comes with Node.js)  

### Setup  
```sh
# Clone the repository  
git clone <repo-link>  
cd task-tracker  

# Install dependencies  
npm install  

# Make the script globally executable (optional)  
npm link  
```  

## Web Task Tracker  
### Prerequisites  
- **Node.js** (>=14.0)  
- **npm** (comes with Node.js)  

### Setup  
```sh
# Navigate to the frontend directory  
cd frontend  

# Install dependencies  
npm install  

# Start the development server  
npm run dev  
```  

---

# 🚀 Usage  

## ➕ CLI - Add a new task  
```sh
task-cli add "Buy groceries"  
# Output: Task added successfully (ID: 1)  
```

## ➕ Web - Add a new task  
1️⃣ Open the **Task Tracker Web App**  
2️⃣ Enter the task description  
3️⃣ Click on the **Add Task** button  

---

## ✏️ Update a Task  

### CLI  
```sh
task-cli update 1 "Buy groceries and cook dinner"  
# Output: Task 1 updated successfully.  
```

### Web  
1️⃣ Click the **Edit** button next to the task  
2️⃣ Modify the task description  
3️⃣ Click **Save Changes**  

---

## ❌ Delete a Task  

### CLI  
```sh
task-cli delete 1  
# Output: Task 1 deleted successfully.  
```

### Web  
1️⃣ Click the **Delete** button next to the task  
2️⃣ Confirm the deletion  

---

## ⏳ Mark a Task as In-Progress  

### CLI  
```sh
task-cli mark-in-progress 1  
# Output: Task 1 marked as in-progress.  
```

### Web  
1️⃣ Click on the **In-Progress** button next to the task  

---

## ✅ Mark a Task as Done  

### CLI  
```sh
task-cli mark-done 1  
# Output: Task 1 marked as done.  
```

### Web  
1️⃣ Click on the **Done** button next to the task  

---

## 📜 List all tasks  

### CLI  
```sh
task-cli list  
# Output:  
# [1] Buy groceries - todo  
# [2] Write report - in-progress.  
```

### Web  
1️⃣ Open the **Task Tracker Web App**  
2️⃣ View the list of tasks on the homepage  

---

# 📂 Task Structure  
```sh
# Each task is stored in tasks.json (CLI) or local storage/database (Web) with the following structure:
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "09/02/2024, 12:00:00 AM",
  "updatedAt": "09/02/2024, 12:00:00 AM"
}
```

---

# 🔄 Workflow  

- 1️⃣ Users can **add tasks** using CLI or Web App  
- 2️⃣ Tasks are stored in a **JSON file (CLI)** or **database (Web App)**  
- 3️⃣ Users can **update, delete, or mark tasks** using corresponding commands or UI  
- 4️⃣ Listing commands and UI allow users to **filter tasks based on status**  
- 5️⃣ All timestamps are stored in **IST (Indian Standard Time)**  

---

# 🖥️ Tech Stack  

### CLI  
- **Node.js**  
- **Commander.js**  

### Web  
- **React.js**  
- **Tailwind CSS**  
- **Vite**  

---

# 📜 License  
This project is open-source and free to use under the MIT License.  

---

# 🎯 Happy Task Tracking! 🚀  
