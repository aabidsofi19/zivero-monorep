const parseJwt = (token) => {
  try {
    let payload = token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
  } catch (e) {
    return null;
  }
};

export default {
  loginUser: (state, details) => {
    state.user = details.user;
    //console.table(details)
    localStorage.setItem("Zivero_refresh_token", details.refreshToken);
    // let payload=details.token.split(".")[0] // gets the base64 encode payload from token
    // payload= Buffer.from(payload,["base64"]).toString()  // converts it to string
    let payload = parseJwt(details.token);

    state.auth.token = details.token;
    state.auth.tokenExpireAt = payload.exp;
    state.auth.loginThrough = details.provider;
    state.auth.isLoggedIn = true;
    //let date= new Date();
    //state.auth.lastlogin= date;
  },
  LOGOUT_USER(state) {
    //state.authStatus = ''
    state.auth = { isLoggedIn: false };
    state.user = {};
    localStorage.removeItem("Zivero_refresh_token");
  },

  SET_USER(state, data) {
    state.user = { ...data.user, phoneNumber: data.phoneNumber };
  },
};
