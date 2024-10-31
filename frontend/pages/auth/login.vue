<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <h1 class="title">Login Page</h1>
            <form action="" id="form" @submit="handleLogin">
                <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="username" id="username" v-model="username">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <p class="control has-icons-left">
                        <input class="input" type="password" placeholder="password" id="password" v-model="password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-success" type="submit">
                            Login
                        </button>
                    </p>
                </div>
            </form>
            <NuxtLink to="/auth/signup">Don't have an account yet?</NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`https://api.diary.prabhatkumar.site/auth/login`, {
            username: username.value,
            password: password.value
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        router.push('/entries');
    } catch (error) {
        console.error('Error logging in:', error);
    }
}
</script>

<style scoped></style>