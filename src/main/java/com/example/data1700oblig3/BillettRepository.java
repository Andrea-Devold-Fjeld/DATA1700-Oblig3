package com.example.data1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;

    public boolean lagreBillett(Billett billett){
        String sql = "insert into billetter.Billett (film,antall,fornavn,etternavn,telefonnr,email) values(?,?,?,?,?,?)";
        try {
            db.update(sql, billett.getFilm(),billett.getAntall(), billett.getFornavn(),billett.getEtternavn(),billett.getTelefonnr(),billett.getEmail());
            return true;
        } catch (Exception e) {
            //have to make the logger work
            return false;
        }
    }
}
