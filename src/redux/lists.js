export const listActions = {
    addList(list){
        console.log('Addlist')
        return{type:"Addlist", list}
    },
    deleteList(list){
        console.log('deletelist')
        return{type:"deletelist",list}
    },


}
const instate={
    lists:[{name:'شخصی',color:'red',listId:1}]
}

const listReducer = (state=instate, listActions)=>{
    const {type, list} = listActions
    switch(type){
        case "Addlist":
            return{...state,lists:[...state.lists, list]}
        case "deletelist":
            const newlists = state.lists.filter(function (el) {
                return el.listId !== list.listId
            });
            return{...state,lists:[...newlists]}
        default: return state
    }
}

export default listReducer