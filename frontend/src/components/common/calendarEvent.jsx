
const createCalendarEvent = async (session, eventName, eventDescription, start, end) => {
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
  
    try {
      if (event.start.dateTime > event.end.dateTime) {
        throw new Error("Start date is after end date");
      }
      if (event.summary === "") {
        throw new Error("Event name is empty");
      }
  
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + session.provider_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Failed to create event: ${JSON.stringify(data)}`);
      }
  
      console.log(data);
      alert("Event created!");
    } catch (error) {
      console.error('Error creating calendar event:', error);
  
      alert(error.message); // Handle error
    }
  };
  
  export default createCalendarEvent;
  