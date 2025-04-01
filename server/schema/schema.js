const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id: { type: Number },
    activity: { type: String },
    task: { type: String },
    status:{type:String, default:"Completed"},
    assignTo: { type: String },
    createdOn: { type: Date, default: Date.now },
    auditName: { type: String },
    startTime: { type: Date },
    conductedBy: { type: String },
    site: { type: String, default: "ABC" },
    endTime: { type: Date },
    duration: { type: String },
    percentage: { type: Number, default: 2 }
});

module.exports = mongoose.model("Task", TaskSchema);