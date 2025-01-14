<script setup>
import NavItem from '@/components/NavItem.vue'
import { NAV_ITEMS } from '@/constants'
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem v-for="it in NAV_ITEMS" :key="it.page" :item="it" />
    </ul>
  </nav>
</template>
