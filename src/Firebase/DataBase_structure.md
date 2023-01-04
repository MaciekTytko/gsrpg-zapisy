# Structure
* events - list of Events
  * eKEY - unique key
    * title - name of event
    * date - date of event
    * picsURL - image URL
    * description - long description visible in events details
    * allowRegister - allow register in event
* eventsProgram
  * eKEY - key of event from events list
    * pKEY - unique program key
      * details - Details of program
      * approved - is program approved to show
* eventsRegister
  * eKEY - key of event from events list
    * pKEY - unique program key
      * clientId - client id from firebase auth
        * timestamp - server timestamp of registration


