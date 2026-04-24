// Todo.jsx (korije)
import Header from "./Header";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Trash, PencilIcon, CheckCircle, Circle } from "lucide-react";

function Todo() {
    const [input, setInput] = useState({ task: "", desc: "" });
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true); // Nouvo state pou swiv premye chajman

    // Charger les tâches depuis localStorage au chargement
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        console.log("Chargement depuis localStorage:", savedTasks);
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        setIsInitialLoad(false); // Make premye chajman fini
    }, []);

    // Sauvegarder les tâches dans localStorage à chaque modification
    useEffect(() => {
        // Pa sove pandan premye chajman an
        if (!isInitialLoad) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
            console.log("Sauvegarde dans localStorage:", tasks);
            
            // Si tasks vid, efase localStorage
            if (tasks.length === 0) {
                localStorage.removeItem("tasks");
                console.log("LocalStorage efase paske tasks vid");
            }
        }
    }, [tasks, isInitialLoad]);

    // Fonksyon pou jere chanjman nan input yo
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    // Fonksyon pou ajoute yon task
    const addTask = () => {
        // Tcheke si "task" la vid
        if (input.task.trim() === "" || input.desc.trim() === "") {
            setError("Please fill all input please, write anything but no blank space accept");
            return;
        }

        if (isEditing) {
            // Modifier task ki egziste deja
            setTasks(prevTasks => 
                prevTasks.map(item =>
                    item.id === editId ? { ...item, task: input.task, desc: input.desc } : item
                )
            );
            setIsEditing(false);
            setEditId(null);
        } else {
            // Ajoute nouvo task
            const newTask = {
                id: uuidv4(),
                task: input.task,
                desc: input.desc,
                completed: false
            };
            setTasks(prevTasks => [...prevTasks, newTask]);
        }

        setInput({ task: "", desc: "" });
        setError(null);
    };

    // Fonksyon pou modifye yon task
    const editTask = (id) => {
        const taskToEdit = tasks.find((item) => item.id === id);
        setInput({ task: taskToEdit.task, desc: taskToEdit.desc });
        setIsEditing(true);
        setEditId(id);
    };

    // Fonksyon pou delete yon task
    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter((item) => item.id !== id));
    };

    // Fonksyon pou toggle completed status
    const toggleComplete = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Welcome to the Todo App
                </h1>

                {/* Section pou ajoute task */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Todo List</h2>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter your task"
                            value={input.task}
                            name="task"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={input.desc}
                            name="desc"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={addTask}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
                        >
                            {isEditing ? "Update Task" : "Add Task"}
                        </button>
                    </div>
                </div>

                {/* Section pou montre tout task yo */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">New tasks Added</h2>
                    <div className="space-y-4">
                        {tasks.length === 0 ? (
                            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                                No tasks yet. Add your first task above!
                            </div>
                        ) : (
                            tasks.map((item) => (
                                <div
                                    key={item.id}
                                    className={`bg-white rounded-lg shadow-md p-6 transition duration-200 ${
                                        item.completed ? 'opacity-75' : ''
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => toggleComplete(item.id)}
                                                    className="text-gray-400 hover:text-green-500 transition duration-200 focus:outline-none"
                                                >
                                                    {item.completed ? (
                                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                                    ) : (
                                                        <Circle className="w-6 h-6" />
                                                    )}
                                                </button>
                                                <h3 className={`text-xl font-semibold ${
                                                    item.completed ? 'line-through text-gray-500' : 'text-gray-800'
                                                }`}>
                                                    {item.task}
                                                </h3>
                                            </div>
                                            <p className={`text-gray-600 mt-2 ml-9 ${
                                                item.completed ? 'line-through text-gray-400' : ''
                                            }`}>
                                                {item.desc}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => editTask(item.id)}
                                                className="text-blue-500 hover:text-blue-700 transition duration-200 focus:outline-none"
                                                title="Edit task"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => deleteTask(item.id)}
                                                className="text-red-500 hover:text-red-700 transition duration-200 focus:outline-none"
                                                title="Delete task"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;