<script setup lang="ts">
import { computed } from 'vue';
import { getBorderColorForBackground, getTextColorForBackground } from '@/utils/color';

const props = defineProps({
    suggestion: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

const textColor = computed(() => getTextColorForBackground(props.color));
const borderColor = computed(() => getBorderColorForBackground(props.color));

defineEmits(['search']);
</script>

<template>
    <button
        type="button"
        class="ploogins:w-auto ploogins:px-4 ploogins:h-10 ploogins:rounded-full ploogins:text-sm ploogins:font-medium ploogins:flex ploogins:items-center ploogins:justify-center ploogins:cursor-pointer ploogins:border-2 ploogins:transition-all ploogins:duration-300 ploogins:hover:opacity-70"
        :style="{ backgroundColor: color, color: textColor, borderColor: borderColor }"
        @click="$emit('search')">
        {{ suggestion }}
    </button>
</template>