<template>
    <div class="container">
        <div class="section">
            <div v-if="isLoading">Loading entries...</div>
            <div v-else-if="entries.length === 0">No entries available.</div>
            <div v-else>
                <div v-for="entry in entries" :key="entry._id">
                    <div class="card mb-4">
                        <header class="card-header">
                            <p class="card-header-title">{{ entry.title }}</p>
                        </header>
                        <div class="card-content">
                            <div class="content">{{ entry.description }}</div>
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const entries = ref([]);
const isLoading = ref(true);

const fetchEntries = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get('https://api.diary.prabhatkumar.site/entries', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        const data = response.data;
        if (data.message !== 'Unauthorized: No token provided') {
            entries.value = data;
        }
    } catch (error) {
        console.error('Error fetching entries:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchEntries);

const deleteEntry = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
        const response = await axios.delete(`https://api.diary.prabhatkumar.site/entries/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            entries.value = entries.value.filter(entry => entry._id !== id);
        }
    } catch (error) {
        console.error('Error deleting entries:', error);
    }
};
</script>

<style scoped>
.card {
    min-width: 2rem;
}
</style>
