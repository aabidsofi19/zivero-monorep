<template>

    <v-container class='login'>
         <p>Reset Password </p>
        
        {{errors}}
        <v-text-field
                v-model="resetData.newPassword1"
                outlined color='#266150'
                placeholder='*********'
                label="password"
                required >
        </v-text-field>
         <v-text-field
                v-model="resetData.newPassword2"
                outlined color='#266150'
                placeholder='*********'
                label="confirm password"
                required >
        </v-text-field>
    
        <v-btn @click='reset' :loading="resetting" :disabled="resetting"  tile color='#266150' width='100%'
            class ='white--text' >
             Submit    
        </v-btn>
        
    </v-container>

</template>

<script>
import { mapActions } from "vuex"
export default{
    data:()=>({
        resetData:{
            newPassword1:"",
            newPassword2:"",
            token:"",
        },
        resetting:false,
        errors:null
    }),

    mounted(){
        this.resetData.token = this.$route.params.token
    },
    methods:{
        ...mapActions("user",["resetPassword"]),
        async reset(){
            this.resetting=true
            let {success,errors} = await this.resetPassword(this.resetData)
            if(success){
                this.$router.push("/login")
            }
            this.resetting=false
            this.errors=errors

        }
    }
}
</script>