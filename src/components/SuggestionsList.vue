<script setup lang="ts">
import API from '../api/API';
import SearchSuggestion from './SearchSuggestion.vue';
import SearchSuggestionLoader from './SearchSuggestionLoader.vue';

const { isPending, data: suggestions } = API.query('public/suggested-searches');

defineProps({
    color: {
        type: String,
        required: true
    }
})

defineEmits(['search']);
</script>

<template>
    <div class="ploogins:mb-6">
        <div v-if="isPending" class="ploogins:w-full ploogins:flex ploogins:items-center ploogins:justify-center ploogins:gap-4">
            <SearchSuggestionLoader v-for="i in 4" :key="`loading-${i}`" :color="color" />
        </div>
        <div v-else class="ploogins:w-full ploogins:flex ploogins:items-center ploogins:justify-center ploogins:gap-4">
            <SearchSuggestion v-for="suggestion in suggestions" :key="suggestion" :suggestion="suggestion" :color="color" @search="$emit('search', suggestion)" />
        </div>
    </div>
</template>