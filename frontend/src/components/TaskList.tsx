import Task from "../interfaces/Task";
import TaskItem from "./TaskItem";

const styles: Record<string, React.CSSProperties> = {
  ul: {
    padding: 0,
    width: "100%",
    borderBottom: "1px solid rgb(0, 0, 0)"
  }
}

const TaskList = ({ tasks, refresh }: { tasks: Task[]; refresh: () => void; }) => {
  if (tasks.length === 0) {

  }
  return (
    <>
      <ul style={styles.ul}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} refresh={refresh} />
        ))}
      </ul>
      {tasks.length === 0 ? <p>nothing to show...</p> : <p>showing {tasks.length} task(s)...</p>}
    </>
  );
};

export default TaskList;
