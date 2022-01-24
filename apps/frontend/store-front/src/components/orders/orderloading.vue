<template>
<div >
    
    <div class="d-flex justify-space-between py-3 " > 
        <v-skeleton-loader type="text"> </v-skeleton-loader>

        <v-skeleton-loader type="chip"></v-skeleton-loader>
    </div>       
    <v-skeleton-loader height="120px" type="card" class="my-2"  v-for="i in 3" :key="i" >
        
    </v-skeleton-loader>
    <div class="d-flex justify-space-between py-3 " > 
       <v-skeleton-loader type="text"> </v-skeleton-loader>

        <v-skeleton-loader type="text"> </v-skeleton-loader>
    </div> 
    
</div>
</template>
