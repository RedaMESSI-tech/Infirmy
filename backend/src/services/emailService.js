import nodemailer from 'nodemailer';

// Configuration du transporteur email
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Configuration SMTP personnalisée
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // Configuration par défaut (pour les tests)
    return nodemailer.createTransporter({
      host: 'localhost',
      port: 1025,
      ignoreTLS: true
    });
  }
};

// Templates d'emails
const emailTemplates = {
  welcome: (user) => ({
    subject: 'Bienvenue sur Infirmy !',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">Bienvenue sur Infirmy !</h1>
        <p>Bonjour ${user.firstName},</p>
        <p>Nous sommes ravis de vous accueillir sur Infirmy, la plateforme qui connecte patients et infirmiers pour des soins à domicile de qualité.</p>
        <p>Votre compte a été créé avec succès. Vous pouvez dès maintenant :</p>
        <ul>
          <li>Compléter votre profil</li>
          <li>Rechercher des infirmiers dans votre région</li>
          <li>Prendre rendez-vous</li>
        </ul>
        <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
        <p>Cordialement,<br>L'équipe Infirmy</p>
      </div>
    `
  }),

  appointmentRequest: (appointment, nurse, patient) => ({
    subject: 'Nouvelle demande de rendez-vous',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">Nouvelle demande de rendez-vous</h1>
        <p>Bonjour ${nurse.firstName},</p>
        <p>Vous avez reçu une nouvelle demande de rendez-vous de la part de ${patient.firstName} ${patient.lastName}.</p>
        <h3>Détails du rendez-vous :</h3>
        <ul>
          <li><strong>Date :</strong> ${new Date(appointment.start).toLocaleDateString('fr-FR')}</li>
          <li><strong>Heure :</strong> ${new Date(appointment.start).toLocaleTimeString('fr-FR')}</li>
          <li><strong>Service :</strong> ${appointment.service}</li>
          <li><strong>Adresse :</strong> ${appointment.address}, ${appointment.postalCode} ${appointment.city}</li>
          <li><strong>Note du patient :</strong> ${appointment.patientNote || 'Aucune note'}</li>
        </ul>
        <p>Connectez-vous à votre espace Infirmy pour accepter ou refuser cette demande.</p>
        <p>Cordialement,<br>L'équipe Infirmy</p>
      </div>
    `
  }),

  appointmentConfirmed: (appointment, nurse, patient) => ({
    subject: 'Rendez-vous confirmé',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">Rendez-vous confirmé</h1>
        <p>Bonjour ${patient.firstName},</p>
        <p>Votre rendez-vous avec ${nurse.firstName} ${nurse.lastName} a été confirmé.</p>
        <h3>Détails du rendez-vous :</h3>
        <ul>
          <li><strong>Date :</strong> ${new Date(appointment.start).toLocaleDateString('fr-FR')}</li>
          <li><strong>Heure :</strong> ${new Date(appointment.start).toLocaleTimeString('fr-FR')}</li>
          <li><strong>Service :</strong> ${appointment.service}</li>
          <li><strong>Adresse :</strong> ${appointment.address}, ${appointment.postalCode} ${appointment.city}</li>
          <li><strong>Infirmier :</strong> ${nurse.firstName} ${nurse.lastName}</li>
        </ul>
        <p>L'infirmier vous contactera avant le rendez-vous pour confirmer l'heure exacte.</p>
        <p>Cordialement,<br>L'équipe Infirmy</p>
      </div>
    `
  }),

  appointmentCancelled: (appointment, nurse, patient, reason) => ({
    subject: 'Rendez-vous annulé',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626;">Rendez-vous annulé</h1>
        <p>Bonjour ${patient.firstName},</p>
        <p>Votre rendez-vous du ${new Date(appointment.start).toLocaleDateString('fr-FR')} à ${new Date(appointment.start).toLocaleTimeString('fr-FR')} a été annulé.</p>
        <p><strong>Raison :</strong> ${reason}</p>
        <p>Vous pouvez prendre un nouveau rendez-vous avec un autre infirmier disponible.</p>
        <p>Cordialement,<br>L'équipe Infirmy</p>
      </div>
    `
  }),

  appointmentReminder: (appointment, nurse, patient) => ({
    subject: 'Rappel de rendez-vous',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #f59e0b;">Rappel de rendez-vous</h1>
        <p>Bonjour ${patient.firstName},</p>
        <p>Rappel : vous avez un rendez-vous demain avec ${nurse.firstName} ${nurse.lastName}.</p>
        <h3>Détails du rendez-vous :</h3>
        <ul>
          <li><strong>Date :</strong> ${new Date(appointment.start).toLocaleDateString('fr-FR')}</li>
          <li><strong>Heure :</strong> ${new Date(appointment.start).toLocaleTimeString('fr-FR')}</li>
          <li><strong>Service :</strong> ${appointment.service}</li>
          <li><strong>Adresse :</strong> ${appointment.address}, ${appointment.postalCode} ${appointment.city}</li>
        </ul>
        <p>Merci de confirmer votre disponibilité.</p>
        <p>Cordialement,<br>L'équipe Infirmy</p>
      </div>
    `
  }),

  passwordReset: (user, resetToken) => ({
    subject: 'Réinitialisation de mot de passe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">Réinitialisation de mot de passe</h1>
        <p>Bonjour ${user.firstName},</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
        <p><a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Réinitialiser mon mot de passe</a></p>
        <p>Ce lien expire dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
        <p>Cordialement,<br>L'équipe Infirmy</p>
      </div>
    `
  })
};

// Fonction principale d'envoi d'email
export const sendEmail = async (to, template, data = {}) => {
  try {
    const transporter = createTransporter();
    const emailContent = emailTemplates[template](data);
    
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@infirmy.com',
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès:', result.messageId);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

// Fonctions spécifiques
export const sendWelcomeEmail = (user) => {
  return sendEmail(user.email, 'welcome', user);
};

export const sendAppointmentRequestEmail = (appointment, nurse, patient) => {
  return sendEmail(nurse.email, 'appointmentRequest', { appointment, nurse, patient });
};

export const sendAppointmentConfirmedEmail = (appointment, nurse, patient) => {
  return sendEmail(patient.email, 'appointmentConfirmed', { appointment, nurse, patient });
};

export const sendAppointmentCancelledEmail = (appointment, nurse, patient, reason) => {
  return sendEmail(patient.email, 'appointmentCancelled', { appointment, nurse, patient, reason });
};

export const sendAppointmentReminderEmail = (appointment, nurse, patient) => {
  return sendEmail(patient.email, 'appointmentReminder', { appointment, nurse, patient });
};

export const sendPasswordResetEmail = (user, resetToken) => {
  return sendEmail(user.email, 'passwordReset', { user, resetToken });
};

// Fonction pour envoyer un email personnalisé
export const sendCustomEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@infirmy.com',
      to: to,
      subject: subject,
      html: html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email personnalisé envoyé avec succès:', result.messageId);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email personnalisé:', error);
    throw error;
  }
};
