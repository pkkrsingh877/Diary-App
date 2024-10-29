<template>
    <div class="container">
        <div class="section">
            <div v-if="entries.length === 0">
                No entries available.
            </div>
            <div v-else>
                <div v-for="entry in entries" :key="entry._id">
                    <div class="card  mb-4">
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
const entries = ref([]);

const fetchEntries = async () => {
    try {
        const response = await fetch(`/entries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (data.message !== 'Unauthorized: No token provided') {
            entries.value = data;
        }
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
};

onMounted(fetchEntries);

const deleteEntry = async (id) => {
    try {
        const response = await fetch(`/entries/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            entries.value = entries.value.filter(entry => entry._id !== id);
        } else {
            console.error('Failed to delete todo. Server response:', response);
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