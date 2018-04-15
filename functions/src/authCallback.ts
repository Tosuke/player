import * as functions from 'firebase-functions'
import fetch from 'node-fetch'
import { URLSearchParams } from 'whatwg-url'

export const authCallback = functions.https.onRequest((req, res) => {
  const base = process.env.BASE_URL
  const params = new URLSearchParams('')

  if ('error' in req.query) {
    console.error('OAuthError:', req.query.error)
    params.append('error', req.query.error)
    redirect(params)
    return
  }

  if ('code' in req.query) {
    const code: string = req.query.code
    const redirectUri = `${base}/auth/callback`
    const formData = new URLSearchParams('')
    formData.append('client_id', process.env.OAUTH_CLIENT_ID)
    formData.append('client_secret', process.env.OAUTH_CLIENT_SECRET)
    formData.append('redirect_uri', redirectUri)
    formData.append('grant_type', 'authorization_code')
    formData.append('code', code)
    fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      body: formData as any
    })
      .then(r => r.json())
      .then(result => {
        if ('error' in result) {
          console.error(result)
          params.append('error', result.error)
          redirect(params)
          return
        }
        params.append('access_token', result.access_token)
        params.append('expires_in', result.expires_in.toString())
        params.append('refresh_token', result.refresh_token)
        params.append('id_token', result.id_token)
        redirect(params)
        return
      })
      .catch(err => {
        console.error(err)
        params.append('error', err.message)
        redirect(params)
      })
    return
  }

  function redirect(p: URLSearchParams) {
    console.log('client_id', process.env.OAUTH_CLIENT_ID)
    res.redirect(`${base}/#${p.toString()}`)
  }
})