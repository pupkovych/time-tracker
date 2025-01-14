import { ref } from 'vue'
import { MILLISECONDS_IN_SECOND } from '@/constants'
import { activeTimelineItem, updateTimelineItem } from '@/timeline-items'

const timelineItemTimer = ref(false)

export function startTimelineItemTimer(item) {
  item = item ?? activeTimelineItem.value

  updateTimelineItem(item, { isActive: true })

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(item, {
      activitySeconds: item.activitySeconds + 1,
    })
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer() {
  updateTimelineItem(activeTimelineItem.value, { isActive: false })

  clearInterval(timelineItemTimer.value)

  timelineItemTimer.value = false
}

export function resetTimelineItemTimer(item) {
  updateTimelineItem(item, { activitySeconds: 0 })

  if (activeTimelineItem.value) {
    stopTimelineItemTimer()
  }
}
