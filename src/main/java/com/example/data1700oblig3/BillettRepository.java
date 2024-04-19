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
            logger.error(String.valueOf(e));
            return false;
        }
    }

    public boolean slettEn(Billett b){
        String sql =  "delete from Billett where id=?";
        try {
            db.update(sql, b.getId());
            return true;
        }
        catch (Exception e){
            logger.error(String.valueOf(e));
            return false;
        }
    }
    public List<Billett> hentBilletter() {
        String sql = "select * from Billett order by etternavn";
        try {
            return db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        }
        catch (Exception e){
            logger.error(String.valueOf(e));
            return null;
        }
    }


    public boolean slettAlle(){
        String sql = "delete from Billett";
        try{
            db.update(sql);
            return true;
        }
        catch (Exception e){
            logger.error(String.valueOf(e));
            return false;
        }
    }
    public boolean updateBillett(Billett b){
        try {

            if (b.getFilm() != null) {
                try {
                    String sql = "update Billett set film=? where id=?;";
                    db.update(sql, b.getFilm(), b.getId());
                } catch (Exception e) {
                    logger.error(String.valueOf(e));
                    return false;
                }
            }
            if (b.getAntall() != null) {
                try {
                    String sql = "update Billett set antall=? where id=?;";
                    db.update(sql, b.getAntall(), b.getId());
                } catch (Exception e) {
                    logger.error(String.valueOf(e));
                    return false;
                }
            }
            if (b.getFornavn() != null) {
                try {
                    String sql = "update Billett set fornavn=? where id=?;";
                    db.update(sql, b.getFornavn(), b.getId());
                } catch (Exception e) {
                    logger.error(String.valueOf(e));
                    return false;
                }
            }
            if (b.getEtternavn() != null) {
                try {
                    String sql = "update Billett set etternavn=? where id=?;";
                    db.update(sql, b.getEtternavn(), b.getId());
                } catch (Exception e) {
                    logger.error(String.valueOf(e));
                    return false;
                }
            }
            if (b.getTelefonnr() != null) {
                try {
                    String sql = "update Billett set telefonnr=? where id=?;";
                    db.update(sql, b.getTelefonnr(), b.getId());
                } catch (Exception e) {
                    logger.error(String.valueOf(e));
                    return false;
                }
            }
            if (b.getEmail() != null) {
                try {
                    String sql = "update Billett set email=? where id=?;";
                    db.update(sql, b.getEmail(), b.getId());
                } catch (Exception e) {
                    logger.error(String.valueOf(e));
                    return false;
                }
            }
        }catch (Exception e){
            logger.error(String.valueOf(e));
        }
        return true;
        /*
        String sql = "update Billett set film=?, antall=?, fornavn=? where id=?;";
        String sql2 = "update Billett set etternavn=?, telefonnr=?, email=? where id=?;";

        try{
            db.update(sql, b.getFilm(), b.getAntall(), b.getFornavn(), b.getId());
            db.update(sql2, b.getEtternavn(), b.getTelefonnr(), b.getEmail(), b.getId());
            return true;
        }
        catch (Exception e){
            logger.error(String.valueOf(e));
            return false;
        }

         */
    }
}
