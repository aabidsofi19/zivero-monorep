export const navigationGaurd = (to, from, next) => {
  // Check if the user is logged i
  // console.log(JSON.stringify(store.getters))
  const isUserLoggedIn = localStorage.getItem("Zivero_refresh_token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserLoggedIn) {
      // store.dispatch('logOut')
      let redirect;
      if (from.name == "cart") {
        redirect = from.fullPath;
      } else {
        redirect = to.fullPath;
      }
      next({
        path: "/login",
        query: { redirect: redirect },
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
