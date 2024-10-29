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
import { ref, onMounted } from 'vue';

const entry = ref('');

const fetchEntry = async () => {
    try {
        const { id } = useRoute().params;
        const response = await fetch(`${useRuntimeConfig().public.apiURL}/entries/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (data.message !== 'Unauthorized: No token provided') {
            entry.value = data;
        }
    } catch (error) {
        console.error('Error fetching entry:', error);
    }
};

onMounted(fetchEntry);

const deleteEntry = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/entries/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        router.push('/');
    } catch (error) {
        console.error('Error deleting entry:', error);
    }
};
</script>

<style lang="scss" scoped></style>