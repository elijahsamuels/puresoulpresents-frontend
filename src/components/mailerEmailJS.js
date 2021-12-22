import React from "react";
import emailjs from "emailjs-com";

// This service works via https://dashboard.emailjs.com
// Future: this will need to be a paid service or move away to a self contained system

const Mailer = () => {
  const sendEmail = (event) => {
    event.preventDefault();
    // console.log()
    emailjs
      .sendForm(
        "service_clkp08f",
        "template_fs3l63r",
        event.target,
        "user_ESBZ6f0nCHblj4DBipIIq"
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    document.getElementById("name").value = "";
    document.getElementById("user_email").value = "";
    document.getElementById("user_phone").value = "";
    document.getElementById("event_type").value = "";
    document.getElementById("event_date").value = "";
    document.getElementById("message").value = "";
  };

  return (
    <div className="Mailer">
      <h1>Contact</h1>
      <form>
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" name="name" autoComplete="off" />
        <br />

        <label htmlFor="user_email">Email</label>
        <br />
        <input type="text" name="user_email" autoComplete="off" />
        <br />

        <label htmlFor="user_phone">Phone</label>
        <br />
        <input type="text" name="user_phone" autoComplete="off" />
        <br />

        <label htmlFor="event_type">Event Type:</label>
        <br />
        <select name="event_type" id="event_type" form="event_type_form" autoComplete="off">
          <option value="candlelight">Candlelight Concert</option>
          <option value="corporate">Corporate</option>
          <option value="wedding">Wedding</option>
          <option value="other">Other</option>
        </select>
        <br />

        <label>Event Date</label>
        <br />
        <input type="date" name="event_date" autoComplete="off" />
        <br />

        <label>Message</label>
        <br />
        <textarea name="message" rows="4" autoComplete="off" />
        <br />

        <input type="submit" value="Send Email" onClick={sendEmail} />
      </form>
    </div>
  );
};

export default Mailer;
