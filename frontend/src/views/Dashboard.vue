<template>
  <div class="dashboard">
    <v-container>
      <h1 class="text-h3 mb-6">Tableau de bord</h1>
      
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Rendez-vous à venir</v-card-title>
            <v-card-text>
              <p class="text-h4">3</p>
              <p>Prochain RDV : Aujourd'hui à 14h</p>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Infirmiers disponibles</v-card-title>
            <v-card-text>
              <p class="text-h4">12</p>
              <p>Dans votre région</p>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Messages</v-card-title>
            <v-card-text>
              <p class="text-h4">5</p>
              <p>Non lus</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>
