import React from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const GoogleCalendar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  
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
      // Handle the error appropriately, e.g., show an error message to the user.
    }
  }
  
  console.log(eventName)
  console.log(eventDescription)

  return (
    <div>
      <h2>Google Calendar</h2>
      {session ? (
        <>
          <h2>Hey there, {session.user.email}!</h2>
          <div>
            <p>START of your event</p>
            <DatePicker selected={start} onChange={(date) => setStart(date)} />
          </div>
          <div>
            <p>END of your event</p>
            <DatePicker selected={end} onChange={(date) => setEnd(date)} />
            <p>Event Name</p>
            <input type="text" value={eventName} onChange={(e) => setEventname(e.target.value)} />
            <p>Event Description</p>
            <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
            <hr />
            <button onClick={createCalendarEvent}>Create Calendar Event!</button>
            <p></p>
          </div>

          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <button onClick={googleSignIn}>Sign In with Google to see calendar</button>
      )}

    </div>
  );
};

export default GoogleCalendar;
