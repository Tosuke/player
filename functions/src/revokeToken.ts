import * as functions from 'firebase-functions'
import fetch from 'node-fetch'

export const revokeToken = functions.https.onCall((data, ctx) =>
  fetch(`https://accounts.google.com/o/oauth2/revoke?token=${data.token}`).then(
    res => res.json()
  )
)
