export default{
    state: {
        infos:{
            name: "",
            img: "",
            access: "",
        }
    },

    mutations:{
        updatedUserInfo(state, value) {
            state.infos = value
        },
    }
}