<script setup>
import { ref, nextTick } from 'vue'
import { id } from '@/functions'
import { createActivity } from '@/activities'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { ICON_PLUS } from '@/icons'

const name = ref('')

async function submit() {
  if (!name.value === '') {
    return
  }

  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0,
  })

  name.value = ''

  await nextTick()

  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      v-model="name"
      type="text"
      placeholder="Activity name"
      class="w-full rounded border px-4 text-xl"
    />

    <BaseButton :disabled="name.trim() === ''">
      <BaseIcon :name="ICON_PLUS" />
    </BaseButton>
  </form>
</template>
