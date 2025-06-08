import type { User } from "~/models"

export function useAuth() {
    
    const apiurl = useRuntimeConfig().public.apiUrl
    const { setUser, clearUser, user } = useAuthUser()

    async function Handleregister(username: string, password: string, email: string) {
        await $fetch<User>(`${apiurl}/auth/register`, {
        method: 'POST',
        body: {
            username: username,
            password: password,
            email: email,
        },
        credentials: 'include',
        })
    }

    async function Handlelogin(username: string, password: string) {
        const userData = await $fetch<{ user: User }>(`${apiurl}/auth/login`, {
            method: 'POST',
            body: {
                username: username,
                password: password
            },
            credentials: 'include',
        })

        setUser(userData.user)
        return userData.user
    }

    async function logout() {
        await $fetch<User>(`${apiurl}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        })

        clearUser()
    }

    return {
        user,
        Handleregister,
        Handlelogin,
        logout,
    }
}