import { auth } from "./firebase"

export async function signInUserAndPassword(email, password) {
  try {
    if (!email || !password) {
      throw new Error('missing user or password')
    }

    const credentials = await auth.signInWithEmailAndPassword(email, password)
    return credentials
  } catch (error) {
    console.log('Error signInUserAndPassword', error.massage)
    throw error
  }
}

export async function logout() {
  try {
    await auth.signOut()
    return true
  } catch (error) {
    console.log('Error logout', error.massage)
    throw error
  }
}