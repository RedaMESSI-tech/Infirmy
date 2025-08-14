module.exports = {
  apps: [
    {
      name: 'infirmy-backend',
      script: 'src/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 4000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000
      },
      // Configuration des logs
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Configuration du cluster
      instances: 4,
      exec_mode: 'cluster',
      
      // Gestion des erreurs et redémarrage
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      
      // Configuration du monitoring
      pmx: true,
      
      // Variables d'environnement
      env: {
        NODE_ENV: 'development',
        PORT: 4000,
        MONGODB_URI: 'mongodb://localhost:27017/infirmy'
      },
      
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/infirmy',
        JWT_SECRET: process.env.JWT_SECRET,
        CORS_ORIGIN: process.env.CORS_ORIGIN,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS
      }
    }
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:infirmy/backend.git',
      path: '/var/www/infirmy-backend',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
