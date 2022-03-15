import store from "../store";
import router from "../router";
export const refreshTokenFlow = async () => {
  if (!localStorage.getItem("Zivero_refresh_token")) {
    throw Error("No refresh token found ,Please Login Again");
  }

  var timeNow = Math.floor(Date.now() / 1000);
  let isTokenExpired = timeNow < store.state.user.auth.tokenExpireAt;
  if (
    !store.state.user.authtoken &&
    localStorage.getItem("Zivero_refresh_token")
  ) {
    let token = await store.dispatch("user/refreshToken");
    return token;
  }
  if (isTokenExpired) {
    let token = await store.dispatch("user/refreshToken");
    return token;
  }
};

export const logOut = () => {
  store.dispatch("user/logOut");
  router.push("/login");
};

// const isLoggedIn = () =>{
//     if(store.state.user.auth.token){
//         return true
//     }

// }
