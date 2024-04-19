$(document).ready(function () {
    $("#alleBilletter").hide();
    $('form button').on("click",function(e){
        //I do this to prevent the default submit button, to make my own logic
        e.preventDefault();
    });
    /*
    Funtion when the button Kjøp Billett is pressed
     */
    $("#kjopBillett").click(function () {
        //reset error messages
        resetErrorMessage();
        //Create the json object billett
        const billett = {
            film : $("#velgFilm").val(),
            antall : $("#antall").val(),
            fornavn : $("#fornavn").val(),
            etternavn : $("#etternavn").val(),
            telefonnr : $("#telefonnr").val(),
            email : $("#epost").val()
        };
        //check if the input is correct if validateInput returns true end the function
        if(validateInput(billett)){
            return;
        }
        /*
        Endpoint to save the ticket to the db
         */
        $.post("/lagre", billett, function (){
            $("#alleBilletter").show();
            //call hentAlle() to retreive all the tickets and display them
            hentAlle();
        })
            //Error message if the controller returns error
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        })
        //Reset the input fields and error messages
        resetInputField();
        resetErrorMessage();
    });
    /*
    Function to validate the form inputs.
    billett is JSON object of the inputvalues
    return true if input-validation fails.
    return false if input-validation does not fail.
     */
    function validateInput(billett){
        let error = false;
        //input valiadation:

        if (validateFilm(billett['film'])){
            error = true;
        }
        if (validateAntall(billett['antall'])){
            error = true;
        }
        if(validateFornavn(billett['fornavn'])){
            error = true;
        }
        if(validateEtternavn(billett['etternavn'])){
            error = true;
        }
        if(validateTelefonnr(billett['telefonnr'])){
            error=true;
        }
        if(validateEpost(billett['email'])){
            error = true;
        }
        return error;
    }
    /*
    Endpoint to delete all tickets in the db.
     */
    $("#slettAlle").click(function (){
        $.get("/slettAlle", function (){
            //Remove the table
            $("#billetterTable").html("");
        })
            //Error message if the controller returns error
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
    })

    /*
    Endpoint to retreive all the tickets from the db
     */
    function hentAlle(){
        $.get("/hentAlle", function (billetter) {
            //Function to format the tickets and write them to the table
            formaterBilletter(billetter);
        })
            //Error message if the controller returns error
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
    }
    /*
    Function to write format the ticket in a nice table
     */
    function formaterBilletter(billetter){
        //if the lengt of billetter is 0 then dont create the table
        if(billetter.length === 0){
            $("#billetterTable").html("");
            return;
        }
        //Make the header
        let ut = "<table class='table table-striped' id='billetterTable'><tr>"+
            "<th hidden='hidden'>Id</th>" + //Make a column with the id from the DB but hide it.
            "<th scope='col'>Film</th>" +
            "<th scope='col'>Antall</th>" +
            "<th scope='col'>Fornavn</th>" +
            "<th scope='col'>Etternavn</th>" +
            "<th scope='col'>Telefonnr</th>" +
            "<th scope='col'>Epost</th>" +
            "<th scope='col'></th></tr>";
        //Go through each ticket and create the row
        for (const billett of billetter){
            ut += "<tr>" +
                "<td hidden='hidden'>"+billett.id+"</td>"+  //Hide the id but still save it so that update and delete one is easier
                "<td>"+billett.film+"</td>" +
                "<td>"+billett.antall+"</td>" +
                "<td>"+billett.fornavn+"</td>" +
                "<td>"+billett.etternavn+"</td>" +
                "<td>"+billett.telefonnr+"</td>" +
                "<td>"+billett.email+"</td>" +
                "<td><button class='slettBillett btn btn-danger btn-xs'>Slett</button>" +
                "<button class='updateBillett btn btn-warning btn-xs'>Update</button></td></tr>";
        }
        ut += "</table>"
        $("#billetterTable").html(ut);
    }
    /*
    Functon to delete one ticket when the delete button in the table is pressed
     */
    $("#billetterTable").on('click', '.slettBillett', function (){
        //Find the closest row to the button pressed
        let $row = $(this).closest("tr");
        id = {"id" : $row.find("td:eq(0)").text()}
        //Calling the endpoint /slettEn to delete this ticket
        $.get("/slettEn", id, function (){
            hentAlle();
        })
            //Error message if the controller returns error
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
    })
    /*
    Function to update a current ticket
     */
    //HAve to fix antall that shows error message!!
    //HAVE TO CLEAN UP THE CODE
    $("#billetterTable").on('click', '.updateBillett', function () {
        resetErrorMessage();
        let $row = $(this).closest("tr");
        let change = false;
        let error =false;
        const updateBillett = {};
        //First check if nothing is changed in the input field
        if($('#velgFilm').prop('selectedIndex')===0){
            //Then use the old value from the table
            updateBillett['film'] = $row.find("td:eq(1)").text();
        }
        //If something is in the input field
        else{
            //Use the new value and change the boolean change to true
            updateBillett['film'] = $('#velgFilm').val();
            change = true;
        }

        let antall = $('#antall').val();
        //Check if the input field is empty
        if(antall === ''){
            //if empy use the old value
            updateBillett['antall'] = $row.find("td:eq(2)").text();
        }
        //If something is in the input field
        else {
            //check if the input is valid
            if(validateAntall(antall)){
                //failed input validation
                error = true;
            }
            //Use the new value
            else {
                updateBillett['antall'] = antall;
                change = true;
            }
        }
        let fornavn = $('#fornavn').val();
        //check if input-field is empty
        if(fornavn === ''){
            //if it is use the old value
            updateBillett['fornavn'] = $row.find("td:eq(3)").text();
        }
        //Something is in the input-field
        else {
            //check with input validation
            if(validateFornavn(fornavn)){
                //input validation failed
                error = true;
            }
            //Input-validation succesfull use the new value
            else {
                updateBillett['fornavn'] = fornavn;
                change = true;
            }
        }
        let etternavn = $('#etternavn').val();
        //check if input-field is empty
        if(etternavn === ''){
            updateBillett['etternavn'] = $row.find("td:eq(4)").text();
        }
        //Something is in the input-field
        else {
            //check with input validation
            if(validateEtternavn(etternavn)){
                //input validation failed
                error = true;
            }
            //Input-validation succesfull use the new value
            else {
                updateBillett['etternavn']=etternavn;
                change = true;
            }
        }
        let telefonnr = $('#telefonnr').val();
        //check if input-field is empty
        if(telefonnr === ''){
            updateBillett['telefonnr']=$row.find("td:eq(5)").text();
        }
        //Something is in the input-field
        else{
            //check with input validation
            if(validateTelefonnr(telefonnr)){
                //input validation failed
                error = true;
            }
            //Input-validation succesfull use the new value
            else {
                updateBillett['telefonnr']=telefonnr;
                change = true;
            }
        }
        let email = $('#epost').val();
        //check if input-field is empty
        if(email === ''){
            updateBillett['email']=$row.find("td:eq(6)").text();
        }
        //Something is in the input-field
        else {
            //check with input validation
            if(validateEpost(email)){
                //input validation failed
                error = true;
            }
            //Input-validation succesfull use the new value
            else {
                updateBillett['email']=email;
                change = true;
            }
        }
        if(error){
            return;
        }
        if(!change){
            alert('To update a ticket you have to write something in atleast one input field!');
            return;
        }
        //add the id to the JSON object
        updateBillett["id"] = $row.find("td:eq(0)").text();
        /*
        Endpoint to update the ticket
         */
        $.post("/updateBillett", updateBillett, function () {
            //Update the table
            hentAlle();
            //reset the error messages and input fields
            resetInputField();
            resetErrorMessage();

        })//If the endpoint failed write the error message on screen
        .fail(function (jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        })
    })
