<script setup lang="ts">
import { ref } from 'vue';

import SearchBar from './components/SearchBar.vue';
import SuggestionsList from './components/SuggestionsList.vue';
import SearchResult from './components/SearchResult.vue';

import API from './api/API';

const props = defineProps({
    partnerUUID: {
        type: String,
        required: true
    },
    settings: {
        type: Object,
        required: true
    }
})

const search = ref<string>('');
const localSearch = ref<string>('');

const { isPending, isFetching, data } = API.query('public/search', () => ({
    query: search.value,
    partner_uuid: props.partnerUUID
}))
</script>

<template>
    <div class="ploogins:mb-4">
        <SearchBar :color="settings.color" :search="localSearch" @update:search="localSearch = $event" @search="search = $event" />
    </div>
    <SuggestionsList :color="settings.color" @search="search = $event; localSearch = $event;" />

    <div v-if="isFetching && isPending">Loading...</div>
    <div v-else-if="data?.plugins">
        <div class="ploogins:w-full ploogins:flex ploogins:justify-between ploogins:mb-6">
            <span class="ploogins:text-sm">{{ data.plugins.length }} results</span>
            <button type="button" class="ploogins:text-sm ploogins:cursor-pointer ploogins:hover:underline" @click="search = ''; localSearch = ''; data = null;">Clear results</button>
        </div>
        <div class="ploogins:grid ploogins:grid-cols-1 ploogins:gap-4">
            <SearchResult v-for="plugin in data.plugins" :key="plugin.id" :result="plugin" :color="settings.color" />
        </div>
    </div>
</template>