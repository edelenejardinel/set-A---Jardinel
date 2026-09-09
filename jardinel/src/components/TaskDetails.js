const TaskDetails = (props) => {
    console.log(props);
    const { tname, tpriority, tsubtasks, tdescription, tduration } = props.tinfo;

    const getPriorityLabel = () => {
        if (tpriority <= 3) {
            return "NOT IMPORTANT";
        } else if (tpriority <= 7) {
            return "STANDARD";
        } else {
            return "IMPORTANT";
        }
    };

    const getDurationLabel = () => {
        const hours = tduration / 60;
        return hours > 24 ? "LONG TASK" : "SHORT TASK";
    };

    return (
        <>
            <hr />
            <h3>{tname}</h3>
            <h4>PRIORITY: {tpriority} - {getPriorityLabel()}</h4>
            <h4>{getDurationLabel()} ({tduration} MINS)</h4>
            <p>{tdescription}</p>
            <p>SUB TASKS:</p>
            <ul>
                {
                    tsubtasks.map((sub, index) => {
                        return (
                            <li key={index}>{sub}</li>
                        )
                    })
                }
            </ul>
            <button onClick={props.onDelete}>DELETE</button>
            <button onClick={props.onEdit}>EDIT</button>
        </>
    );
};

export default TaskDetails;