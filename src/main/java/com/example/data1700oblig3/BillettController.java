package com.example.data1700oblig3;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

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
    public List<Billett> hentAlleBilletter(){
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
    @PostMapping("/update")
    public void update(Billett oldBillett, Billett newBillett, HttpServletResponse response) throws IOException{
        if(!rep.update(oldBillett, newBillett)){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "feil i db - prøv igjen senere");
        }
    }
}
