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
          </div>
          {/* Add similar code for the end date if needed */}

          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <button onClick={googleSignIn}>Sign In with Google to see calendar</button>
      )}

    </div>
  );
};

export default GoogleCalendar;
