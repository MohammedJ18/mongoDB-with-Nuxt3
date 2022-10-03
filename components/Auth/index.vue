<script lang="ts" setup>
const isSignUp = ref(false)


const info = reactive({
    username: '',
    password: '',
    name: '',
    email: '',
    confirmPassword: '',


})
async function signIn() {

    const { login } = useAuth()
    try {
        await login({ username: info.username, password: info.password })
    } catch (error) {
        console.log(error)
    }
}

async function signUp() {

    const { register } = useAuth()
    try {
        await register({
            username: info.username,
            password: info.password,
            repeatPassword: info.confirmPassword,
            email: info.email,
            name: info.name,

        })
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <form class="bg-black flex justify-center border rounded-lg w-full" @submit.prevent="() => (isSignUp ? signUp() : signIn())">
        <div class="flex flex-col justify-center">
            <p v-if="!isSignUp" class="text-white mt-8">Sign in via username and password</p>
            <p v-else class="text-white">SignUp</p>
            <div class="flex flex-col">
                <input type="text" placeholder="Your username" v-model="info.username" />
                <input class="mt-2" type="password" placeholder="Your password" v-model="info.password" />
                <div class="flex flex-col mt-2" v-if="isSignUp">
                    <input class="mt-2" type="password" placeholder="Your password" v-model="info.confirmPassword" />
                    <input class="mt-2" type="email" placeholder="Your email" v-model="info.email" />
                    <input class="mt-2" type="text" placeholder="name" v-model="info.name" />
                </div>
            </div>
            <div class="my-2 w-full">
                <button class="w-full bg-green text-sm text-center" type="submit"><span v-if="isSignUp"> Sign up </span>
                    <span v-else> Log in </span>
                </button>
                <button @click="isSignUp = !isSignUp" class="w-full mt-8 text-sm text-center underline">
                    <span v-if="isSignUp"> Have an account? Log in instead </span>
                    <span v-else> Create a new account </span>
                </button>
            </div>
        </div>
    </form>
</template>