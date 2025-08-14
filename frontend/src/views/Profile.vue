<template>
  <div class="profile">
    <v-container>
      <h1 class="text-h3 mb-6">Mon profil</h1>
      
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Informations personnelles</v-card-title>
            <v-card-text>
              <v-avatar size="100" class="mb-4">
                <v-icon size="100">mdi-account</v-icon>
              </v-avatar>
              <p><strong>Nom :</strong> {{ user.name }}</p>
              <p><strong>Email :</strong> {{ user.email }}</p>
              <p><strong>Téléphone :</strong> {{ user.phone }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="outlined">Modifier</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>Historique des rendez-vous</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="appointment in appointments"
                  :key="appointment.id"
                >
                  <v-list-item-title>{{ appointment.date }} - {{ appointment.time }}</v-list-item-title>
                  <v-list-item-subtitle>{{ appointment.nurse }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ appointment.service }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        phone: '06 12 34 56 78'
      },
      appointments: [
        {
          id: 1,
          date: '15/12/2024',
          time: '14h00',
          nurse: 'Marie Martin',
          service: 'Soins de plaie'
        },
        {
          id: 2,
          date: '18/12/2024',
          time: '10h30',
          nurse: 'Pierre Durand',
          service: 'Prise de sang'
        }
      ]
    }
  }
}
</script>
