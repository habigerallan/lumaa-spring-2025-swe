import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchTasks } from "../api/api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import getUsernameFromJWT from "../util/JWTUtil";
import { useAuth } from "../context/AuthContext";

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
  userId: number;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "80%",
    position: "absolute",
    left: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  taskList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "15px",
  },
  title: {
    fontSize: "4vh",
    userSelect: "none",
  },
  subtitle: {
    fontSize: "3vh",
    fontStyle: "italic",
    color: "rgb(77, 77, 77)",
    userSelect: "none",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "0 5px",
    width: "20%"
  },
  addButton: {
    backgroundColor: "#007BFF",
    color: "white",
  },
  logoutButton: {
    backgroundColor: "#DC3545",
    color: "white",
  },
  searchBox: {
    padding: "5px",
    fontSize: "16px",
    width: "60%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const { logout } = useAuth();
  const username = getUsernameFromJWT();


  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [tasks, searchQuery]
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Tasks</h2>
      <h3 style={styles.subtitle}>{`Welcome, ${username}`}</h3>

      <div style={styles.header}>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchBox}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button style={{ ...styles.button, ...styles.addButton }} onClick={() => setShowForm(true)}>
          Add
        </button>
        <button style={{ ...styles.button, ...styles.logoutButton }} onClick={logout}>
          Logout
        </button>
      </div>

      {showForm && <TaskForm refresh={loadTasks} onCancel={() => setShowForm(false)} />}

      <div style={styles.taskList}>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            refresh={loadTasks}
          />
        )}
      </div>
    </div>
  );
};

export default TasksPage;
