/* eslint-disable */

export const  refreshTokenFlow = async (store) =>{
    if(!localStorage.getItem('Zivero_refresh_token')){
        return Error('No refresh token found ,Please Login Again')
    }
    console.log("refreshTokenFlow")
    var timeNow = Math.floor((Date.now())/1000)
    let isTokenExpired = timeNow < store.state.user.auth.tokenExpireAt
    if( !store.state.user.authtoken  &&  localStorage.getItem("Zivero_refresh_token")){
        let token = await store.dispatch("user/refreshToken");
        return token
    }
    if(isTokenExpired ){
        let token = await store.dispatch("user/refreshToken");
        return token 
    }
}

// export const logOut= () =>{
//     store.dispatch("user/logOut");
//     router.push("/login");

// }

// const isLoggedIn = () =>{
//     if(store.state.user.auth.token){
//         return true
//     }
    
// }