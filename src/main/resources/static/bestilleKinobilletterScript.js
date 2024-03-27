$(document).ready(function () {
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
            console.log("Den skulle blitt lagret")
        })
    })

//function to validate a film has been selected
    function validateFilm(target) {
        if(target === ''){
            $("#filmError").html('Må velge en film!').css('color', 'red');
            return true;
        }
    }
//function to validate that antall is a positive number
    function validateAntall(target){
        let antall = parseInt(target);
        if(Number.isNaN(antall) || antall<= 0){
            $("#antallError").html("Antall må være ett positivt nummer!").css('color','red');
            return true;
        }
    }
//function to validate fornavn
    function validateFornavn(target){
        if(target.length === 0) {
            $("#fornavnError").html("Må skrive noe inn i fornavn").css('color', 'red');
            return true;
        }
    }
//function to validate etternavn
    function validateEtternavn(target){
        if(target.length === 0){
            $("#etternavnError").html("Må skrive noe inn i etternavn").css('color', 'red');
            return true;
        }
    }
//function to validate telefonnr
    function validateTelefonnr(target){
        //uses regexp to validate: 8 numbers beetween 0 and 9
        let regex = new RegExp(/^[0-9]{8}$/);
        let antall = target;
        if(!antall.match(regex)){
            $("#telfonnrError").html("Må skrive ett gyldig telefonnr, 8 tall").css('color', 'red');
            return true;
        }
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
        let epost = target;
        if (!epost.match(regex)) {
            $("#epostError").html("Må skrive en gyldig epost-addresse: a@a.com").css('color', 'red');
            return true;
        }
    }
})