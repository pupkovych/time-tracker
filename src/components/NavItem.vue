<script setup>
import { computed } from 'vue'
import { PAGE_TIMELINE } from '@/constants'
import { isNavItemValid } from '@/validators'
import { currentPage, navigate } from '@/router'
import { scrollToCurrentHour } from '@/timeline-items'
import BaseIcon from '@/components/BaseIcon.vue'

const props = defineProps({
  item: {
    required: true,
    type: Object,
    validator: isNavItemValid,
  },
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  props.item.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100',
])

function handleClick() {
  currentPage.value === PAGE_TIMELINE && props.item.page === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.item.page)
}
</script>

<template>
  <li class="flex-1">
    <a :href="`#${item.page}`" :class="classes" @click="handleClick">
      <BaseIcon :name="item.icon" class="h-6 w-6" /> {{ item.page }}
    </a>
  </li>
</template>
