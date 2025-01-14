<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import { isTimelineItemValid } from '@/validators'
import { updateTimelineItem } from '@/timeline-items'
import { activityOptions } from '@/activities'

defineProps({
  item: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  },
})
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="item.hour" />
    <BaseSelect
      :selected="item.activityId"
      :options="activityOptions"
      placeholder="Rest"
      @select="updateTimelineItem(item, { activityId: $event })"
    />
    <TimelineStopwatch :timeline-item="item" />
  </li>
</template>
