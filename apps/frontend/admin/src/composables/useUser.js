import { ref, reactive, computed, readonly } from 'vue'
import { useMutation, useResult, useQuery } from '@vue/apollo-composable'
import { ME_QUERY } from 'graphql-client/queries/auth'
import { LOGIN_EMAIL, REFRESH_TOKEN, REVOKE_TOKEN } from 'graphql-client/mutations/auth'
import { parseJwt } from 'utils'
import { useRouter } from 'vue-router'

export const authState = reactive({
  access_token: null,
  refresh_token: localStorage.getItem('Zivero_refresh_token') || null,
  isLoggedIn: computed(() => !!authState.access_token),
  expires_at: null,
})

const getTokenExpirationDate = token => {
  const decoded = parseJwt(token)
  //
  if (decoded.exp === undefined) return null
  const date = new Date(0)
  date.setUTCSeconds(decoded.exp)
  return date
}

export const refreshAutomatically = () => {
  const token = authState.refresh_token
  if (!token) return
  const date = getTokenExpirationDate(token)
  if (!date) return
  const now = new Date()
  if (now.getTime() > date.getTime()) {
    const { refreshToken } = useRefreshToken()
    return refreshToken()
  }
}

export const useLogin = () => {
  const { loading, error, mutate, onDone } = useMutation(LOGIN_EMAIL)
  const login_success = ref(false)
  const login_message = ref('')
  onDone(({ data }) => {
    if (data.tokenAuth.token) {
      authState.access_token = data.tokenAuth.token
      authState.refresh_token = data.tokenAuth.refreshToken
      authState.expires_at = getTokenExpirationDate(data.tokenAuth.token)
      localStorage.setItem('Zivero_refresh_token', data.tokenAuth.refreshToken)
      login_success.value = true
      login_message.value = 'Login Successful'

      setInterval(refreshAutomatically, 60000)
    } else {
      login_message.value = 'Login Failed Please Check Your Credentials'
    }
  })

  const loginWithEmail = async ({ email, password }) => {
    await mutate({
      email,
      password,
    })

    return login_success.value
  }

  return {
    loading,
    error,
    login_success,
    login_message,
    loginWithEmail,
  }
}

export const useUser = () => {
  const { loading, error, result } = useQuery(ME_QUERY)

  const user = useResult(result, {}, data => data.me)

  return {
    loading,
    error,
    user,
    authState: readonly(authState),
  }
}

export const useLogout = () => {
  const { loading, error, mutate } = useMutation(REVOKE_TOKEN)
  const router = useRouter()

  const logout = async () => {
    await mutate({
      refreshtoken: authState.refresh_token,
    })

    authState.access_token = null
    authState.refresh_token = null
    localStorage.removeItem('Zivero_refresh_token')
    router.push({ name: 'login' })
  }

  return {
    loading,
    error,
    logout,
  }
}

export const useRefreshToken = () => {
  const { loading, error, mutate, onDone } = useMutation(REFRESH_TOKEN)
  const success = ref(false)
  onDone(({ data }) => {
    if (data.refreshToken.token) {
      authState.access_token = data.refreshToken.token
      authState.refresh_token = data.refreshToken.refreshToken
      localStorage.setItem('Zivero_refresh_token', data.refreshToken.refreshToken)
      success.value = true
      authState.expires_at = getTokenExpirationDate(data.refreshToken.token)
    }
  })

  const refreshToken = async () => {
    if (authState.refresh_token == null) {
      return
    }
    await mutate({
      refreshToken: authState.refresh_token,
    })

    return authState.access_token
  }

  return {
    loading,
    error,
    refreshToken,
    success,
  }
}
