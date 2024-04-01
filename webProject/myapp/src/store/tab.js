export default{
    state:{
        isCollapse: false,
        tabsList:[
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ]
    },
    actions:{
        selectMenu($store, item){
            if(item.name != 'home'){
                const index = $store.state.tabsList.findIndex(val => val === item)
                if(index == -1){
                    $store.commit('pushTab', item)
                }
            }

            
        }
    },

    mutations:{
        updateCollapse(state){
            state.isCollapse = !state.isCollapse
        },
        pushTab(state, item){
            state.tabsList.push(item)
        },
        popTab(state, item){
            state.tabsList = state.tabsList.filter(val => val != item)
        }
    }
}

