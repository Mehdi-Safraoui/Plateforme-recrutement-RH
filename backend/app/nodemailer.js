const nodemailer = require("nodemailer");
const createGoogleMeetLink = require('./calendarHelper');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "bejaouii.koussay@gmail.com",
    pass: "iahs opbv zpom ogiz",
  },
});
// user: "mahdisafraoui01@gmail.com",
// pass: "mfvp ajhe wicv mwbd",
  // Calcul de la date de l'entretien dans 2 jours à 10h
  const sendEmail = async (to, subject, html ,interviewDate ) => {
   
    // Générer le lien Google Meet
    const meetLink = await createGoogleMeetLink(interviewDate);
  
    // Construction du contenu HTML de l'e-mail
    const htmlContent = `
      <h1>${subject}</h1>
      <p>${html}</p>
      <p>Votre entretien est prévu pour le ${interviewDate.toLocaleDateString()} à ${interviewDate.toLocaleTimeString()}.</p>
      <p>Vous pouvez rejoindre la réunion Google Meet en suivant ce lien : <a href="${meetLink}">Rejoindre la réunion</a>.</p>
    `;
  return transport.sendMail({
    from: "mahdisafraoui01@gmail.com",
    to: to,
    subject: subject,
    html: htmlContent,
  });
};

module.exports = sendEmail;