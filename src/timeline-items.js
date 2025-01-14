import { computed, ref, watch } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants'
import { endOfHour, isToday, now, toSeconds, today } from './time'
import { stopTimelineItemTimer } from './timeline-item-timer'

export const timelineItemRefs = ref([])

export const timelineItems = ref([])

export const activeTimelineItem = computed(() => timelineItems.value.find((it) => it.isActive))

watch(now, (after, before) => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
    stopTimelineItemTimer()
  }

  if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
    resetItems()
  }
})

export function initTimelineItems(state) {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetItems()
  }
}

export function updateTimelineItem(item, fields) {
  return Object.assign(item, fields)
}

export function resetActivities(timelineItems, activity) {
  filterByActivity(timelineItems, activity).forEach((item) =>
    updateTimelineItem(item, {
      activityId: null,
      activitySeconds: item.hour === today().getHours() ? item.activitySeconds : 0,
    }),
  )
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
  return filterByActivity(timelineItems, activity)
    .map((it) => it.activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(today().getHours(), isSmooth)
}

export function scrollToHour(hour, isSmooth = true) {
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}

function resetItems() {
  timelineItems.value.forEach((item) =>
    updateTimelineItem(item, {
      activitySeconds: 0,
      isActive: false,
    }),
  )
}

function syncIdleSeconds(lastActiveAt) {
  updateTimelineItem(activeTimelineItem.value, {
    activitySeconds: activeTimelineItem.value.activitySeconds + calculateIdleSeconds(lastActiveAt),
  })
}

function calculateIdleSeconds(lastActiveAt) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() - lastActiveAt)
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
}

function filterByActivity(timelineItems, { id }) {
  return timelineItems.filter((it) => it.activityId === id)
}

function generateItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    isActive: false,
  }))
}
