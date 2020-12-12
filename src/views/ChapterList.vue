<template>
  <ion-page>    
    <ion-content :fullscreen="true">
        <canto-title></canto-title>
        <ion-card>
          <img style="height: 200px; width: 100%; object-fit: cover;" src="https://source.unsplash.com/featured/?books,study" />
          <ion-card-header>
            <ion-card-subtitle>new session</ion-card-subtitle>
            <ion-card-title>Select Chapter</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item v-for="(chapter, index) in chapters" :key="index" @click="openChapter(chapter.id)" lines="full">
                <ion-label>{{ chapter.name }}</ion-label>
                <ion-note color="secondary">{{ chapter.questions.length }} items</ion-note>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent }          from 'vue';
import { chapters, chapterNames }   from '../data';
import CantoTitle                   from '../components/CantoTitle.vue'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonNote,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue';

export default defineComponent({
  name: 'ChapterList',
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonList,
    IonCard,
    IonNote,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    CantoTitle
  },
  setup() {
    return { chapters }
  },
  methods: {
    openChapter(id: number) {
      this.$router.push(`/chapters/${id}`);
    }
  }
});
</script>

<style scoped>
  ion-card {
    max-width: 30rem;
    margin-right: auto;
    margin-left: auto;
  }

  ion-note {
    font-size: 1rem;
    line-height: 3rem;
  }

  ion-list {
    background: transparent;
    max-height: 35vh;
    overflow-y: auto;
  }

  ion-list::-webkit-scrollbar {
    display: none;
  }

  ion-list {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>
