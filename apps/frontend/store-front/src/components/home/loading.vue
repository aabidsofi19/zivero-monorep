<template>

<v-sheet class="pa-3 ">
<v-skeleton-loader type="image@2" class="py-2">
</v-skeleton-loader> 
<div class="d-flex flex-wrap  my-3  justify-center">
<v-skeleton-loader class="ma-1" width="40%"  max-width="300px" type="card" v-for="i in 10 " :key="i">

</v-skeleton-loader>
</div>


</v-sheet>

</template>