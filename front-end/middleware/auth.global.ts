import type { User } from "~/models"
import { useAuthUser } from "#imports"

export default defineNuxtRouteMiddleware(async(to, from) => {
    if(to.path.startsWith('/auth')) return

    if(import.meta.server) return 

    const { setUser, clearUser, user } = useAuthUser()
    const apiurl = useRuntimeConfig().public.apiUrl

    if(user.value === undefined) return navigateTo('/auth/login')
    
    try {
        const data = await $fetch<User>(`${apiurl}/auth/cookie`, { 
            method: 'GET',
            credentials: 'include',
        })

        setUser(data)
    }
    catch (err: any) {
        clearUser()
        if(err?.status === 401) {
            return navigateTo('/auth/login')
        }
    }
})