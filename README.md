# recipe_project

Un site basic de publicare a retetelor in mediul online, de la mancaciosi pentru mancaciosi.

Rulare:

Inainte de toate, avem nevoie de node.js (npm) care poate fi instalat urmarind pasii de aici https://nodejs.org/en/download/package-manager
De asemenea, avem nevoie de express.js, care va fi instalat ulterior.
Daca intampinati probleme cu librariile, toate librariile folosite se afla in fisierele package.json in sectiunea dependencies (cel din frontend cat si cel din backend).

I. BACKEND

Backend-ul este putin mai complicat de rulat, in sensul ca necesita mai multi pasi.
1. Prima data avem nevoie de un database local, pentru asta am folosit aplicatia XAMPP, care poate fi instalata de aici https://www.apachefriends.org/index.html
2. Dupa ce XAMPP a fost instalat, trebuie ca serverele sa fie pornite. Ele se pot porni de la sectiunea Manage Servers, si apasand pe butonul Start All.
3. Apoi trebuie sa accesati http://localhost/dashboard/ unde veti fi prezentat cu un Welcome screen care ne spune ca am instalat si rulat cu succes XAMPP pe calculatorul nostru. Dupa aceea, accesati tab-ul phpMyAdmin.
4. Pe pagina phpMyAdmin putem vedea bazele de date detinute de noi. Nu o sa ne atingem de nimic existent, ci vom crea 2 date de baze noi cu numele recipes si users. Butonul pentru a crea o baza de date noua se afla in stanga sus, sub logo-ul phpMyAdmin.
5. Dupa ce ati creat cele doua baze de date noi, dati click pe recipes, apoi pe tab-ul SQL din partea sus a paginei, si inserati urmatoarea comanda asa cum e:

CREATE TABLE `recipes` (
  `name` text DEFAULT NULL,
  `author` text DEFAULT NULL,
  `author_email` text NOT NULL,
  `description` text DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `nr_rating` int(11) DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

6. Tabelul ar trebui sa fie creat cu succes. Acum navigam in database-ul users, si rulam tot in tab-ul SQL urmatoarea comanda asa cum e:

CREATE TABLE `users` (
  `name` text NOT NULL,
  `phone` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `recipes` int(11) NOT NULL DEFAULT 0,
  `reset_token` varchar(255) DEFAULT NULL,
  `token_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `users`
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD UNIQUE KEY `phone` (`phone`) USING HASH;

7. Daca comenzile au fost introduse corect, acum ar trebui sa avem in database-ul recipes, tabelul recipes iar in database-ul users, tabelul users.
8. Acum, intr-un terminal, navigam in folderul backend si rulam npm install iar apoi npm start. Daca totul a mers cu succes, ar trebui sa primim un Listenting on port 8081... 

II. FRONTEND

Pentru a rula frontend-ul este simplu, dupa ce ati descarcat proiectul, tot ce trebuie este sa mergeti in terminal, apoi navigati in directorul frontend si sa rulati comanda npm install si npm start.

Daca toate au mers bine, atunci ar trebui sa fiti rediretionat automat la o pagina de browser care contine proiectul. Bon appetit ;)
