import {
  LOGIN_EMAIL,
  REGISTER_USER,
  REFRESH_TOKEN,
  REVOKE_TOKEN,
  VERIFY_ACCOUNT,
  RESEND_ACTIVATION_EMAIL,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "graphql-client/mutations/auth";
import { GET_CUSTOMER } from "graphql-client/queries/auth";
import { client } from "../../../main";
export default {
  logInWithEmail: async ({ commit }, authDetails) => {
    //authDetails = email and password

    let result = await client.mutate({
      mutation: LOGIN_EMAIL,
      variables: {
        email: authDetails.email,
        password: authDetails.password,
      },
    });
    console.log(JSON.stringify(result));
    let data = result.data.tokenAuth;
    let refreshToken = data.refreshToken;

    //let token=JSON.stringify(data.token)
    if (data.token != null) {
      let details = {
        user: data.user,
        token: data.token,
        refreshToken: refreshToken,
        provider: "Email",
      };

      commit("loginUser", details);
      return true;
    } else {
      return false;
    }
  },
  registerUser: async ({ commit }, authDetails) => {
    commit("app/SET_LOADING", true, { root: true });
    let result = await client.mutate({
      mutation: REGISTER_USER,
      variables: authDetails,
    });
    let data = result.data.register;

    if (data.errors) {
      commit("app/SET_LOADING", false, { root: true });
      return { errors: data.errors, success: false };
    }

    let token = data.token;
    let refreshToken = data.refreshToken;

    let details = {
      user: {},
      provider: "Email",
      token: token,
      refreshToken: refreshToken,
    };

    commit("app/SET_LOADING", data.loading, { root: true });
    commit("loginUser", details);
    return { errors: data.errors, success: true };
  },

  async logOut({ commit }) {
    let token = localStorage.getItem("Zivero_refresh_token");
    commit("app/SET_LOADING", true, { root: true });
    let { errors, loading } = await client.mutate({
      mutation: REVOKE_TOKEN,
      variables: { refreshtoken: token },
    });
    commit("app/SET_LOADING", loading, { root: true });
    commit("LOGOUT_USER");
    return { loading, errors };
  },

  async userdetails({ commit }) {
    console.log("fetching userdetails");
    let res = await client.query({ query: GET_CUSTOMER });
    console.log(res);
    commit("SET_USER", res.data.customer);
  },

  async refreshToken({ commit }) {
    let refreshToken = localStorage.getItem("Zivero_refresh_token");
    let result = await client.mutate({
      mutation: REFRESH_TOKEN,
      variables: { refreshToken: refreshToken },
    });
    let data = result.data.refreshToken;
    let token = data.token;

    refreshToken = data.refreshToken;
    let details = {
      user: {},
      token: token,
      refreshToken: refreshToken,
      provider: "Email",
    };
    commit("loginUser", details);
    return token;
  },

  async confirmEmail(_, code) {
    let result = await client.mutate({
      mutation: VERIFY_ACCOUNT,
      variables: { token: code },
    });
    let data = result.data.verifyAccount;
    console.log(data);

    if (data.success) {
      // commit('SET_VERIFIED',true)
      return { success: true, errors: null };
    } else {
      return { success: false, errors: data.errors };
    }
  },

  async resendActivationEmail(_, email) {
    let { data } = await client.mutate({
      mutation: RESEND_ACTIVATION_EMAIL,
      variables: { email },
    });
    return data;
  },
  async forgotPassword(_, email) {
    let { data } = await client.mutate({
      mutation: FORGOT_PASSWORD,
      variables: { email },
    });
    console.log("data", data);
    return data.sendPasswordResetEmail;
  },

  async resetPassword(_, { token, newPassword1, newPassword2 }) {
    let { data } = await client.mutate({
      mutation: RESET_PASSWORD,
      variables: { token, newPassword1, newPassword2 },
    });
    console.log("reset", data);
    return data.passwordReset;
  },
};
