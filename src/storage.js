import { APP_NAME } from '@/constants'
import { today } from '@/time'
import { activities, initActivities } from '@/activities'
import { activeTimelineItem, timelineItems, initTimelineItems } from '@/timeline-items'
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/timeline-item-timer'

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad ? startTimelineItemTimer() : stopTimelineItemTimer()
  }
}

function loadState() {
  const state = loadFromLocalStorage()

  initActivities(state)
  initTimelineItems(state)
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}')
}

function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today(),
    }),
  )
}
