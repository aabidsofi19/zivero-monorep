<template>
<div class="banner d-flex justify-center align-center flex-wrap ">
        <v-img 
             id="bannerImg" 
             class=" " 
             width='100%' 
             height='100%'
             max-width="700px"
             :src='imgSrc'
             alt='sale '
             
             >   
               
               
        </v-img>
       
        <div class="hero-heading order-first">
            <p>
                <span> wear what you live</span><span> </span><span>So Low, So Good, Its Going</span>
            </p>
            <v-btn
                    class="ma-2"
                    elevation='0'
                    tile
                    color="secondary"
                >
                    EXPLORE
                </v-btn>
        </div>    
         
</div>
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
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Handlee&display=swap');
    .banner{
        display: flex;
        margin:0px;
        padding:0px;
        height:100vh;
        width:100%;
        max-height: 600px;
       background-color: burlywood;

    }
   

    .hero-heading{
        text-align: center;
        position: absolute;
        /* margin-top: 60%; */
        padding: auto;
      
        

    }

   
    
    .hero-heading p span:nth-child(1){
        font-family: 'Ubuntu', sans-serif;
        text-transform: uppercase;
        color:white;
        font-weight: bold;
        font-size:30px;
    }
    .hero-heading p span:nth-child(2){
        display: hidden;
        color:red;
        font-weight: bold;
        font-size:28px;
    }
    .hero-heading p span:nth-child(3){
        font-family: 'Handlee', cursive;
        display: block;
        color:#FDF8F5;
        font-weight: italic;

        
        font-size:29px;
    }
        
     @media screen and (min-width: 600px) {
        .hero-heading{
            
            margin-right: auto;
            margin-left: auto;
            position: static;
           
        }
        
    }


</style>
