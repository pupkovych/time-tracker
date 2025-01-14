import { computed } from 'vue'
import { getProgressColorClass } from '@/functions'
import { calculateActivityCompletionPercentage } from '@/activities'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'

export function useProgress(activity) {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const trackedActivitySeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity),
  )

  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value),
  )

  return {
    colorClass,
    percentage,
    trackedActivitySeconds,
  }
}
