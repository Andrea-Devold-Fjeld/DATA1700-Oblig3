package com.example.data1700oblig3;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
@RestController
public class BillettController {
    @Autowired
    private BillettRepository rep;
    public void lagreBillett(Billett billett, HttpServletResponse response) throws IOException {
        if(!rep.lagreBillett(billett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i db prøv senere!");
        }
    }
}
