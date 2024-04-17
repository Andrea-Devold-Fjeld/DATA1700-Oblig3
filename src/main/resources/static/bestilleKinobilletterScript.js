$(document).ready(function () {
    $("#alleBilletter").hide();
    $('form button').on("click",function(e){
        e.preventDefault();
    });
    $("#kjopBillett").click(function () {
        const billett = {
            film : $("#velgFilm").val(),
            antall : $("#antall").val(),
            fornavn : $("#fornavn").val(),
            etternavn : $("#etternavn").val(),
            telefonnr : $("#telefonnr").val(),
            email : $("#epost").val()
        };
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
        if(error){
            return;
        }
        /*
        Endpoint to save the ticket to the db
         */
        $.post("/lagre", billett, function (){
            $("#alleBilletter").show();
            //call hentAlle() to retreive all the tickets and display them
            hentAlle();
        });
        //Reset the input fields
        /*
        $("#velgFilm").prop('selectedIndex', 0);
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");

         */
    });
    /*
    Endpoint to delete all tickets in the db.
     */
    $("#slettAlle").click(function (){
        $.get("/slettAlle", function (){
            //Remove the table
            $("#billetterTable").html("");
        })
    })
    /*
    Endpoint to retreive all the tickets from the db
     */
    function hentAlle(){
        $.get("/hentAlle", function (billetter) {
            //Function to format the tickets and write them to the table
            formaterBilletter(billetter);
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
        let ut = "<table class='table table-striped' id='billetterTable'><tr>" +
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
        //Make a json object since i dont display or get the auto incremented value from the db.
        //a fault with this is that if there are multiple ticket with exactly the same values
        //they will all get deleted have to see if i find a fix to this.
        const billett = {
            'film' : $row.find("td:eq(0)").text(),
            'antall' : $row.find("td:eq(1)").text(),
            'fornavn' : $row.find('td:eq(2)').text(),
            'etternavn' : $row.find('td:eq(3)').text(),
            'telefonnr' : $row.find('td:eq(4)').text(),
            'email' : $row.find('td:eq(5)').text()
        };
        //Calling the endpoint /slettEn to delete this ticket
        $.get("/slettEn", billett, function (){
            hentAlle();
        })
    })
    /*
    Function to update a current ticket
     */
    $("#billetterTable").on('click', '.updateBillett', function () {
        let $row = $(this).closest("tr");
        let change = false;
        let error =false;
        const updateBillett = {};
        //First check if something is put in the input-field
        if($('#velgFilm') === ''){
            updateBillett['film'] = $row.find("td:eq(0)").text();
        }
        else{
            updateBillett['film'] = $('#velgFilm').val();
            change = true;
        }
        let antall = $('#antall').val();
        if(antall === ''){
            updateBillett['antall'] = $row.find("td:eq(1)").text();
        }
        else {
            if(validateAntall()){
                error = true;
            }
            else {
                updateBillett['antall'] = antall;
                change = true;
            }
        }
        let fornavn = $('#fornavn').val();
        if(fornavn === ''){
            updateBillett['fornavn'] = $row.find("td:eq(2)").text();
        }
        else {
            if(validateFornavn(fornavn)){
                error = true;
            }
            else {
                updateBillett['fornavn'] = fornavn;
                change = true;
            }
        }
        let etternavn = $('#etternavn').val();
        if(etternavn === ''){
            updateBillett['etternavn'] = $row.find("td:eq(3)").text();
        }
        else {
            if(validateEtternavn(etternavn)){
                error = true;
            }
            else {
                updateBillett['etternavn']=etternavn;
                change = true;
            }
        }
        let telefonnr = $('#telefonnr').val();
        if(telefonnr === ''){
            updateBillett['telefonnr']=$row.find("td:eq(4)").text();
        }
        else{
            if(validateTelefonnr(telefonnr)){
                error = true;
            }
            else {
                updateBillett['telefonnr']=telefonnr;
                change = true;
            }
        }
        let email = $('#epost').val();
        if(email === ''){
            updateBillett['email']=$row.find("td:eq(5)").text();
        }
        else {
            if(validateEpost(email)){
                error = true;
            }
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
        //get the old ticket
        const oldBillett = {
            'film' : $row.find("td:eq(0)").text(),
            'antall' : $row.find("td:eq(1)").text(),
            'fornavn' : $row.find("td:eq(2)").text(),
            'etternavn' : $row.find("td:eq(3)").text(),
            'telefonnr' : $row.find("td:eq(4)").text(),
            'email' : $row.find("td:eq(5)").text()
        }
        console.log(JSON.stringify(updateBillett));
        $.post("/update", oldBillett, updateBillett, function () {
            hentAlle();
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
})