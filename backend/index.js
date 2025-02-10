#! /usr/bin/env node

// 1. What Does #! /usr/bin/env node Mean?
// This is called a shebang (#!). It tells the system which interpreter (Node.js in this case) should execute the script.

// /usr/bin/env node: This finds the Node.js executable dynamically, ensuring compatibility across different systems (Linux, macOS, Windows with WSL).
// Without it, running ./index.js might fail unless you explicitly use node index.js.

// 2. Why Add "bin" in package.json?
// The bin field in package.json maps a command to a script, allowing you to run the CLI tool globally.
// Correct Placement (bin at the top level)  of package.json
// The "bin" field defines a global CLI command (task-tracker).
// The "scripts" field is only for local development (npm run start).

// json
// Copy
// Edit
// "bin": {
//   "task-tracker": "./index.js"
// }
// This means:

// When you install the package (npm install -g), it creates a global command called task-tracker.
// Now you can run task-tracker from anywhere instead of node index.js.


// The "bin" field defines a global CLI command (task-tracker).
// The "scripts" field is only for local development (npm run start).

// On Windows, you don’t need this step.

// 2️⃣ Link It as a Global Command
// Inside your project folder, run:
// npm link
// This registers your CLI tool system-wide. Now you can call it from anywhere.



// Main code starts from here
// #! /usr/bin/env node (already added up in the file)

const { program } = require("commander");

// Adding the response to tasks.json
const fs = require("fs");

const filePath = "./tasks.json";

// Helper function to read tasks
const loadTasks = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return []; // Return empty array if file does not exist
    }
};

// Helper function to save tasks
const saveTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Adding a new task
program
    .command("add <description>")
    .description("Add a new task")
    .action((description) => {
        const tasks = loadTasks();

        // Find the highest existing ID and increment
        const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

        const newTask = {
            id: newId,
            description,
            status: "todo",
            // createdAt: new Date().toISOString(),        // Set creation time
            // updatedAt: new Date().toISOString(),        // Initially same as createdAt
            
            createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),        // Set creation time
            updatedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),        // Initially same as createdAt
        };

        tasks.push(newTask);
        saveTasks(tasks);
        console.log(`Task added successfully (ID: ${newId})`);
    });


// Update a task
program
    .command("update <id> <newDescription>")
    .description("Update a task's description")
    .action((id, newDescription) => {
        let tasks = loadTasks();

        const taskIndex = tasks.findIndex((task) => task.id == id);
        if (taskIndex === -1) {
            console.log(`Task with ID ${id} not found.`);
            return;
        }

        tasks[taskIndex].description = newDescription;
        // tasks[taskIndex].updatedAt = new Date().toISOString();  // Update timestamp
        tasks[taskIndex].updatedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });  // Update timestamp

        saveTasks(tasks);
        console.log(`Task ${id} updated successfully.`);
    });

// Deleting a task
program
    .command("delete <id>")
    .description("Delete a task")
    .action((id) => {
        let tasks = loadTasks();
        const filteredTasks = tasks.filter((task) => task.id != id);

        if (tasks.length === filteredTasks.length) {
            console.log(`Task with ID ${id} not found.`);
            return;
        }

        saveTasks(filteredTasks);
        console.log(`Task ${id} deleted successfully.`);
    });


// mark-in-progress task
program
    .command("mark-in-progress <id>")
    .description("Mark a task as in-progress")
    .action((id) => {
        let tasks = loadTasks();
        const task = tasks.find((task) => task.id == id);

        if (!task) {
            console.log(`Task with ID ${id} not found.`);
            return;
        }

        task.status = "in-progress";                     // or "done"
        // task.updatedAt = new Date().toISOString();      // Update timestamp
        task.updatedAt= new DataTransfer().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        saveTasks(tasks);
        console.log(`Task ${id} marked as in-progress.`);
    });

// mark-done task
program
    .command("mark-done <id>")
    .description("Mark a task as done")
    .action((id) => {
        let tasks = loadTasks();
        const task = tasks.find((task) => task.id == id);

        if (!task) {
            console.log(`Task with ID ${id} not found.`);
            return;
        }

        task.status = "done";
        // task.updatedAt = new Date().toISOString();                                                  // International Standard Time
        task.updatedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });          // Indian Standard Time
        console.log(`Task ${id} marked as done.`);
    });
// console.log(program.commands.map(cmd => cmd.name()));

// // listing all task
// program
//     .command("list")
//     .description("List all tasks")
//     .action(() => {
//         const tasks = loadTasks();

//         // if (tasks.length === 0) {
//         //     console.log("No tasks found.");
//         //     return;
//         // }

//         tasks.forEach((task) => {
//             console.log(`[${task.id}] ${task.description} - ${task.status}`);
//         });
//     });
// console.log(program.commands.map(cmd => cmd.name()));


// // list done, list todo, list in-progress
// program
//     .command("list <status>")
//     .description("List tasks by status (todo, in-progress, done)")
//     .action((status) => {
//         const tasks = loadTasks();
//         const filteredTasks = tasks.filter((task) => task.status === status);

//         if (filteredTasks.length === 0) {
//             console.log(`No tasks found with status: ${status}`);
//             return;
//         }

//         filteredTasks.forEach((task) => {
//             console.log(`[${task.id}] ${task.description}`);
//         });
//     });

// List tasks (all or by status)
program
    .command("list [status]") // "status" is now an optional parameter
    .description("List all tasks or tasks by status (todo, in-progress, done)")
    .action((status) => {
        const tasks = loadTasks();

        if (status) {
            // If status is provided, filter tasks
            const filteredTasks = tasks.filter((task) => task.status === status);
            if (filteredTasks.length === 0) {
                console.log(`No tasks found with status: ${status}`);
                return;
            }
            filteredTasks.forEach((task) => {
                console.log(`[${task.id}] ${task.description}`);
            });
        } else {
            // If no status is provided, list all tasks
            if (tasks.length === 0) {
                console.log("No tasks found.");
                return;
            }
            tasks.forEach((task) => {
                console.log(`[${task.id}] ${task.description} - ${task.status}`);

                // for timeStamps at the creating/updating/in-progress/mark-done
                console.log(`   Created At: ${task.createdAt}`);
                console.log(`   Updated At: ${task.updatedAt}`);
            });
        }
    });


program.parse();



// program
//   .version("1.0.0")
//   .description("Simple Task Tracker CLI");

// // Command to add a task
// program
//   .command("add <task>")
//   .description("Add a new task")
//   .action((task) => {
//     console.log(`Task added: ${task}`);
//   });

// // update task
// program
//   .command("update <task>")
//   .description("Update a task")
//   .action((task) =>{
//     console.log(`Updated Task ${task}`);
//   });

// // delete task
// program
//   .command("delete <task>")
//   .description("Delete a task")
//   .action((task) =>{
//     console.log(`Deleted Task ${task}`);
//   });

// // Command to list all tasks
// program
//   .command("list")
//   .description("List all tasks")
//   .action(() => {
//     console.log("Displaying all tasks...");
//   });

// // Command to remove a task
// program
//   .command("remove <id>")
//   .description("Remove a task by ID")
//   .action((id) => {
//     console.log(`Task with ID ${id} removed`);
//   });

// program.parse(process.argv);
// The program.parse(process.argv) method parses the command-line arguments and executes the appropriate command based on the input.