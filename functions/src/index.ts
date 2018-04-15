import { config } from 'dotenv'
config({
  path: 'env/.env'
})
if (process.env.NODE_ENV === 'production') {
  config({ path: 'env/.env-prod' })
} else {
  config({ path: 'env/.env-dev' })
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// /auth/callback
export { authCallback } from './authCallback'

export { revokeToken } from './revokeToken'