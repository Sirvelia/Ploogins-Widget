<script setup lang="ts">
import { computed } from 'vue';
import { getBorderColorForBackground } from '@/utils/color';

const props = defineProps({
    color: {
        type: String,
        required: true
    }
})

const borderColor = computed(() => getBorderColorForBackground(props.color));
</script>

<template>
    <div class="ploogins:w-24 ploogins:h-10 ploogins:rounded-full ploogins:animate-pulse ploogins:flex ploogins:items-center ploogins:justify-center ploogins:border-2"
        :style="{ backgroundColor: color, borderColor: borderColor }">
    </div>
</template>