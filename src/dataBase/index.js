import Realm, { List } from 'realm'
import moment from 'moment-jalaali'
const today = moment().format('jYYYY/jM/jD')
const tomorrow = moment().add(1, 'day').format('jYYYY/jM/jD')
export const LISTS = "lists"
export const TASKS = "tasks"
export const CHECKLIST = "checkList"

export const CheckListSchema = {
    name: CHECKLIST,
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: { type: 'string' },
        done: { type: 'bool', default: false }
    }
}
export const TaskSchema = {
    name: TASKS,
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: { type: 'string' },
        desc: { type: 'string' },
        list: 'int',
        priority: { type: 'int', default: 0 },
        date: 'date?',
        reminder: 'date?',
        checkList: 'string?',
        done: { type: 'bool', default: false }
    }
}
export const ListSchema = {
    name: LISTS,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string' },
        icon: 'string?',
        color: 'string?',
        tasks: 'tasks[]',
        backgroundColor: 'string?'
    }
}
const databaseOptions = {
    // path:'todoListApp.realm,'
    schema: [ListSchema, TaskSchema],
    // schemaVerson:0,
}
export function addNewTask(task) {
    console.log(task);
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions).then(realm => {
            let list = realm.objects(LISTS).filtered(`id == ${task.list}`)
            realm.write(() => {
                const newTask = list[0].tasks.push(task)
                // const newTask=realm.create(TASKS,task)
                resolve(newTask)
            })
            console.log(list.toJSON(), 'addNewTask');
        }).catch(e => {
            reject(e)
        })
    })
}

export function addNewLIST(list) {
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then(realm => {
                realm.write(() => {
                    const newLIST = realm.create(LISTS, list)
                    resolve(newLIST)
                })
            }).catch(e => {
                reject(e, 'addNewLIST')
            })
    })
}

export function getLists() {
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then(realm => {
                let Lists = realm.objects(LISTS)
                console.log(Lists.toJSON(), 'lists');
                resolve(Lists.toJSON())
                // realm.close()
            })
            .catch(e => reject(e, 'getLists'))
    })
}
export function getTasks(reminder, date) {
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then(realm => {
                let Tasks = reminder ? realm.objects(TASKS).filtered(`reminder != null`) : realm.objects(TASKS)
                if (date == 'today') {
                    let todayTasks = Tasks.toJSON().filter(function (el) {
                        return moment(el.date).format('jYYYY/jM/jD') == today || el.date == null
                    })
                    todayTasks.sort((a, b) => b.date < a.date ? 1 : -1)
                    resolve(todayTasks)
                }
                else if (date == "tomorrow") {
                    let tomorrowTasks = Tasks.toJSON().filter(function (el) {
                        return moment(el.date).format('jYYYY/jM/jD') == tomorrow
                    })
                    tomorrowTasks.sort((a, b) => b.date < a.date ? 1 : -1)
                    resolve(tomorrowTasks)
                }
                else if (date == "past") {
                    let pastTasks = Tasks.toJSON().filter(function (el) {
                        return moment(el.date).format('jYYYY/jM/jD') < today
                    })
                    resolve(pastTasks)
                }
                else {
                    let otherTasks = Tasks.toJSON().filter(function (el) {
                        return moment(el.date).format('jYYYY/jM/jD') > tomorrow && el.date != null
                    })
                    otherTasks.sort((a, b) => b.date < a.date ? 1 : -1)
                    resolve(otherTasks)
                }

                // realm.close()
            })
            .catch(e => reject(e, 'getTasks'))
    })
}
export function getSortedTasks(reminder) {
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then(realm => {
                let finalSortedTask = []
                let Tasks = reminder ? realm.objects(TASKS).filtered(`reminder != null`) : realm.objects(TASKS)
                let sortedTask = Tasks.toJSON()
                console.log(sortedTask.length);

                if (sortedTask.length > 0) {
                    console.log(sortedTask.length, 'con');
                    sortedTask.sort((a, b) => b.date < a.date ? 1 : -1)
                    // console.log(sortedTask[0].date, sortedTask[sortedTask.length - 1].date);
                    var msDiff = new Date(sortedTask[sortedTask.length - 1].date).getTime() - new Date(sortedTask[0].date).getTime();    //Future date - current date
                    var daysTillLastTask = Math.floor(msDiff / (1000 * 60 * 60 * 24));


                    for (let i = 0; i <= daysTillLastTask; i++) {
                        const date = moment().add(i, 'day').format('jYYYY/jM/jD')
                        let oneDayTasks = sortedTask.filter(function (el) {
                            return moment(el.date).format('jYYYY/jM/jD') == date
                        })
                        if (oneDayTasks.length > 0) {
                            finalSortedTask[i] = oneDayTasks
                        }
                    }
                }
                resolve(finalSortedTask)


                // realm.close()
            })
            .catch(e => reject(e, 'getTasks'))
    })
}

