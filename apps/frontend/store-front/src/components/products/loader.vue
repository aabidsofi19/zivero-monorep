<template>
<v-sheet class="pa-3 d-flex flex-wrap  my-3  justify-center" width="100%">
    <v-skeleton-loader class="ma-1" width="40%"  max-width="400px" type="card" v-for="i in 10 " :key="i">
    </v-skeleton-loader>
</v-sheet>
</template>