import { useEffect, useState } from "react";
import { createTask, updateTask } from "../api/api";

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    margin: "1% 2% 2% 1%",
    width: "40%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(226, 226, 226)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
    border: "3px solid rgb(78, 78, 78)",
    boxShadow: "0 4px 8px rgb(0, 0, 0)",
  },
  h2: {
    textAlign: "center",
    fontSize: "3vh",
  },
  input: {
    width: "80%",
    marginTop: "1%",
    border: "2px solid rgb(0, 0, 0)",
    borderRadius: "5px",
    padding: "1%",
    fontSize: "2vh",
  },
  textarea: {
    width: "80%",
    marginTop: "1%",
    border: "2px solid rgb(0, 0, 0)",
    borderRadius: "5px",
    padding: "1%",
    fontSize: "2vh",
  },
  buttons: {
    width: "90%",
    margin: "2% 0% 2% 0%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    width: "40%",
    backgroundColor: "rgb(60, 122, 216)",
    color: "white",
    borderRadius: "4px",
    fontSize: "2vh",
    cursor: "pointer",
    padding: "1%",
    marginRight: "1%",
    border: "2px solid rgb(0, 0, 0)",
    userSelect: "none",
  },
  cancelButton: {
    width: "40%",
    backgroundColor: "rgb(197, 37, 37)",
    color: "white",
    borderRadius: "4px",
    fontSize: "2vh",
    cursor: "pointer",
    padding: "1%",
    marginLeft: "1%",
    border: "2px solid rgb(0, 0, 0)",
    userSelect: "none",
  },
  error: {
    color: "red",
    textAlign: "center" as "center",
    marginBottom: "10px",
  },
};

const TaskForm = ({ refresh, onCancel, existingTask = null }: { refresh: () => void; onCancel: () => void; existingTask?: any | null; }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
    }
  }, [existingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      
      if (existingTask) {
        await updateTask(existingTask.id, { title, description, is_complete: existingTask.isComplete });
      } else {
        await createTask({ title, description });
      }

      setTitle("");
      setDescription("");
      setError("");
      refresh();
      onCancel();
    } catch (err) {
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.h2}>{existingTask ? "Edit Task" : "Create a Task"}</h2>
          {error && <p style={styles.error}>{error}</p>}
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Name"
            style={styles.input}
          />
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            rows={3}
            style={styles.textarea}
          />

          <div style={styles.buttons}>
            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? "Adding..." : "Add Task"}
            </button>

            <button type="button" onClick={onCancel} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
