<template>
  <div class="security">
    <v-container>
      <h1 class="text-h3 mb-6">Sécurité et confidentialité</h1>
      
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Sécurité des données</v-card-title>
            <v-card-text>
              <p>Vos données personnelles sont protégées par un chiffrement SSL 256 bits et stockées de manière sécurisée sur des serveurs conformes au RGPD.</p>
              <v-list>
                <v-list-item prepend-icon="mdi-shield-check">
                  <v-list-item-title>Chiffrement SSL</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-database-lock">
                  <v-list-item-title>Stockage sécurisé</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-account-lock">
                  <v-list-item-title>Accès restreint</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Confidentialité</v-card-title>
            <v-card-text>
              <p>Nous respectons votre vie privée et ne partageons jamais vos informations personnelles avec des tiers sans votre consentement explicite.</p>
              <v-list>
                <v-list-item prepend-icon="mdi-eye-off">
                  <v-list-item-title>Données privées</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-handshake">
                  <v-list-item-title>Consentement requis</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-delete">
                  <v-list-item-title>Droit à l'oubli</v-list-item-title>
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
  name: 'Security'
}
</script>
