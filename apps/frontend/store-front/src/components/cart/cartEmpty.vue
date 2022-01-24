<template>
    <div class=" d-flex flex-column align-center justify-center empty-cart">
        <v-img class="flex-grow-0" contain src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"></v-img>
         <p class="text-h5 font-weight-bold my-3">Did you forget to add something</p>
         <p xlass="grey--text text-subtitle-1"> Your cart is empty. Lets's add some items</p>
         <v-btn outlined tile> Add Items from Wishlist</v-btn>
    </div>
</template>


<style>
.empty-cart{
   height: 80vh;
}
</style>