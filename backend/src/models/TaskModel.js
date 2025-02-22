class TaskModel {
    constructor(id, title, description, isComplete, userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isComplete = isComplete;
        this.userId = userId;
    }
}

export default TaskModel;
