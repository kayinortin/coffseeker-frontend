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
import { useUser } from '@/context/UserInfo'

const initApp = (callback) => {
  const auth = getAuth()

  // Result from Redirect auth flow.
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        const user = result.user
        const token = result.credential.accessToken

        callback({
          ...user.providerData[0],
          token: token,
        })
      }
    })
    .catch((error) => {
      console.error(error)
    })

  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user.providerData[0])
    }
  })
}

const logoutFirebase = () => {
  const auth = getAuth()

  signOut(auth)
    .then(function () {
      console.log('Sign-out successful.')
      // window.location.assign('https://accounts.google.com/logout')
    })
    .catch(function (error) {
      console.log(error)
    })
}

const loginGoogle = async (callback) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const token = await user.getIdToken()

    callback({
      ...user.providerData[0],
      token,
    })
  } catch (error) {
    console.error(error)
  }
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
  const { userData, setUserData } = useUser()

  useEffect(() => {
    initializeApp(firebaseConfig)

    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user.providerData[0])
      } else {
        setUserData(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    loginFBRedirect,
    initApp,
    loginGoogleRedirect,
    loginGoogle,
    logoutFirebase,
  }
}
