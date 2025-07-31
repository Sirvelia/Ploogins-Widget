<script setup lang="ts">
import { ref } from 'vue';

import SearchBar from './components/SearchBar.vue';
import SuggestionsList from './components/SuggestionsList.vue';
import SearchResult from './components/SearchResult.vue';
import SearchResultLoader from './components/SearchResultLoader.vue';

import API from './api/API';

const props = defineProps({
    partnerUUID: {
        type: String,
        required: true
    },
    settings: {
        type: Object,
        required: true
    },
    initialSearch: {
        type: String,
        required: false,
        default: ''
    }
})

const search = ref<string>(props.initialSearch);
const localSearch = ref<string>(props.initialSearch);

const { isPending, isFetching, data } = API.query('public/search', () => ({
    query: search.value,
    partner_uuid: props.partnerUUID
}))
</script>

<template>
    <div class="ploogins:mb-4">
        <SearchBar :search="localSearch" @update:search="localSearch = $event" @search="search = $event" />
    </div>
    <SuggestionsList :color="settings.color" @search="search = $event; localSearch = $event;" />

    <div v-if="isFetching && isPending" class="ploogins:grid ploogins:grid-cols-1 ploogins:lg:grid-cols-2 ploogins:gap-4">
        <SearchResultLoader v-for="i in 6" :key="i" />
    </div>
    <div v-else-if="data?.plugins">
        <div class="ploogins:w-full ploogins:flex ploogins:justify-between ploogins:mb-6">
            <span class="ploogins:text-sm">{{ data.plugins.length }} results</span>
            <button type="button" class="ploogins:text-sm ploogins:cursor-pointer ploogins:hover:underline" @click="search = ''; localSearch = ''; data = null;">Clear results</button>
        </div>
        <div class="ploogins:grid ploogins:grid-cols-1 ploogins:lg:grid-cols-2 ploogins:gap-4">
            <SearchResult v-for="plugin in data.plugins" :key="plugin.id" :result="plugin" :color="settings.color" @search="search = $event; localSearch = $event;" />
        </div>
    </div>
</template>