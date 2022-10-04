<script lang="ts" setup>
import { env } from "process";
import * as Realm from "realm-web";
const isSignUp = ref(false)

const app = new Realm.App({ id: "application-0-ajwht" });

const info = reactive({
    username: '',
    password: '',
    name: '',
    email: '',
    confirmPassword: '',


})

async function signUp() {
    try {
        //Create a new email/password account
        await app.emailPasswordAuth.registerUser(info.email, info.password);

        //Log the user in
        await app.logIn(Realm.Credentials.emailPassword(info.email, info.password));

        //Create a new profile document
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("nuxt").collection("profile");

        const res = await collection.insertOne({
            user_id: app.currentUser.id,
            name: info.name,
        });
    } catch (err) {
        console.error("Failed to log in", err);
    }
}

async function signIn() {
    const credentials = Realm.Credentials.emailPassword(info.username, info.password);
    try {
        const user = await app.logIn(credentials);
        console.log(`Successfully logged in as user ${user.id}`);
    } catch (err) {
        console.error("Failed to log in", err);
    }

}



// async function signIn() {

//     const { login } = useAuth()
//     try {
//         await login({ username: info.username, password: info.password })
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function signUp() {

//     const { register } = useAuth()
//     try {
//         await register({
//             username: info.username,
//             password: info.password,
//             repeatPassword: info.confirmPassword,
//             email: info.email,
//             name: info.name,

//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
// async function getAuth() {
//     const { getUser } = useAuth()
//     try {
//         await getUser()
//     } catch (error) {
//         console.log(error)
//     }
// }

</script>

<template>
    <form class="bg-black flex justify-center border rounded-lg w-full" @submit.prevent="() => (isSignUp ? signUp() : signIn())">
        <div class="flex flex-col justify-center">
            <p v-if="!isSignUp" class="text-white mt-8">Sign in via username and password</p>
            <p v-else class="text-white">SignUp</p>
            <div class="flex flex-col">
                <input class="mt-2" type="email" placeholder="Your email" v-model="info.email" />
                <!-- <input type="text" placeholder="Your username" v-model="info.username" /> -->
                <input class="mt-2" type="password" placeholder="Your password" v-model="info.password" />
                <div class="flex flex-col mt-2" v-if="isSignUp">
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