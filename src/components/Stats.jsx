function Stats({ total, read, reading, unread, goal, progress, onGoalChange}) {
    return (
        <div className="stats-container">
            <h2>📈 reading stats</h2>
            <p><strong>total books: </strong> {total}</p>
            <p><strong>read: </strong> {read}</p>
            <p><strong>currently reading: </strong> {reading}</p>
            <p><strong>unread: </strong> {unread}</p>
            <p>
                <strong>goal: </strong>
                <input 
                    type="number"
                    value={goal}
                    onChange={(e) => onGoalChange(Number(e.target.value))}
                    style={{width: "60px", marginLeft: "0.5rem"}}
                />
                books
            </p>
            <p><strong>progress: </strong>{progress}%</p>
            <progress value={progress} max="100"></progress>
        </div>
    );
}

export default Stats;