import { useEffect, useState } from "react";
import { deleteTask, updateTask } from "../api/api";
import TaskForm from "./TaskForm";

const styles: Record<string, React.CSSProperties> = {
  li: {
    margin: "1% 0 1% 0",
    padding: "10px",
    border: "1px solid rgb(0, 0, 0)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDetails: {
    flexGrow: 1,
    width: "70%",
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px",
  },
  description: {
    overflowY: "auto",
    wordWrap: "break-word",
  },
  completeCheckbox: {
    margin: "0 10px",
  },
  completeButton: {
    margin: "5px 10px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "white",
  },
  incompleteButton: {
    margin: "5px 10px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#ffc107",
    color: "black",
  },
  buttons: {
    display: "flex",
  },
  button: {
    margin: "5px 10px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#007BFF",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#DC3545",
    color: "white",
  },
};

const TaskItem = ({ task, refresh }: { task: any; refresh: () => void; }) => {
  const [taskState, setTaskState] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTaskState(task);
  }, [task]);

  const completeTask = async () => {
    try {
      const updatedTask = await updateTask(taskState.id, {
        title: taskState.title,
        description: taskState.description,
        is_complete: !taskState.isComplete,
      });

      console.log(taskState.isComplete);
      console.log(updatedTask.data);

      setTaskState(updatedTask.data);
      refresh();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <TaskForm
          refresh={refresh}
          onCancel={handleCancelEdit}
          existingTask={taskState}
        />
      ) : <></>}
    <li style={styles.li}>
      <div style={styles.taskDetails}>
        <strong>Title: {taskState.title}</strong>
        <p style={styles.description}>Description: {taskState.description}</p>
      </div>

      <button
        style={taskState.isComplete ? styles.completeButton : styles.incompleteButton}
        onClick={completeTask}
      >
        {taskState.isComplete ? "Complete" : "Incomplete"}
      </button>

      <div style={styles.buttons}>
        <button
          style={{ ...styles.button, ...styles.editButton }}
          onClick={handleEditClick}
        > Edit
        </button>
        <button
          style={{ ...styles.button, ...styles.deleteButton }}
          onClick={() => deleteTask(taskState.id).then(refresh)}
        >
          Delete
        </button>
      </div>
    </li>
    </>
  );
};

export default TaskItem;