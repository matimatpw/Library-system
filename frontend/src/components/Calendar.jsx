import React from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const GoogleCalendar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  // const [start, setStart] = useState(new Date());
  // const [end, setEnd] = useState(new Date());

  const [eventName, setEventname] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    });
    if (error) {
      alert('Error logging in');
      console.error(error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  async function createCalendarEvent() {
    console.log("createCalendarEvent");

    try {
      if (!session || !session.provider_token) {
        throw new Error('Session or provider_token is undefined');
      }
    } catch (error) {
      console.log("XDDDD NIE DZIALA")
      alert(error.message);
    }

    const now = new Date();
    const start = now.toISOString();

    // Set the end time, e.g., 1 hour later
    const end = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString();

    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start,
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      'end': {
        'dateTime': end,
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };



    try {
      if(event.start.dateTime > event.end.dateTime) {
        throw new Error("Start date is after end date");
      }
      if(event.summary === "") {
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

      alert(error.message); //TODO handle error
    }
  }

  console.log(eventName)
  console.log(eventDescription)

  return (
    <div>
      <h2>Google Calendar</h2>
      {session ? (
        <>
          <h2>Hey there, {session.user.email.split('@')[0]}!</h2>
          <div>
            <p>START of your event</p>
            {/* <DatePicker selected={start} onChange={(date) => setStart(date)} /> */}
            <p>END of your event</p>
            {/* <DatePicker selected={end} onChange={(date) => setEnd(date)} /> */}
          </div>
          <hr />
          <div>
            <p>Event Name</p>
            <input type="text" value={eventName} onChange={(e) => setEventname(e.target.value)} />
            <p>Event Description</p>
            <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
            <hr />
            <button onClick={createCalendarEvent}>Create Calendar Event!</button>
            <p></p>
          </div>

          <button className='signin' onClick={signOut}> Sign out</button>
        </>
      ) : (
        <button className='signin' onClick={googleSignIn}>Sign In with Google to see calendar</button>
      )}

    </div>
  );
};

export default GoogleCalendar;
