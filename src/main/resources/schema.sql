CREATE TABLE Billett
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    film VARCHAR(255) NOT NULL,
    antall INTEGER not null,
    fornavn varchar(255) not null,
    etternavn varchar(255) not null,
    telefonnr varchar(255) not null,
    email varchar(255) not null,
    primary key (id)
);