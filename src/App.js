import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"



const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('https://server-task-tracker.herokuapp.com/tasks/')
    const data = await res.json()

    //console.log(data)
    return data
  }

  //fetch task -
  const fetchTask = async (id) => {
    const res = await fetch(`https://server-task-tracker.herokuapp.com/tasks/${id}`)
    const data = await res.json()

    //console.log(data)
    return data
  }


  //Add task
  const addTask = async (task) => {
    //console.log(task)
    //const id = Math.floor(Math.random() * 10000) + 1
    //const newTask = { id, ...task }
    //setTasks([...tasks, newTask])

    const res = await fetch('https://server-task-tracker.herokuapp.com/tasks/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  //Delete tasks
  const deleteTask = async (id) => {
    await fetch(`https://server-task-tracker.herokuapp.com/tasks/${id}`, {
      method: 'DELETE',
    })
    //console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const tasktToToggle = await fetchTask(id)
    const updTask = { ...tasktToToggle,
    reminder: !tasktToToggle.reminder}

    const res = await fetch(`https://server-task-tracker.herokuapp.com/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask) 
    })

    const data = await res.json()
    //console.log(id);
    setTasks(
      tasks.map((task) => task.id === id
      ? { ...task, reminder: data.reminder } : task)
    )
  } 
  return (
    <Router>
      
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask} />
      <Routes>
      <Route path='/' exact element={ 
        <>
          {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleReminder}
      />
      ) : (
        'No tasks available'
      )}
        </>
      } />
      
      <Route path='/about' element={<About/>} />
      </Routes>
      <Footer />
    </div>
   
    </Router>
  );
}

export default App;
