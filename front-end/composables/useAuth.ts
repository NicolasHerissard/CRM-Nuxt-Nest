import type { User } from "~/models"

export function useAuth() {
    
    const apiurl = useRuntimeConfig().public.apiUrl
    const { setUser, clearUser } = useAuthUser()
    const user = ref<User | null>(null)

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
        user.value = await $fetch<User>(`${apiurl}/auth/login`, {
            method: 'POST',
            body: {
                username: username,
                password: password
            },
            credentials: 'include',
        })

        setUser(user.value)
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