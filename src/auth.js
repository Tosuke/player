import firebase from '@/firebase'

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
  if (hash === '') return null
  hash = hash.substring(1)
  const params = new URLSearchParams(hash)
  window.location.hash = ''
  if(params.has('error')) throw new Error(params.get('error'))
  
  const accessToken = params.get('access_token')
  const expiresIn = parseInt(params.get('expires_in'), 10)
  const refreshToken = params.get('refresh_token')
  const idToken = params.get('id_token')

  const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
  const user = await firebase.auth().signInWithCredential(credential)
  
  const db = firebase.firestore()
  const userTokens = db.collection('userTokens')
  await userTokens.doc(user.uid).set({
    accessToken, refreshToken
  })

  return user
}