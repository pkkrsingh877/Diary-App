<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <h1 class="title">Create New Entry</h1>
            <form action="" @submit="handleCreateEntry">
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="title" id="title" v-model="title">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Entry</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Entry" id="description"
                            v-model="description"></textarea>
                    </div>
                </div>

                <div class="control">
                    <button class="button is-primary" type="submit">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const router = useRouter();
const title = ref('');
const description = ref('');

const handleCreateEntry = async (e) => {
    e.preventDefault();
    const { data, error, pending } = await useFetch(`${useRuntimeConfig().public.apiURL}/entries/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            title: title.value,
            description: description.value
        }),
        credentials: 'include'
    });
    router.push('/entries');
}
</script>

<style lang="scss" scoped></style>