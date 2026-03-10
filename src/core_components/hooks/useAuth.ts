import { useAppSelector } from "./redux";

export function useAuth() {
    const { user, isLoggedIn } = useAppSelector((state) => state.user)
    return {
        isLoggedIn,
        user
    }
}