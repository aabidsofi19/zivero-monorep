<template>

<v-container class="container">

       <div class="my-4 px-8 mx-8">
            <p class="text-h5 font-weight-medium"> Profile Details </p>
            <v-divider class="mb-5"></v-divider>
            <div class="d-flex justify-space-between align-center">
                <p class="text-h6 font-weight-bold">Username:</p>
                <p class="text-h6 grey--text ">{{user.username}}</p>
            </div>
            <div class="d-flex justify-space-between align-center">
                <p class="text-h6 font-weight-bold">Email:</p>
                <p class="text-h6 grey--text ">{{user.email}}</p>
            </div>
             <div class="d-flex justify-space-between align-center">
                <p class="text-h6 font-weight-bold">FullName:</p>
                <p class="text-h6 grey--text ">{{fullName}}</p>
            </div>
            <div class="d-flex justify-space-between align-center">
                <p class="text-h6 font-weight-bold">Phone:</p>
                <p class="text-h6 grey--text ">{{user.phoneNumber}}</p>
            </div>
            <div class="d-flex justify-space-between align-center">
                <p class="text-h6 font-weight-bold">Gender:</p>
                <p class="text-h6 grey--text ">Not Set</p>
            </div>
           <v-btn block color="green" class="white--text text-h6 my-6" elevation="0" >
               EDIT
           </v-btn>
       </div>
   
</v-container>

</template>

<script>
import { mapState,mapActions } from "vuex"
export default{
    
    async mounted(){
        this.userdetails();
    },

    data(){
        return{
            
        }
    },

    computed:{
        ...mapState("user",['user']),

        fullName(){
            if(this.user.firstName && this.user.lastName){
                return this.user.firstName+" "+this.user.lastName;
            }
            return "Not Set";
        }
    },
    methods:{
        ...mapActions("user",['userdetails'])
    },
    


}
</script>


<style scoped>
.container{
    padding: 5%;
    border:1px solid #ccc;
}
</style>