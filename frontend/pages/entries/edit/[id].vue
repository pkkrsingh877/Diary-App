<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <h1 class="title">Update Entry</h1>
            <form action="" @submit="handleUpdateEntry">
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="title" id="title" v-model="title">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Entry</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="entry" id="description"
                            v-model="description"></textarea>
                    </div>
                </div>

                <div class="control">
                    <button class="button is-primary" type="submit">Update</button>
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

// Fetch notes from the server
const fetchEntry = async () => {
    try {
        const { id } = useRoute().params;
        const response = await fetch(`/entries/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        title.value = data.title;
        description.value = data.description;
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
};

// Call fetchNotes when the component is mounted
onMounted(fetchEntry);

const handleUpdateEntry = async (e) => {
    e.preventDefault();
    const { id } = useRoute().params;
    const { message } = await useFetch(`/entries/${id}`, {
        method: 'PATCH',
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