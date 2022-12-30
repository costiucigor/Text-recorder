<script setup>
import {useNotification} from "@kyvg/vue3-notification";

const {notify} = useNotification()
import {ref, onMounted} from 'vue'

const transcript = ref('')
const isRecording = ref(false)
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recording = new Recognition()
const selected = ref(null)
const langList = ref([{text:'English', lang: 'en-EN'}, {text:'Russian', lang: 'ru-RU'}, {text:'Romanian', lang:'ro-RO'}])

const changeLang = () => {
  notify({
    text: `Switched to ${selected.value}`,
  });
  recording.lang = selected.value
}

onMounted(() => {
  recording.continuous = true
  recording.interimResults = true
  recording.onstart = () => {
    notify({
      text: "Recording started!",
    });
    isRecording.value = true
  }

  recording.onend = () => {
    notify({
      text: "Recording stopped!",
    });
    isRecording.value = false
  }

  recording.onresult = (event) => {
    for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i]
    }

    const text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    transcript.value = text
  }
})

const ToggleMic = () => {
  isRecording.value ? recording.stop() : recording.start()
}
</script>

<template>
  <div class="app">
    <div class="app-container">
      <h4>Select language</h4>
      <select v-model="selected" @change="changeLang()">
        <option v-for="item in langList" :key="item.text" :value="item.lang">
          {{ item.text }}
        </option>
      </select>
      <h1>Say something</h1>
        <mdicon class="microphone" name="microphone" @click="ToggleMic"/>
      <div class="transcript" v-text="transcript" />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

body {
  background: #fafafa;
}

.transcript {
  display: inline-block;
  animation: cursorBlink 1s infinite;
}

.app-container {
  margin: 50vh 43vw 0;
  width: 50%;
  padding: 10px;
}

.microphone:hover {
  cursor: pointer;
  color: lightskyblue;
}
</style>