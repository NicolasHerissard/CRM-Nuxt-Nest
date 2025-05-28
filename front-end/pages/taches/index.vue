<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref, type App } from 'vue'
import type { Appointments } from '~/models'

const events = ref<Appointments[]>([])

onMounted(async () => {
  const { data } = await useFetch<Appointments[]>('http://localhost:3001/appointments', {
    method: 'GET',
  })

  if(data.value) {
    events.value = data.value.map((appointment: Appointments) => ({
      id: appointment.id,
      title: appointment.title,
      start: appointment.start,
      end: appointment.end,
      clientId: appointment.clientId,
    }))
  }
})

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  selectable: true,
  editable: true,
  select: function (info: any) {
    alert('Selected' + info.startStr + ' to ' + info.endStr)
  },
  eventClick: function (info: any) {
    alert('Event clicked' + info.event.title)
  },
  events: []
})

</script>

<template>
  <div class="p-5">
    <FullCalendar :options="calendarOptions"/>
  </div>
</template>
