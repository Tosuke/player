import firebase from '@/firebase'
import store from '@/store'

const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/plus.me',
  'https://picasaweb.google.com/data'
]

const AUTHURL = 'https://accounts.google.com/o/oauth2/v2/auth'

export function createOAuthURL() {
  const param = new URLSearchParams()
  param.append('client_id', process.env.OAUTH_CLIENT_ID)
  const location = window.location
  param.append(
    'redirect_uri',
    `${location.protocol}//${location.host}/auth/callback`
  )
  param.append('access_type', 'offline')
  param.append('response_type', 'code')
  param.append('scope', SCOPES.join(' '))
  param.append('include_granted_scopes', true)
  param.append('prompt', 'consent')
  // TODO:state

  return AUTHURL + '?' + param.toString()
}

export async function processRedirectResult() {
  let hash = window.location.hash
  if (hash === '') return
  hash = hash.substring(1)
  const params = new URLSearchParams(hash)
  if (params.has('error')) throw new Error(params.get('error'))

  const accessToken = get('access_token')
  const expiresIn = parseInt(get('expires_in'), 10)
  const refreshToken = get('refresh_token')
  const idToken = get('id_token')

  await store.dispatch('signIn', {
    accessToken,
    expiresIn,
    refreshToken,
    idToken
  })

  window.location.hash = ''

  function get(name) {
    if (params.has(name)) {
      return params.get(name)
    } else {
      throw new Error(`"${name}" is required`)
    }
  }
}
