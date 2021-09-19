export const taskActions = {
    addTask(task) {
        console.log('AddTask')
        return { type: "AddTask", task }
    },
    deleteTask(task) {
        console.log('deleteTask')
        return { type: "deleteTask", task }
    },
    editTask(task) {
        console.log('editTask')
        return { type: 'editTask', task }
    }


}
const instate = {
    tasks: []
}

const taskReducer = (state = instate, taskActions) => {
    const { type, task } = taskActions
    switch (type) {
        case "AddTask":
            return { ...state, tasks: [...state.tasks, task] }
        case "deleteTask":
            console.log(task,'task delete');
            const newTask = state.tasks.filter(function (el) {
                return el.id !== task.id
            });
            return { ...state, tasks: [...newTask] }
        case "editTask":
        //    console.log(state.tasks,task,task.id);
            let pos = state.tasks.map(function (e) { return e.id }).indexOf(task.id)
            console.log(state.tasks[pos], task,'pos');
            state.tasks[pos] = task
            const editedTask=state.tasks
            return {...state,tasks:[...editedTask]}
        default: return state
    }
}
// const editTask=(task,state)=>{
//     let pos = statetasks.map(function(e) { return e.id; }).indexOf(4);
//     myArray[pos]={id:4,name:'fkfkfkfkf'}
// }
export default taskReducer