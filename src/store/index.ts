import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    updateUser(state, { user }) {
      state.user = user
    }
  },
  actions: {
    async signIn({ commit }, { accessToken, refreshToken, idToken }) {
      const credential = firebase.auth!.GoogleAuthProvider.credential(
        idToken,
        accessToken
      )
      const user = await firebase.auth!().signInWithCredential(credential)

      const db = firebase.firestore!()
      const userTokens = db.collection('userTokens')
      await userTokens.doc(user.uid).set({
        accessToken,
        refreshToken
      })

      commit('updateUser', { user })
    },
    async signOut({ commit }) {
      await firebase.auth!().signOut()
      commit('updateUser', { user: null })
    },
    async deleteUser({ commit }) {
      const user = firebase.auth!().currentUser
      if (user === null) throw new Error()

      const db = firebase.firestore!()
      const userTokenRef = db.collection('userTokens').doc(user.uid)
      const userToken = await userTokenRef.get().then(doc => doc.data())
      if (userToken == null) throw new Error()

      await Promise.all([
        revokeToken(userToken.refreshToken),
        revokeToken(userToken.accessToken)
      ])
      await userTokenRef.delete()

      await user.delete()
      commit('updateUser', { user: null })

      async function revokeToken(token: string) {
        await firebase
          .functions!()
          .httpsCallable('revokeToken')({ token })
          .catch(e => {
            console.error(e)
          })
      }
    }
  }
})
