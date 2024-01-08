import React from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import "react-datepicker/dist/react-datepicker.css";
import "../css/GoogleCalendar.css";

const GoogleCalendar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in");
      console.error(error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="container-2">
      <h2>Google Calendar</h2>
      {session ? (
        <>
          <h2>You are logged in as ~{session.user.email.split("@")[0]}!</h2>

          <button className="btn btn-primary" type="submit" onClick={signOut}>
            {" "}
            Sign out
          </button>
        </>
      ) : (
        <button
          className="btn btn-primary"
          type="submit"
          onClick={googleSignIn}
        >
          Sign In with Google to see calendar
        </button>
      )}
    </div>
  );
};

export default GoogleCalendar;
