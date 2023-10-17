import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth'
import { useEffect } from 'react'

import { firebaseConfig } from './firebase-config'

const initApp = (callback) => {
  const auth = getAuth()

  // Result from Redirect auth flow.
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const user = result.user
        // const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = result.credential.accessToken

        // The signed-in user info.
        console.log(token)
        console.log(user)

        // Call the callback with user data
        callback({
          ...user.providerData[0],
          token: token,
        })
      }
    })
    .catch((error) => {
      console.error(error)
    })

  // Listening for auth state changes.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user', user)
      console.log('user.providerData[0]', user.providerData[0])
      // callback the user data
      callback(user.providerData[0])
    }
  })
}

// TODO: 目前不需要從firebase登出，firebase登出並不會登出google
const logoutFirebase = () => {
  const auth = getAuth()

  signOut(auth)
    .then(function () {
      // Sign-out successful.
      console.log('Sign-out successful.')
      // window.location.assign('https://accounts.google.com/logout')
    })
    .catch(function (error) {
      // An error happened.
      console.log(error)
    })
}

const loginGoogle = async (callback) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user
      console.log(user)

      const token = await user.getIdToken()

      callback({
        ...user.providerData[0],
        token: token,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const loginGoogleRedirect = async (callback) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  signInWithRedirect(auth, provider)
}

const loginFBRedirect = () => {
  const provider = new FacebookAuthProvider()
  const auth = getAuth()

  signInWithRedirect(auth, provider)
}

export default function useFirebase() {
  useEffect(() => {
    // 初始化
    initializeApp(firebaseConfig)
  }, [])

  return {
    loginFBRedirect,
    initApp,
    loginGoogleRedirect,
    loginGoogle,
    logoutFirebase,
  }
}
