<template>
  <ion-page>    
    <ion-content :fullscreen="true">
      <canto-title></canto-title>
      <div class="progress">
        <div> Question {{questionIdx + 1}} / {{chapter.questions.length}} </div>
        <ion-progress-bar color="tertiary" :value="progress"></ion-progress-bar>
      </div>
      <div id="container">
        <ion-card v-if="active">
          <ion-card-header>
            <ion-card-subtitle>{{chapter.name}}</ion-card-subtitle>
            <ion-card-title>Translate</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-text color="primary" class="question">"{{ question.eng }}"</ion-text>
            <ion-text color="success" class="answer">
              <span :class="hideAnswer && 'hide'">{{ question.yale }}</span>
            </ion-text>

            <!-- Show Answer Button -->
            <ion-fab v-if="hideAnswer" vertical="bottom" horizontal="end">
              <ion-fab-button @click="showAnswer" color="warning">
                <ion-icon :src="icons.eyeOutline"></ion-icon>
              </ion-fab-button>
            </ion-fab>

            <ion-fab v-if="!hideAnswer" vertical="bottom" horizontal="end">
              <ion-fab-button @click="nextQuestion" color="success">
                <ion-icon :src="icons.arrowForward"></ion-icon>
              </ion-fab-button>
            </ion-fab>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute, useRouter }        from 'vue-router'
import { chapters }                   from '../data'
import { shuffle }                    from '../utils'
import CantoTitle                     from '../components/CantoTitle.vue'
import * as icons                     from "ionicons/icons";
import {
  defineComponent,
  ref,
  watch,
  computed
}  from 'vue';
import { 
  IonContent,
  IonHeader,
  IonPage, 
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonProgressBar,
  IonFab,
  IonFabButton
} from '@ionic/vue';

export default defineComponent({
  name: 'Chapter',
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonProgressBar,
    CantoTitle,
    IonFab,
    IonFabButton
  },
  setup(props) {
    const route   = useRoute();
    const router  = useRouter();
    const id      = Number(route.params.id);
    const chapter = chapters.find(c => c.id === id);

    if (!chapter) {
      router.replace('/');
      return {};
    }

    const questions       = shuffle(chapter.questions);
    const questionIdx     = ref(0);
    const hideAnswer      = ref(true);
    const question        = computed(() => questions[questionIdx.value])
    const progress        = computed(() => questionIdx.value == 0 ? 0 : questionIdx.value / questions.length)
    const finished        = computed(() => progress.value === 1);
    const active          = computed(() => !finished.value);

    watch(questionIdx, () => {
      hideAnswer.value = true;
    });

    watch(finished, () => {
      if (finished.value) {
        router.replace('/');
      }
    });

    const showAnswer    = () => hideAnswer.value = false
    const nextQuestion  = () => questionIdx.value++

    return { icons, chapter, question, questionIdx, progress, showAnswer, hideAnswer, finished, nextQuestion, active};
  }
});
</script>

<style scoped>
  .progress {
    width: 80%;
    margin: 0 auto;
    line-height: 3rem;
    color: white;
    font-weight: bold;
    max-width: 30rem;
  }

  ion-card {
    max-width: 30rem;
    margin-right: auto;
    margin-left: auto;
  }

  ion-card-content {
    padding-bottom: 5rem;
    min-height: 18rem;
  }

  ion-fab.fab-horizontal-end.fab-vertical-bottom {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }

  ion-fab-button ion-icon {
    color: white;
  }

  ion-text {
    display: block;
  }

  .question, .answer {
    text-align: center;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .question {
    font-size: 1.7rem;
  }

  .answer {
    font-size: 1.7rem;
  }

  .answer span {
    transition: opacity 0.2s ease;
    opacity: 1;
  }
  .answer span.hide {
    transition-duration: 0s;
    opacity: 0;
  }
</style>
