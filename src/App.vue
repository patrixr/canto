<template>
  <ion-app>
    <div class="ion-page" id="main-content">
      <ion-content class="ion-padding">
        <ion-router-outlet />
      </ion-content>
    </div>
  </ion-app>
</template>

<script lang="ts">
  import {
    IonApp,
    IonRouterOutlet
  } from '@ionic/vue';

  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'App',
    components: {
      IonApp,
      IonRouterOutlet
    }
  });
</script>
