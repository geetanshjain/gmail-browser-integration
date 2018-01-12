# gmail-browser-integration
Node WebApp which can search, store and display results from a user's Gmail account.

The flow of the application that is created is:
User visits the URL and logs in with her Google Account.
The home page renders. It will only have a search box where you can search for one single term. (ex. food, shooting, social)
The application copies down the last 10 mails from the inbox in the form of from, subject and date as columns.
Search button is given which filters mails on basis of keyword.
When 1 of the 10 displayed search result is clicked - it opens a details page which lists all the messages in that email thread.
There is a "cross" button in your details page to take you back to the "search results" page that you came from.
Database connecivity code is written but not integrated.
Twilio sms integration is attempted but not completed as there is requirement of Twilio account and number to test the flow and hence would be invoked whenever the email link is clicked after the details are entered in the code and snippet called from email link clicking function.
