<script setup>
import VoiceRecognition from "./components/VoiceRecognition.vue";
import {ref} from "vue";
import {notify} from "@kyvg/vue3-notification";

const selectedLanguage = ref("en-EN")
const langList = ref([{text: 'English', lang: 'en-EN'}, {text: 'Russian', lang: 'ru-RU'}, {
  text: 'Romanian',
  lang: 'ro-RO'
}])

const changeLang = () => {
  notify({
    text: `Switched to ${selectedLanguage.value}`,
  });
}
</script>

<template>
  <notifications />
  <div class="select-container">
    <h4>Select language for better recognition</h4>
    <select
        class="select"
        v-model="selectedLanguage"
        @change="changeLang()"
        :item="langList"
    >
      <option v-for="item in langList" :value="item.lang">
        {{ item.text }}
      </option>
    </select>
  </div>
  <voice-recognition :selectedLanguage="selectedLanguage">
  </voice-recognition>
</template>

<style scoped>
.select {
  border: 1px solid black;
  width: 300px;
}

.select-container {
  margin-left: 80px;
}
</style>
