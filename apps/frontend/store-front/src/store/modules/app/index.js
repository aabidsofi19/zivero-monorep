const state =() => ({
    is_navbar_open: false,
    isFilterDrawerOpen:false,
    loading:false,
 })

const mutations={
    TOGLE_NAVBAR(state){
        state.is_navbar_open = !state.is_navbar_open;
    },
    TOGGLE_FILTER_DRAWER(state){
        
        state.isFilterDrawerOpen = !state.isFilterDrawerOpen;
    },
    SET_LOADING(state,bool){
        state.loading = bool
    }
}

const actions = {
    toggleNavbar:({commit})=>{
        commit("TOGLE_NAVBAR")
    },
    toggleFilterDrawer:({commit})=>{
        commit("TOGGLE_FILTER_DRAWER")
    }
}

export default  {
    namespaced:true,
    state,
    mutations,
    actions
}
