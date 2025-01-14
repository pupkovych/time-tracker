import { ref, computed } from 'vue'
import { HUNDRED_PERCENT } from '@/constants'

export const activities = ref([])

export const trackedActivities = computed(() => {
  return activities.value.filter((it) => it.secondsToComplete)
})

export const activityOptions = computed(() => generateActivityOptions(activities.value))

export function initActivities(state) {
  activities.value = state.activities || []
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function calculateActivityCompletionPercentage(activity, trackedSeconds) {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / activity.secondsToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds) {
  return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map((it) => it.secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

function generateActivityOptions(items) {
  return items.map((it) => ({ value: it.id, label: it.name }))
}
