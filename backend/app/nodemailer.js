// mailer.js
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "bejaouii.koussay@gmail.com", // Votre adresse email
    pass: "bwll mrxz odmw xdjj",
  },
});

const sendEmail = (to, subject, html) => {
  // Calcul de la date de l'entretien dans 2 jours à 10h
  const interviewDate = new Date();
  interviewDate.setDate(interviewDate.getDate() + 2);
  interviewDate.setHours(10, 0, 0, 0); // Réglage de l'heure à 10h00

  // Construction du contenu HTML de l'e-mail
  const htmlContent = `
    <h1>${subject}</h1>
    <p>${html}</p>
    <p>Votre entretien est prévu pour le ${interviewDate.toLocaleDateString()} à ${interviewDate.toLocaleTimeString()}.</p>
    <p>Vous pouvez rejoindre la réunion Google Meet en suivant ce lien : <a href="Lien_de_votre_meeting">Rejoindre la réunion</a>.</p>
  `;

  return transport.sendMail({
    from: "bejaouii.koussay@gmail.com", // Votre adresse email
    to: to, // Adresse email du destinataire
    subject: subject,
    html: htmlContent,
  });
};

module.exports = sendEmail;

