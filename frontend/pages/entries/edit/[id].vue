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
import axios from 'axios';
import { ref } from 'vue';
const router = useRouter();
const title = ref('');
const description = ref('');

// Fetch notes from the server
const fetchEntry = async () => {
    try {
        const { id } = useRoute().params;
        const response = await axios.get(`/entries/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        title.value = response.data.title;
        description.value = response.data.description;
    } catch (error) {
        console.error('Error fetching entry:', error);
    }
};

// Call fetchNotes when the component is mounted
onMounted(fetchEntry);

const handleUpdateEntry = async (e) => {
    e.preventDefault();
    const { id } = useRoute().params;
    try {
        await axios.patch(`/entries/${id}`, {
            title: title.value,
            description: description.value
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        router.push('/entries');
    } catch (error) {
        console.error('Error updating entry:', error);
    }
}
</script>

<style lang="scss" scoped></style>