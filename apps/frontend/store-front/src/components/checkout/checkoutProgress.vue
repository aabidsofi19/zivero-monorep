<template>
<div class="d-flex  justify-center "> 
  <div class="d-flex justify-center align-center text-uppercase text-h6 font-weight-bold navigation">
      <p class="mx-6 " :class="{'active':cart}">cart</p>
      <p class="separator"> </p>
      <p  class="mx-6" :class="{'active':address}">address</p>
      <p class="separator" >  </p>
      <p  class="mx-6" :class="{'active':payment}">payment</p>
  </div>
</div>
</template>


<script>

export default{
    props:["cart","address","payment"]
}
</script>

<style scoped lang="css">

.navigation{
    width:100%;
    max-width: 500px;
}

.active{
    color: #E85a4f;
    font-weight: bold;
    border-bottom: 3px solid #e98074;
}

.separator{
    flex-grow: 1;
    height:2px;
    
    border-top:1px dotted black;
    
}
</style>