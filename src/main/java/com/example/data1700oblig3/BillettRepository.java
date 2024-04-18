package com.example.data1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;
    private final Logger logger = LoggerFactory.getLogger(BillettRepository.class);
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

    public boolean slettEn(Billett b){
        //logger.info("Id: " +id.toString());
        String sql =  "delete from Billett where id=?";
        try {
            db.update(sql, b.getId());
            return true;
        }
        catch (Exception e){
            //
            return false;
        }
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
    public boolean updateBillett(Billett b){
        String sql = "update Billett set film=?, antall=?, fornavn=? where id=?;";
        String sql2 = "update Billett set etternavn=?, telefonnr=?, email=? where id=?;";

        try{
            db.update(sql, b.getFilm(), b.getAntall(), b.getFornavn(), b.getId());
            db.update(sql2, b.getEtternavn(), b.getTelefonnr(), b.getEmail(), b.getId());
            return true;
        }
        catch (Exception e){
            //logger
            return false;
        }
    }
}
