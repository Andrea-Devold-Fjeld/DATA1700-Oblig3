package com.example.data1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;

@Repository
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;

    public boolean lagreBillett(Billett billett){
        String sql = "insert into Billett (film,antall,fornavn,etternavn,telefonnr,email) values(?,?,?,?,?,?)";
        try {
            db.update(sql, billett.getFilm(),billett.getAntall(), billett.getFornavn(),billett.getEtternavn(),billett.getTelefonnr(),billett.getEmail());
            return true;
        } catch (Exception e) {
            //have to make the logger work
            return false;
        }
    }

    public void endreBillett(Billett b) throws IOException {
        String sql = "update Billet set film=?, antall=?, fornavn=?, etternavn=?, telefonnr=?, email=? where is=?";
        db.update(sql, b.getFilm(), b.getAntall(), b.getFornavn(), b.getEtternavn(), b.getTelefonnr(), b.getEmail());
        try{
            db.update(sql, b.getid());
        }catch (Exception e){
            //logger
        }
    }
    public void slettEn(int id){
        String sql =  "delete from Billett where id=?";
        db.update(sql);
    }
    public List<Billett> hentBilletter() {
        String sql = "select * from Billett order by etternavn";
        return db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
    }


public boolean slettAlle(){
        String sql = "delete from Billett";
        try{
            db.update(sql);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
