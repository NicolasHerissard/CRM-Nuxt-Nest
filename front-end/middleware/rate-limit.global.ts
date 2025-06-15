export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuthUser()
    const token = useCookie('auth_token')

    if(token.value) {
        token.value = null
        return navigateTo('/auth/login')
    }

    if(!user.value && to.path !== '/auth/login') {
        return navigateTo('/auth/login')
    }
})