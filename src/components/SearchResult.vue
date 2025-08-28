<script setup lang="ts">
import { computed } from 'vue';

import { getBorderColorForBackground, getTextColorForBackground } from '@/utils/color';
import { formatDownloads, formatRating, strip_tags } from '@/utils/format';

import API from '@/api/API';

const props = defineProps({
    result: {
        type: Object,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

const textColor = computed(() => getTextColorForBackground(props.color));   
const borderColor = computed(() => getBorderColorForBackground(props.color));

const { isPending, data: insights } = API.query('suggerence/insights', () => ({
    slug: props.result.slug
}))

const emit = defineEmits(['search'])
</script>

<template>
    <div
        class="ploogins:rounded-lg ploogins:p-4 ploogins:gap-4 ploogins:border-2 ploogins:min-h-[14rem] ploogins:bg-white ploogins:text-black ploogins:border-gray-300 ploogins:flex ploogins:flex-col ploogins:justify-between">
        <div class="ploogins:flex">
            <div class="ploogins:grow ploogins:flex ploogins:flex-col ploogins:gap-4">
                <div class="ploogins:flex ploogins:gap-4">
                    <img :src="Object.values(result.icons)[0] as string || ''" :alt="result.name"
                        class="ploogins:w-16 ploogins:h-16 ploogins:rounded-lg">
                    <div class="ploogins:flex ploogins:flex-col ploogins:gap-4">
                        <div>
                            <p class="ploogins:text-xl ploogins:line-clamp-1" :title="result.name"
                                v-html="result.name"></p>
                            <p class="ploogins:[&_a]:hover:underline" v-html="result.author.replace('<a', `<a target='_blank'`)"></p>
                        </div>
                    </div>
                </div>

            </div>

            <div class="ploogins:flex ploogins:flex-col ploogins:items-end ploogins:justify-between ploogins:min-w-fit">
                <div v-if="result.business_model !== 'premium'" class="ploogins:flex ploogins:gap-4">
                    <div class="ploogins:flex ploogins:items-center ploogins:gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-star w-4 h-4 ploogins:fill-black ploogins:text-black">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                            </polygon>
                        </svg>
                        <span>{{ formatRating(result.rating) }}</span>
                    </div>
                    <div class="ploogins:flex ploogins:items-center ploogins:gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-download w-4 h-4">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                        <span>{{ formatDownloads(result.active_installs) }}</span>
                    </div>
                </div>

                <div v-else class="ploogins:flex ploogins:items-center ploogins:gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M21.025 11.05V19q0 .825-.587 1.413T19.025 21h-14q-.825 0-1.412-.587T3.025 19v-7.95q-.575-.525-.887-1.35t-.013-1.8l1.05-3.4q.2-.65.713-1.075T5.075 3h13.9q.675 0 1.175.413t.725 1.087l1.05 3.4q.3.975-.012 1.775t-.888 1.375m-6.8-1.05q.675 0 1.025-.462t.275-1.038l-.55-3.5h-1.95v3.7q0 .525.35.913t.85.387m-4.5 0q.575 0 .938-.388t.362-.912V5h-1.95l-.55 3.5q-.1.6.262 1.05t.938.45m-4.45 0q.45 0 .787-.325t.413-.825L7.025 5h-1.95l-1 3.35q-.15.5.162 1.075T5.275 10m13.5 0q.725 0 1.05-.575t.15-1.075L18.925 5h-1.9l.55 3.85q.075.5.413.825t.787.325m-13.75 9h14v-7.05q-.125.05-.162.05h-.088q-.675 0-1.187-.225t-1.013-.725q-.45.45-1.025.7t-1.225.25q-.675 0-1.263-.25t-1.037-.7q-.425.45-.987.7T9.825 12q-.725 0-1.312-.25t-1.038-.7q-.525.525-1.037.738T5.275 12h-.112q-.063 0-.138-.05zm14 0h-14z" />
                    </svg>
                    <span>{{ result.price }}</span>
                </div>
            </div>
        </div>

        <div>
            <span v-if="isPending"
                class="ploogins:rounded-full ploogins:bg-gray-200 ploogins:w-full ploogins:h-8 ploogins:animate-pulse"></span>
            <span v-else class="ploogins:text-xl ploogins:block ploogins:mb-2">{{ insights?.main_purpose }}</span>

            <div class="ploogins:grow ploogins:flex ploogins:flex-col ploogins:justify-end ploogins:gap-2">
                <div v-if="isPending" class="ploogins:grid ploogins:grid-cols-4 ploogins:gap-2">
                    <div v-for="i in 8" :key="i" class="ploogins:flex ploogins:items-center ploogins:gap-1">
                        <div
                            class="ploogins:w-3 ploogins:h-3 ploogins:bg-gray-200 ploogins:rounded-full ploogins:animate-pulse ploogins:flex-shrink-0">
                        </div>
                        <div
                            class="ploogins:h-3 ploogins:bg-gray-200 ploogins:rounded ploogins:animate-pulse ploogins:flex-1">
                        </div>
                    </div>
                </div>
                <div v-else-if="insights?.features && insights.features.length > 0"
                    class="ploogins:grid ploogins:grid-cols-4 ploogins:gap-2 ploogins:max-h-32 ploogins:overflow-y-auto">
                    <div v-for="feature in insights.features" :key="feature"
                        class="ploogins:flex ploogins:items-center ploogins:gap-1 ploogins:cursor-pointer ploogins:hover:opacity-70 ploogins:py-1"
                        @click="$emit('search', feature)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="ploogins:flex-shrink-0" :style="{ color: color }">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span class="ploogins:text-xs">{{ feature }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="ploogins:flex ploogins:gap-4 ploogins:justify-end ploogins:items-center">
            <a v-if="result.business_model !== 'premium'"
                :href="`https://playground.wordpress.net?plugin=${result.slug}`" target="_blank"
                class="ploogins:flex ploogins:gap-2 ploogins:items-center ploogins:text-sm ploogins:font-bold ploogins:cursor-pointer ploogins:border-2 ploogins:rounded-lg ploogins:px-4 ploogins:py-2 ploogins:transition-all ploogins:duration-300 ploogins:hover:opacity-70 ploogins:w-fit"
                :style="{ backgroundColor: color, color: textColor, borderColor: borderColor }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-external-link w-4 h-4 mr-2">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
                Try in Playground
            </a>
            <a :href="result.business_model === 'premium' ? result.homepage : `https://wordpress.org/plugins/${result.slug}`"
                target="_blank"
                class="ploogins:flex ploogins:gap-2 ploogins:items-center ploogins:text-sm ploogins:font-bold ploogins:cursor-pointer ploogins:border-2 ploogins:rounded-lg ploogins:px-4 ploogins:py-2 ploogins:transition-all ploogins:duration-300 ploogins:hover:opacity-70 ploogins:w-fit"
                :style="{ backgroundColor: color, color: textColor, borderColor: borderColor }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-external-link w-4 h-4 mr-2">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
                View
            </a>
        </div>
    </div>
</template>