export function deleteList(list) {
    console.log(list.id, 'list id');
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then(realm => {
                realm.write(() => {
                    let deleteTasksOfList = realm.objects(TASKS).filtered(`list == ${list.id}`)
                    realm.delete(deleteTasksOfList)
                    let deleteList = realm.objects(LISTS).filtered(`id == ${list.id}`)
                    realm.delete(deleteList[0])
                    resolve()
                })
            })
            .catch(e => reject(e))
    })
}
export function deleteTask(task) {
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then(realm => {
                realm.write(() => {
                    let deleteTask = realm.objects(TASKS).filtered(`id == ${task.id}`)
                    realm.delete(deleteTask[0])
                    resolve()
                })
            })
            .catch(e => reject(e, 'deleteTask'))
    })
}
export function getOneListTasks(reminder, list, date) {
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then(realm => {
                let Tasks = reminder ? realm.objects(TASKS).filtered(`list == ${list.id} AND reminder!=null`) : realm.objects(TASKS).filtered(`list==${list.id}`)
                if (date == 'today') {
                    let todayTasks = Tasks.toJSON().filter(function (el) {
                        return moment(el.date).format('jYYYY/jM/jD') == today || el.date == null
                    })
                    todayTasks.sort((a, b) => b.date < a.date ? 1 : -1)
                    resolve(todayTasks)
                }
                else if (date == "tomorrow") {
                    let tomorrowTasks = Tasks.toJSON().filter(function (el) {
                        return moment(el.date).format('jYYYY/jM/jD') == tomorrow
                    })
                    tomorrowTasks.sort((a, b) => b.date < a.date ? 1 : -1)
                    resolve(tomorrowTasks)
                }
                else if (date == "past") {
                    let pastTasks = Tasks.toJSON().filter(function (el) {
                        return moment(el.date).format('jYYYY/jM/jD') < today
                    })
                    resolve(pastTasks)
                }
                else {
                    let otherTasks = Tasks.toJSON().filter(function (el) {
                        return moment(el.date).format('jYYYY/jM/jD') > tomorrow && el.date != null
                    })
                    otherTasks.sort((a, b) => b.date < a.date ? 1 : -1)
                    resolve(otherTasks)
                }
                // realm.close()
            })
            .catch(e => reject(e))
    })
}

export function getDoneTasks() {
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then(realm => {
                let doneTasks = realm.objects(TASKS).filtered(`done == true`)
                resolve(doneTasks.toJSON())
                // realm.close()
            })
            .catch(e => reject(e))
    })
}
export function editTask(task) {
    console.log(task, 'edit ;;;;');
    return new Promise((resolve, reject) => {
        Realm.open(databaseOptions).then(realm => {
            realm.write(() => {
                // let newTask = realm.create(TASKS, task, 'modified');
                let deleteTask = realm.objects(TASKS).filtered(`id == ${task.id}`)
                realm.delete(deleteTask[0])

                let list = realm.objects(LISTS).filtered(`id == ${task.list}`)
                const newTask = list[0].tasks.push(task)
                resolve(newTask)
            })
        }).catch(e => {
            reject(e)
        })
    })
}
