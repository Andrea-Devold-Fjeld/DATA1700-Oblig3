$(document).ready(function () {
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

        $.post("/lagre", billett, function (){
            hentAlle();
        });
    });

    $("#slettAlle").click(function (){
        $.get("/slettAlle", function (){
            $("#alleBilletter").html("");
        })
    })
    function hentAlle(){
        $.get("/hentAlle", function (billetter) {
            console.log("Hentet data")
            formaterBilletter(billetter);
        });
    }
    function formaterBilletter(billetter){
        let counter = 0;
        let ut = "<table class='table table-striped' id='billetterTable'><tr>" +
            "<th scope='col'>Film</th>" +
            "<th scope='col'>Antall</th>" +
            "<th scope='col'>Fornavn</th>" +
            "<th scope='col'>Etternavn</th>" +
            "<th scope='col'>Telefonnr</th>" +
            "<th scope='col'>Epost</th>" +
            "<th scope='col'></th></tr>";
        for (const billett of billetter){
            counter++;
            ut += "<tr>" +
                "<td>"+billett.film+"</td>" +
                "<td>"+billett.antall+"</td>" +
                "<td>"+billett.fornavn+"</td>" +
                "<td>"+billett.etternavn+"</td>" +
                "<td>"+billett.telefonnr+"</td>" +
                "<td>"+billett.email+"</td>" +
                "<td><button class='endreBillett' class='btn btn-primary btn-xs'>Endre</button>" +
                "<button class='slettBillett' class='btn btn-danger btn-xs'>Slett</button></td></tr><";
        }
        ut += "</table>"
        $("#alleBilletter").html(ut);

    }

    $("#billetterTable").on('click', '.endreBillett', function(){
        let row = $(this).closest("tr");
        let data = row.find("td");
        console.log(data.toString());
        const Array = ['film', 'antall', 'fornavn','etternavn','telefonnr','email' ]

    })

    function slettEn(){
    }
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