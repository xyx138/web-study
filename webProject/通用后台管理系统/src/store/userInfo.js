export default{
    state: {
        infos:{
            name: "",
            img: ""
        }
    },

    mutations:{
        updatedUserInfo(state, value) {
            state.infos = value
        },
    }
}