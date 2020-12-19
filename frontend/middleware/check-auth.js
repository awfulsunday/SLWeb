export default function(context) {
  console.log('check-auth')
  context.store.dispatch('auth/initAuth', context.req)
}
