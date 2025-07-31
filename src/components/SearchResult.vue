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
    <div class="ploogins:rounded-lg ploogins:p-4 ploogins:flex ploogins:gap-4 ploogins:justify-between ploogins:border-2 ploogins:min-h-[14rem] ploogins:bg-white ploogins:text-black ploogins:border-gray-300">
        <div class="ploogins:grow ploogins:flex ploogins:flex-col ploogins:gap-4">
            <div class="ploogins:flex ploogins:gap-4">
                <img :src="Object.values(result.icons)[0] as string || ''" :alt="result.name"
                    class="ploogins:w-16 ploogins:h-16 ploogins:rounded-lg">
                <div class="ploogins:flex ploogins:flex-col ploogins:gap-4">
                    <div>
                        <p class="ploogins:text-xl" v-html="result.name"></p>
                        <p class="ploogins:[&_a]:hover:underline" v-html="result.author"></p>
                    </div>

                    <div class="ploogins:flex ploogins:gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                            viewBox="0 0 24 24" class="ploogins:fill-black ploogins:text-black ploogins:min-w-6 ploogins:min-h-6">
                            <path fill="currentColor"
                                d="M21.738 16.13a1 1 0 0 1-.19.61a1 1 0 0 1-.52.38l-1.71.57a3.6 3.6 0 0 0-1.4.86a3.5 3.5 0 0 0-.86 1.4l-.6 1.7a1 1 0 0 1-.36.51a1.1 1.1 0 0 1-.62.19a1 1 0 0 1-1-.71l-.57-1.71a3.5 3.5 0 0 0-.86-1.4a3.8 3.8 0 0 0-1.4-.87l-1.71-.56a1.1 1.1 0 0 1-.51-.37a1.1 1.1 0 0 1-.21-.62a1 1 0 0 1 .71-1l1.72-.57a3.54 3.54 0 0 0 2.28-2.28l.57-1.69a1 1 0 0 1 .95-.73c.215 0 .426.059.61.17c.182.125.322.303.4.51l.58 1.74a3.54 3.54 0 0 0 2.28 2.28l1.7.6a1 1 0 0 1 .51.38a1 1 0 0 1 .21.61m-9.999-6.36a1 1 0 0 1-.17.55a1 1 0 0 1-.47.35l-1.26.42c-.353.122-.673.32-.94.58a2.5 2.5 0 0 0-.58.94l-.43 1.24a.9.9 0 0 1-.35.47a1 1 0 0 1-.56.18a1 1 0 0 1-.57-.19a1 1 0 0 1-.34-.47l-.41-1.25a2.44 2.44 0 0 0-.58-.93a2.2 2.2 0 0 0-.93-.58l-1.25-.42a.93.93 0 0 1-.48-.35a1 1 0 0 1 .48-1.47l1.25-.41a2.49 2.49 0 0 0 1.53-1.53l.41-1.23a1 1 0 0 1 .32-.47a1 1 0 0 1 .55-.2a1 1 0 0 1 .57.16a1 1 0 0 1 .37.46l.42 1.28a2.49 2.49 0 0 0 1.53 1.53l1.25.43a.92.92 0 0 1 .46.35a.94.94 0 0 1 .18.56m5.789-5.36a1 1 0 0 1-.17.51a.82.82 0 0 1-.42.3l-.62.21a.84.84 0 0 0-.52.52l-.22.63a.93.93 0 0 1-.29.39a.82.82 0 0 1-.52.18a1.1 1.1 0 0 1-.49-.15a.9.9 0 0 1-.32-.44l-.21-.62a.7.7 0 0 0-.2-.32a.76.76 0 0 0-.32-.2l-.62-.2a1 1 0 0 1-.42-.31a.9.9 0 0 1-.16-.51a.94.94 0 0 1 .17-.51a.9.9 0 0 1 .42-.3l.61-.2a.9.9 0 0 0 .33-.2a.9.9 0 0 0 .2-.33l.21-.62c.06-.155.155-.292.28-.4a1 1 0 0 1 .49-.19a.94.94 0 0 1 .53.16a1 1 0 0 1 .32.41l.21.64a.9.9 0 0 0 .2.33a1 1 0 0 0 .32.2l.63.21a1 1 0 0 1 .41.3a.87.87 0 0 1 .17.51" />
                        </svg>
                        <span v-if="isPending" class="ploogins:rounded-full ploogins:bg-gray-200 ploogins:w-full ploogins:h-8 ploogins:animate-pulse"></span>
                        <span v-else class="ploogins:text-xl">{{ insights?.main_purpose }}</span>
                    </div>
                </div>
            </div>

            <div class="ploogins:grow ploogins:flex ploogins:flex-col ploogins:justify-end ploogins:gap-2">
                <div class="ploogins:flex ploogins:flex-wrap ploogins:gap-2">
                    <div v-if="isPending" v-for="i in 3" :key="i"
                        class="ploogins:rounded-full ploogins:bg-gray-200 ploogins:w-16 ploogins:h-6 ploogins:animate-pulse">
                    </div>
                    <div v-else v-for="tag in insights?.tags"
                        class="ploogins:border ploogins:rounded-full ploogins:px-4 ploogins:py-1 ploogins:text-sm ploogins:line-clamp-1 ploogins:cursor-pointer ploogins:hover:opacity-70"
                        :style="{ borderColor: borderColor }"
                        @click="$emit('search', tag)">{{ tag }}
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