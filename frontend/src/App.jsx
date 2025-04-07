import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim()) return;
    await axios.post('/api/tasks', { title, description });
    setTitle('');
    setDesc('');
    fetchTasks();
  };

  const markDone = async (id) => {
    await axios.patch(`/api/tasks/${id}/done`);
    fetchTasks();
  };

  return (
    <div style={styles.page}>
      <div style={styles.rightPane}>
        <h2 style={styles.header}>➕ Add New Task</h2>
        <div style={styles.form}>
          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            style={{ ...styles.input, height: 60 }}
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Task description"
          />
          <button style={styles.addBtn} onClick={createTask}>Add Task</button>
        </div>
      </div>

      <div style={styles.leftPane}>
        <h2 style={styles.header}>📝 Task List</h2>
        <div style={styles.taskList}>
          {tasks.map(task => (
            <div key={task.id} style={styles.taskCard}>
              <div>
                <h3 style={styles.taskTitle}>{task.title}</h3>
                <p style={styles.taskDesc}>{task.description}</p>
              </div>
              <button style={styles.doneBtn} onClick={() => markDone(task.id)}>✅ Done</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',  // Light background
    padding: '20px',
    boxSizing: 'border-box',
  },
  leftPane: {
    flex: 2,
    padding: 30,
    overflowY: 'auto',
    borderRadius: 12,
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',  // Modern shadow for left pane
  },
  rightPane: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',  // Modern shadow for right pane
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  input: {
    padding: 15,
    fontSize: 16,
    border: '1px solid #ddd',
    borderRadius: 10,
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
  },
  addBtn: {
    padding: 15,
    fontSize: 16,
    background: 'linear-gradient(45deg, #800080, #4b0082)',  // Gradient background
    color: 'white',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease',
    boxSizing: 'border-box',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  taskDesc: {
    fontSize: 14,
    color: '#555',
    margin: '5px 0',
  },
  doneBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 15px',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

export default App;
