<template>
    <div class="container">
        <div class="section">
            <div v-if="entry.length === 0">No entries available.</div>
            <div v-else>
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{ entry.title }}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{ entry.description }}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a :href="`/entries/${entry._id}`" class="card-footer-item">View</a>
                        <a :href="`/entries/edit/${entry._id}`" class="card-footer-item">Edit</a>
                        <a @click="deleteEntry(entry._id)" class="card-footer-item">Delete</a>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const entry = ref('');

const fetchEntry = async () => {
    try {
        const { id } = useRoute().params;
        const response = await axios.get(`https://api.diary.prabhatkumar.site/entries/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        entry.value = response.data;
    } catch (error) {
        console.error('Error fetching entry:', error);
    }
};

onMounted(fetchEntry);

const deleteEntry = async (id) => {
    try {
        await axios.delete(`https://api.diary.prabhatkumar.site/entries/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        router.push('/');
    } catch (error) {
        console.error('Error deleting entry:', error);
    }
};
</script>

<style lang="scss" scoped></style>