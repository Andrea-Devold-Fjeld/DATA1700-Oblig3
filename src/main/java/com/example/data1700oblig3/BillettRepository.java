package com.example.data1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository class to communicate with the DB.
 */
@Repository
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;
    private final Logger logger = LoggerFactory.getLogger(BillettRepository.class);

    /**
     * Function to save the ticket to the DB.
     * @param billett Argument is a billett object with all values, except for id,
     *                the input validation happens on the client side.
     * @return returns true if succesful false if not.
     */
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

    /**
     * Function to delete one ticket
     * @param b Takes a billett object but the only value required is the id.
     * @return Returns true if succesfull and false if not
     */
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

    /**
     * Function to get all the tickets from the DB and return them as a
     * list of Billett objects
     * @return A list of Billett Objects, returns null if something went wrong
     * with the DB.
     */
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

    /**
     * Function to remove all tickets from the DB
     * @return returns true if succesful and false if not
     */
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

    /**
     * Function to update the Billett in the database.
     * @param b Is a Billett object with the billett id and atleast one other value
     * @return Return true if the update of the database was succesful and false if
     * something went wrong with the DB.
     */
    public boolean updateBillett(Billett b){
        try {
            //if tests to check if the value is present and update the value if it is
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
    }
}
