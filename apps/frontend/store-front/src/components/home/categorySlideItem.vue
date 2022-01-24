<template>
    <v-slide-item
      
    
      > 
        <div class="mx-10 item">
        <v-card
          color="grey lighten-2"
          class="my-3 red  rounded-circle"
          height="20vh"
          width="20vh"
          elevation='0'
          max-width="200px"
          max-height="200px"
          
        >
          
            <v-img
                height='100%'
                width='100%'
                class='rounded-circle'
                :src="category.image"
                contain
                >

            </v-img>

                        
        </v-card>
        <p class='ma-1 poppins  name'>{{category.name}}</p>
        </div>
      </v-slide-item>
</template>


<script>
export default {
    name:"categorySlideItem",
    props:['category'],
}
</script>

<style scoped>
.item{
    cursor:pointer;
}
.name{
    text-align: center;
    margin: auto;
    color: black;
    text-transform: capitalize;
}
</style>