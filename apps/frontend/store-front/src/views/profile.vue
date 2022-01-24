<template>
<div>
    <v-contaner class="d-flex justify-center mt-10 mb-10 pb-10 pt-10">
        
        <div class="col1">
          <div class="d-flex flex-column px-10 text-subtile-2 font-weight-medium "  >
            <div>
              <p class="text-h5 font-weight-bold">Account</p>
              <p class="text-subtitle-1 grey--text mt-2">{{user.username}}</p>
            </div>
            <v-divider class="mb-8 mt-3"></v-divider>      
            <p class="text-h5 grey--text font-weight-light">Orders</p>
            <router-link to="/profile/orders" class="link">Orders and Status</router-link> 
            <v-divider class="my-3"></v-divider>
            <p class="text-h5 grey--text font-weight-light">Account</p>
            <router-link to="/profile/account" class="link">Profile</router-link>
            <router-link to="/profile/addresses" class="link">Addresses</router-link>
            <v-btn color="red lighten-2"> Logout</v-btn>

          </div>
        </div>
          <v-sheet width="100%" max-width="800px" class="px-6">
            <router-view></router-view>
          </v-sheet>
          
          
    </v-contaner>
    <profileBottomNavigation class="bottom-navigation" />
</div>
</template>

<script>
    import {mapState} from "vuex"
    import profileBottomNavigation from "../components/profile/profileBottomNavigation.vue"
    //const vm=this;
    export default { 
        name: 'User ',
        components: {
          profileBottomNavigation
        },

        mounted(){
           this.$store.dispatch('user/userdetails')
        },
        
        computed:{
          ...mapState("user",['user'])
        },

    } 

</script>

<style scoped lang="scss">
.link{
    text-decoration: none;
    color: black;
    transition: linear 0.2s;
    padding-block: 10px;
    font-size: 1.2rem;
}

.link:hover{
        color: green;
        font-weight:bold;
    }
.col1{
  display:none;
  border-right: 1px solid rgba(230, 228, 228, 0.822);
}



@media only  screen and (min-width:600px) {
   
   .col1{
     display:block;
   }

   .bottom-navigation{
      display: none;
    }

}
</style>