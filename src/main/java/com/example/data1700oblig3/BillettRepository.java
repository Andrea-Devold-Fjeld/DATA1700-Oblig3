package com.example.data1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
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

    public List<Billett> hentBilletter() {
        String sql = "select * from billetter.Billett order by etternavn";
        return db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
    }

    public boolean slettAlle(){
        String sql = "delete from billetter.Billett";
        try{
            db.update(sql);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
