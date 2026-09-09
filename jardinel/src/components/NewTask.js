import { useState } from 'react';
import TaskDetails from './TaskDetails';

const NewTask = () => {

    const [getTname, setTname] = useState("");
    const [getTpriority, setTpriority] = useState(1);
    const [getTsubtask, setTsubtask] = useState("");
    const [getSubtaskList, setSubtaskList] = useState([]);
    const [getTdescription, setTdescription] = useState("");
    const [getTduration, setTduration] = useState(0);

    const [getNewTask, setNewTask] = useState({});
    const [getAllTasks, setAllTasks] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [nextId, setNextId] = useState(1);

    const changeTname = (text) => {
        setTname(text);
        console.log(getTname);
    };
    const changeTpriority = (text) => {
        setTpriority(text);
    };
    const changeTsubtask = (text) => {
        setTsubtask(text);
    };
    const changeTdescription = (text) => {
        setTdescription(text);
    };
    const changeTduration = (text) => {
        setTduration(text);
    };

    const addSubtask = () => {
        if (getTsubtask.trim() === "") {
            alert("Please enter a sub task first.");
            return;
        }
        const newSubtaskList = [...getSubtaskList, getTsubtask];
        setSubtaskList(newSubtaskList);
        setTsubtask("");
    };

    const removeSubtask = (index) => {
        const updatedSubtasks = getSubtaskList.filter((_, i) => i !== index);
        setSubtaskList(updatedSubtasks);
    };

    const isNameTaken = () => {
        const nameToCheck = getTname.trim().toLowerCase();
        return getAllTasks.some((task) => {
            if (isEditing && task.id === currentId) {
                return false;
            }
            return task.tname.trim().toLowerCase() === nameToCheck;
        });
    };

    const validateTask = () => {
        if (getTname.trim() === "" || getTname.trim().length < 5) {
            alert("Task name is required and must be at least 5 characters.");
            return false;
        }
        if (isNameTaken()) {
            alert("A task with that name already exists. Task names must be unique.");
            return false;
        }
        if (getTpriority < 1 || getTpriority > 10) {
            alert("Priority level should be at least 1 and max of 10.");
            return false;
        }
        if (getSubtaskList.length < 1) {
            alert("You need to have at least 1 sub task.");
            return false;
        }
        if (getTdescription.trim() === "" || getTdescription.trim().length < 3) {
            alert("Task description should not be empty and have at least 3 characters.");
            return false;
        }
        if (getTduration < 60) {
            alert("Task duration should be a minimum of 1 hour.");
            return false;
        }
        return true;
    };

    const createNewTask = () => {
        if (!validateTask()) {
            return;
        }
        const theNewTask = {
            id: nextId,
            tname: getTname,
            tpriority: Number(getTpriority),
            tsubtasks: getSubtaskList,
            tdescription: getTdescription,
            tduration: Number(getTduration)
        };
        const newSetOfTasks = [...getAllTasks, theNewTask];
        setNewTask(theNewTask);
        setAllTasks(newSetOfTasks);
        setNextId(nextId + 1);
        clearForm();
    };

    const updateTask = () => {
        if (!validateTask()) {
            return;
        }
        const updatedTask = {
            id: currentId,
            tname: getTname,
            tpriority: Number(getTpriority),
            tsubtasks: getSubtaskList,
            tdescription: getTdescription,
            tduration: Number(getTduration)
        };
        const updatedTaskList = getAllTasks.map((task) =>
            task.id === currentId ? updatedTask : task
        );
        setAllTasks(updatedTaskList);
        clearForm();
    };

    const editInfo = (id) => {
        const taskToEdit = getAllTasks.find((task) => task.id === id);
        setTname(taskToEdit.tname);
        setTpriority(taskToEdit.tpriority);
        setSubtaskList(taskToEdit.tsubtasks);
        setTdescription(taskToEdit.tdescription);
        setTduration(taskToEdit.tduration);
        setIsEditing(true);
        setCurrentId(id);
    };

    const deleteInfo = (id) => {
        const updatedTaskList = getAllTasks.filter((task) => task.id !== id);
        setAllTasks(updatedTaskList);
        if (isEditing && currentId === id) {
            clearForm();
        }
    };

    const clearForm = () => {
        setTname("");
        setTpriority(1);
        setTsubtask("");
        setSubtaskList([]);
        setTdescription("");
        setTduration(0);
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <>
            <h1>MY SCHEDULED TASKS</h1>
            <hr />
            <h2>CREATE A TASK</h2>
            <div className="field-row"><label className="field-label">TASK NAME:</label>
                <input type='text' value={getTname} onChange={(e) => { changeTname(e.target.value) }} minLength={5} required />
            </div>
            <div className="field-row"><label className="field-label">PRIORITY LEVEL:</label>
                <input type='range' min={1} max={10} value={getTpriority} onChange={(e) => { changeTpriority(e.target.value) }} />
                {getTpriority}
            </div>
            <div className="field-row"><label className="field-label">SUB TASK:</label>
                <input type='text' value={getTsubtask} onChange={(e) => { changeTsubtask(e.target.value) }} />
                <button onClick={addSubtask}>ADD SUB TASK</button>
            </div>
            <ul>
                {
                    getSubtaskList.map((sub, index) => {
                        return (
                            <li key={index}>{sub} <button onClick={() => removeSubtask(index)}>REMOVE</button></li>
                        )
                    })
                }
            </ul>
            <div className="field-row"><label className="field-label">TASK DESCRIPTION:</label>
                <input type='text' value={getTdescription} onChange={(e) => { changeTdescription(e.target.value) }} minLength={3} required />
            </div>
            <div className="field-row"><label className="field-label">TASK DURATION IN MINUTES:</label>
                <input type='number' value={getTduration} onChange={(e) => { changeTduration(e.target.value) }} />
            </div>
            <div>
                {isEditing ? (
                    <button onClick={updateTask}>UPDATE</button>
                ) : (
                    <button onClick={createNewTask}>REGISTER</button>
                )}
                <button onClick={clearForm}>CLEAR</button>
            </div>
            <hr />
            <h2>LIST OF MY TASKS</h2>
            {
                getAllTasks.map((element) => {
                    return (
                        <TaskDetails key={element.id} tinfo={element} onDelete={() => deleteInfo(element.id)} onEdit={() => editInfo(element.id)} />
                    )
                })
            }
        </>
    );
};

export default NewTask;