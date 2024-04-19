package com.example.data1700oblig3;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

/**
 * controller class
 */
@RestController
public class BillettController {
    @Autowired
    private BillettRepository rep;
    @PostMapping("/lagre")
    public void lagreBillett(Billett billett, HttpServletResponse response) throws IOException {
        if(!rep.lagreBillett(billett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i db prøv senere!");
        }
    }
    @GetMapping("/hentAlle")
    public List<Billett> hentAlleBilletter(HttpServletResponse response) throws IOException{
        if(rep.hentBilletter() == null){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i db - prøv igjen senere");
        }
        return rep.hentBilletter();
    }
    @GetMapping("/slettAlle")
    public void slettAlle(HttpServletResponse response) throws IOException{
        if(!rep.slettAlle()){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i db -prøv igjen senere");
        }
    }
    @GetMapping("/slettEn")
    public void slettEn(Billett billett, HttpServletResponse response) throws IOException{
        if(!rep.slettEn(billett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "feil i db - prøv igjen senere");
        }
    }
    @PostMapping ("/updateBillett")
    public void updateBillett(Billett billett, HttpServletResponse response) throws IOException{
        if(!rep.updateBillett(billett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "feil i db - prøv igjen senere");
        }
    }
}
