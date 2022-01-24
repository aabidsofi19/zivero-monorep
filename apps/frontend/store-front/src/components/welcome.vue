<template>
<div id='carousal'>
<v-carousel v-model="model" 
      :continuous="false"
      :cycle="cycle"
      :show-arrows="false"
       hide-delimiter-background
       delimiter-icon="mdi-minus"    
    >
    <v-carousel-item
      v-for="img in images"
      :key="img"
    >
      <v-sheet
        color="#DDAF94"
        height="100%"
        tile
        id='blob'
        >
        <v-img 
            id='modelimg'
            :lazy-src="img"
            contain  
            max-height="100%"
            max-width="100%"
            > 

        </v-img>  
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

</div>

</template>

<script>
    export default { 
        name: 'carousal',components: {

        },
        proos:['images'],
        data: () => ({
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }),
    }    
</script>
<style scoped lang='css'>
#welcome{
margin-top: 11vh;
}
#blob{
/*background-image: url(../assets/blob.svg);*/
background-image:linear-gradient(to right, #DDAF94 , #);
background-size:cover ;
}
#modelimg{

padding: 10%;}
</style>
