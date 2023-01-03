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
  * pKEY - unique program key
    * rKEY - unique key of any registration
      * date - date of registration
      * clientId - client id from firebase auth
* eventRegisterDetails
  * rKEY - unique key of any registration
    * name - name
    * nickname - ksywa
    * email - email address
    * contact - kontakt
    * 



