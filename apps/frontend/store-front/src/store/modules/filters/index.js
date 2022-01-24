import { isEqual } from "apollo-utilities"

const defaultFilterInput = {
    categories:null,
    gender:"",
    brands:null,
    sortBy:"BetterDiscount"
    
}


const state=()=>({
   filterInput:{
       categories:null,
       gender:"",
       brands:null,
       sortBy:"BetterDiscount"
       
   },
   variantFilterInput:[
    //    {
    //        name:"size",
    //        values:["xl","l"]
    //    }
   ],

   //state variables for mobile panel 
   mobilePanel:{

        isVariantFilterSelected:false,
        selectedFilterType:"brands",
        selectedVariantType:"",
   },

   //ui variables for filter and sort
   isSortingSheetOpen:false,

   // sorting options not mutating this anywhere
   sortingOptions: [
        { title: 'Popularity' ,value:"Popularity" },
        { title: 'Whats New' ,value:"WhatsNew" },
        { title: 'Better Discount' ,value:"BetterDiscount" },
        { title: 'Price : Low to High'  ,value:"PriceLowToHigh"},
        { title: 'Price : High to Low', value:"PriceHighToLow" },
   ],

   // state variables products page
   isFiltering:false
})

const getters={

   areFiltersChanged(state){
        return !isEqual(state.filterInput,defaultFilterInput)
   }
}

const mutations={

    SetFilterInput(state,{filterType,value}){
        state.filterInput[filterType]=value;
    },

    SetVariantFilterInput(state,{filterType,value}){

        if(state.variantFilterInput.length== 0  ){
            state.variantFilterInput=[{"name":filterType,"values":value}]
        }
        for(let filter of state.variantFilterInput){
           if ( filter.name==filterType){
               filter.values=value
           }
        }
    },

    setMobilePanelState(state,{key,value}){
        state.mobilePanel[key]=value
    },
    resetFilters(state){
        state.filterInput = defaultFilterInput
        state.variantFilterInput= [ ]
        state.mobilePanel= { isVariantFilterSelected:false, selectedFilterType:"brands", selectedVariantType:"", }
    },

    toggleSortingSheet(state,value){
        state.isSortingSheetOpen =value
    },

    setIsFiltering(state,value){
        state.isFiltering=value
    },

    setFilters(state,filter){
        state.filterInput = filter
    }
}

const actions ={

    async filterProducts({dispatch,state},updateFilters) {
       
        let filters={...state.filterInput,variantFilters:state.variantFilterInput}
        let payload ={filters,pageNb:1}
        await dispatch("products/getProducts",payload,{root:true})
        console.log("filter",state.filterInput)
        
        if (updateFilters == true) {
          dispatch("products/updateFilters",state.filterInput,{root:true});
         
        }
      
      },
    
    async selectFilter({dispatch,commit},{filterType,value,doUpdate}){
         
        commit("SetFilterInput",{filterType,value})
        commit("setIsFiltering",true)
        await dispatch("filterProducts",doUpdate)
        commit("setIsFiltering",false)
    }, 

    async selectVariantFilter({dispatch,commit},{filterType,value}){

        commit("SetVariantFilterInput",{filterType,value})
        dispatch("filterProducts",false)
    } ,

    async clearFilters({dispatch,commit}){
        commit("setIsFiltering",true)
        commit("resetFilters")
        await dispatch("products/getProducts",{},{root:true})
        commit("setIsFiltering",false)
        await dispatch("products/getFilters",{},{root:true})
        
    },
    


}


export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}