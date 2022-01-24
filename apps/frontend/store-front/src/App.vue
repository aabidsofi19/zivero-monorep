<template>
  <v-app>
      <LoadingOverlay :loading="loading"></LoadingOverlay>
      <navbar-mobile/> 
      
     
       
      <!-- Sizes your content based upon application components -->
      <v-main >
        <search></search>  
        <!-- Provides the application the proper gutter -->
        <v-container fluid class='ma-0 pa-0'>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>
      

  </v-app>
</template>

<script>

import navbarMobile from './components/navbarMobile.vue';
// import navdrawer from './components/navdrawer.vue';
import search from "./components/search/search.vue"
import LoadingOverlay from './components/loadingOverlay.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  
  components: {
    navbarMobile,
   
    LoadingOverlay,
    search
},
  methods:{
   
  },
  data: () => ({
    //
  }),
  computed:{
    ...mapState("app", ["loading"]),
    
  
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root{

  --primary-color: '#E85a4f';
  --secondary-color: '#e98074';
  --accent-color: '#8e8d8a';
  --error-color: '#b71c1c';
  --info-color:"#D8c3a5";
  --background-color:"#eae7dc";
}
</style>



