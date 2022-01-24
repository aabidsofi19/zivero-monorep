<template>
<v-sheet class="banner d-flex justify-center align-center flex-wrap "
    width='100%' 
    height='100vh'
>
        <v-img 
             class="img"
             width='100%' 
             height='100vh'
             :src='imgSrc'
             alt='sale '
             gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
             >   
                     
        </v-img>
       
        <v-sheet  class="text text-center text-md-left "  color="transparent">
            
                <p class="text-md-h1 text-h3 text-capitalize font-weight-black background--text"> wear what you live</p>
                <p class="text-md-h2 text-h4 text-capitalize font-weight-medium info--text"> So good its going ..</p>
            
            <v-btn
                    class="px-8 py-4 text--subtitle-1"
                    x-large
                    elevation='0'
                  
                    color="secondary"
                >
                    EXPLORE
            </v-btn>
        </v-sheet>    
         
</v-sheet>
</template>
<script>
    export default { 
        name: 'banner',
        props:['imgSrc'],
        components: {

        } 
    }    
</script>

<style scoped lang="css">
.img{
    position: absolute;
    top:0px;
}
.text{
    z-index:1;
  

}
</style>
