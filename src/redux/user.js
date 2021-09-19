export const actions = {
    setUserInfo(user){
        console.log('login')
        return{type:"LOGIN", user}
    },
    logout(){
        console.log('logout')
        return{type:"LOGOUT"}
    },


}
const instate={
    user:null,
}
const userReducer = (state=instate, actions)=>{
    const {type, user} = actions
    switch(type){
        case "LOGIN":
            return{...state, user: {...state.user, ...user}}
        case "LOGOUT":
            return{...state, user:null}
        default: return state
    }
}

export default userReducer