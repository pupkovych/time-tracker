<script setup>
import { isActivityValid } from '@/validators'
import { updateActivity, deleteActivity } from '@/activities'
import { timelineItems, resetActivities } from '@/timeline-items'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import RemainingActivitySeconds from '@/components/RemainingActivitySeconds .vue'
import { ICON_TRASH } from '@/icons'
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '@/constants'

defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid,
  },
})

function deleteAndResetActivity(activity) {
  resetActivities(timelineItems.value, activity)
  deleteActivity(activity)
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon :name="ICON_TRASH" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />

      <RemainingActivitySeconds v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
