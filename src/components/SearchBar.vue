<script setup lang="ts">
defineProps({
    search: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['search', 'update:search']);
</script>

<template>
    <form class="ploogins:relative ploogins:w-full" @submit.prevent="emit('search', search)">
        <button type="button"
            class="ploogins:absolute ploogins:left-3 ploogins:top-1/2 ploogins:-translate-y-1/2 ploogins:cursor-pointer"
            @click="emit('search', search)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="ploogins:w-6 ploogins:h-6 ploogins:text-black">
                <path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
            </svg>
        </button>
        <input type="text"
            class="ploogins:w-full ploogins:rounded-lg ploogins:pl-12 ploogins:py-4 ploogins:outline-none ploogins:border-2 ploogins:bg-white ploogins:text-black ploogins:border-gray-300"
            placeholder="Search plugins..."
            :value="search"
            @input="emit('update:search', ($event.target as HTMLInputElement).value)" />
    </form>
</template>