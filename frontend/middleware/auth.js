export default function({ store, redirect }) {
  if (!store.getters['auth/isAuthenticated']) {
    console.log('auth')
    redirect('/auth')
  }
}
