const calendar = require('./googleConfig');

const createGoogleMeetLink = async (interviewDate) => {
  const event = {
    summary: 'Entretien',
    start: {
      dateTime: interviewDate,
      timeZone: 'Europe/Paris',
    },
    end: {
      dateTime: new Date(interviewDate.getTime() + 30 * 60000), // Durée de 30 minutes
      timeZone: 'Europe/Paris',
    },
    conferenceData: {
      createRequest: {
        requestId: 'sample123',
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.hangoutLink;
};

module.exports = createGoogleMeetLink;