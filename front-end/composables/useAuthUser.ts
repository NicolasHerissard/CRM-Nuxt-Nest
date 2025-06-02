
import { ref } from "vue"
import type { User } from "~/models"

const user = ref<User | null>(null)

export function useAuthUser() {
  return {
    user,
    setUser: (newUser: User) => {
      user.value = newUser
    },
    clearUser: () => {
      user.value = null
    },
  }
}