//function to validate a film has been selected
    function validateFilm(target) {
        if(target === ''){
            $("#filmError").html('Må velge en film!').css('color', 'red');
            return true;
        }
        return false;
    }
//function to validate that antall is a positive number
    function validateAntall(target){
        let antall = parseInt(target);
        if(Number.isNaN(antall) || antall<= 0){
            $("#antallError").html("Antall må være ett positivt nummer!").css('color','red');
            return true;
        }
        return false;
    }
//function to validate fornavn
    function validateFornavn(target){
        if(target.length === 0) {
            $("#fornavnError").html("Må skrive noe inn i fornavn").css('color', 'red');
            return true;
        }
        return false;
    }
//function to validate etternavn
    function validateEtternavn(target){
        if(target.length === 0){
            $("#etternavnError").html("Må skrive noe inn i etternavn").css('color', 'red');
            return true;
        }
        return false;
    }
//function to validate telefonnr
    function validateTelefonnr(target){
        //uses regexp to validate: 8 numbers beetween 0 and 9
        let regex = new RegExp(/^[0-9]{8}$/);
        if(!target.match(regex)){
            $("#telfonnrError").html("Må skrive ett gyldig telefonnr, 8 tall").css('color', 'red');
            return true;
        }
        return false;
    }
//function to validate epost
    function validateEpost(target) {
        /*
        //using regexp here to validate
        //[\w-\.] means matches any word character, and also allow - and .
        //+@ it has to contain one @
        //([\w-]+\.) means matches any word character, and also -. And it has to contain one .
        //then +[\w-]{2,4} after the dot it has to match 2-4 word character wich is the country code.
         */
        let regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if (!target.match(regex)) {
            $("#epostError").html("Må skrive en gyldig epost-addresse: a@a.com").css('color', 'red');
            return true;
        }
        return false;
    }
    /*
    Function to reset the input fields
     */
    function resetInputField(){
        $("#velgFilm").prop('selectedIndex', 0);
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }
    /*
    Function to reset the error messages
     */
    function resetErrorMessage()    {
        $("#filmError").html("");
        $("#antallError").html("");
        $("#fornavnError").html("");
        $("#etternavnError").html("");
        $("#telfonnrError").html("");
        $("#epostError").html("");
        $("#feil").html("");
    }
})