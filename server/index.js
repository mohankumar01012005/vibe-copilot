const express = require("express");
const mongoose = require("mongoose");
const Task = require("./schema/dataSchema.js"); 
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Connection Error:", err));


  app.post("/tasks", async (req, res) => {
    try {
        const { activity, task, assignTo, startTime, endTime,conductedBy,auditName } = req.body;

        // Fetch total users count to generate the ID
        const usersCount = await Task.countDocuments();

        const newTask = new Task({
            id: usersCount + 1,
            activity,
            task,
            assignTo,
            createdOn: new Date(),
            auditName: assignTo,
            startTime,
            conductedBy: assignTo,
            endTime,
            duration: (new Date(endTime) - new Date(startTime)) / (1000 * 60) || 2 // Convert ms to minutes, default 2
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
        console.log("Error ",error);
    }
});


// Route to get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { assignTo, status } = req.body;

    try {
        const audit = await Task.findOne({id}); // Fix: Use findById()
        if (!audit) {
            return res.status(404).json({ message: "Task not found" });
        }

        audit.status = status; 
        audit.assignTo = assignTo;

        await audit.save(); 

        return res.json(audit);
    } catch (error) {
        console.error("Error", error); // Fix: Console log before response
        return res.status(500).json({ error: error.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
