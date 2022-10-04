export default defineNuxtRouteMiddleware((to) => {
    const { useAuthToken } = useAuth;

    if (!useAuthToken && to.path === "/") {
        return navigateTo("/login")
    } else if (useAuthToken && to.path === "/login") {
        return navigateTo("/")
    }
});