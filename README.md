# OBLIG 3 - DATA1700
Solveig Andrea Devold Fjeld - sofje9342@oslomet.no
github-repo: https://github.com/Capt-Obv/DATA1700-Oblig3
Screen recording of the task: link
## My solution
For this task i choose to use the h2-database, and i styled the page with bootstrap.
I feel that the most important part of this assignement is the enpoints and that this works as it should, so i wont explain in detail the html and JS that is the same as in Oblig 2.
One thing i would like to explain is that i added a variable id to the POJO class Billett, so that i can write the id-value to a hidden column in the table to make the updating and deleting of one ticket easier.
## Endpoints

- /lagre @PostMapping | Saves a ticket to the db when the 'Kjøp Billett' button is pressed. Every input field have to have a value and every value have to pass the input validation to be passed to the controller and repository and be saved in the DB. If there is an error in saving the ticket so that the HTTP response is not 200 an error message will be passes to the user. When the ticket is saved the JS use the endpoint \hentAlle (explained next)
- /hentAlle @GetMapping | This retreives all the saved tickets in the DB and returns them as a list of Billett objects, which are passed to the JS and formated as a table beneath the form. This will also generate an error message if it is not succesful.
- /slettAlle @GetMapping | This endpoint delete all the tickets in the DB when the button 'Slett alle billetter' is pressed, and removes the table shown to the user. Will also generate an error message if something went wrong.
- /slettEn @GetMapping | This endpoint will delete the ticket that are on the same row of the 'slett' button that is pressed. I send the id as an Billett object to the repository and use the query = "delete from Billett where id=?;" and i get the id by b.getId(), which returns an Integer. This endpoint will also genereate an error message to the user if the response is different from 200.
- /updateBillett @PutMapping | I used PutMapping since i read from the documentation that when updating values PutMapping should be used. This endpoint is the most complex. If the update button in a ticket row is pressed without any values in the form fields, then it will give the user an alert and tell them that atleast one of the input fields have to have a value to update a ticket. If something are in one or more input field the script will go trough them check them with input validation and save them to a JSON object.If a value doesnt pass input-validation the user will get a error message and the script will return. If all values pass it will pass the JSON object to the controller and the repository. In the repository it is a buch of if-test to see what values exists, if they exists update the ticket with id=? whit this new value. I paste in under an example of this test. I choose to do it like this as to not update values that didnt need to be updatet. This endpoint will also generate an error message if it fails.

        if(b.getFilm() != null){
            try{
                String sql = "update Billett set film=? where id=?;";
                db.update(sql, b.getFilm(),b.getId());
            }
            catch (Exception e){
                logger.error(String.valueOf(e));
                return false;
            }
        }





