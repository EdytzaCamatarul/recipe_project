# recipe_project

---

### Un site basic de publicare a rețetelor în mediul online, de la mâncăcioși pentru mâncăcioși.

---

### Rulare:

#### Înainte de toate:
- Avem nevoie de **Node.js (npm)**, care poate fi instalat urmând pașii de aici: [Node.js installation](https://nodejs.org/en/download/package-manager).  
- De asemenea, avem nevoie de **Express.js**, care va fi instalat ulterior.  
- Dacă întâmpinați probleme cu librăriile, toate librăriile folosite se află în fișierele `package.json` în secțiunea **dependencies** (atât pentru frontend, cât și pentru backend).

---

### I. BACKEND

**Backend-ul necesită mai mulți pași pentru a rula:**  

1. Instalăm o bază de date locală folosind aplicația **XAMPP**, care poate fi descărcată de [aici](https://www.apachefriends.org/index.html).  
2. După instalarea XAMPP, porniți serverele din secțiunea **Manage Servers**, apăsând pe butonul **Start All**.  
3. Accesați [http://localhost/dashboard/](http://localhost/dashboard/), unde veți vedea un **Welcome screen**, confirmând instalarea cu succes a XAMPP. Din această pagină, accesați tab-ul **phpMyAdmin**.  
4. În **phpMyAdmin**, creați două baze de date noi: **recipes** și **users** (butonul de creare este în colțul stânga-sus, sub logo-ul phpMyAdmin).  
5. În baza de date **recipes**, accesați tab-ul **SQL** și inserați următoarea comandă:  

```sql
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
```

6. În baza de date **users**, accesați tab-ul **SQL** și inserați următoarea comandă:  

```sql
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
```

7. Dacă ați introdus comenzile corect, baza de date **recipes** va avea tabelul `recipes`, iar baza de date **users** va avea tabelul `users`.  
8. Într-un terminal, navigați în folderul **backend** și rulați:  
   ```bash
   npm install  
   npm start
   ```  
   Dacă totul a funcționat corect, veți vedea mesajul: **Listening on port 8081...**

---

### II. FRONTEND

Pentru a rula frontend-ul, urmați pașii de mai jos:  
1. Într-un terminal, navigați în directorul **frontend** și rulați următoarele comenzi:  
   ```bash
   npm install  
   npm start  
   ```  
2. Dacă totul a funcționat corect, browser-ul va deschide automat pagina proiectului.  
Acum puteți să vă creați un cont, să adăugați o rețetă sau să explorați funcționalitățile site-ului. **Bon appétit! :D**  

---

### Funcționalități:

1. **Creare de cont**.  
2. **Logare cu token** (rămâneți logat chiar dacă închideți pagina sau opriți proiectul).  
3. **Resetare parolă prin email** (se primește un email cu un link unic pentru resetare — PS: link-ul funcționează doar pe calculatorul unde rulează proiectul).  
4. **Adăugare rețete**, inclusiv imagini, un sistem de rating, și posibilitatea de a șterge rețetele proprii.  
5. **Pagina de profil**, cu toate datele utilizatorului.  
6. **Trimitere feedback** printr-un formular (eu primesc email-urile, pls don't spam :) ).  
7. **Pagina de rețete**, unde se pot găsi toate rețetele publicate, inclusiv opțiuni de căutare (după numele rețetei sau autor) și filtrare/sortare (după rating).  
8. **Detalii rețetă** accesibile prin click pe rețetă.  
9. Design adaptat pentru ecrane mai mici (**telefoane/tablete**).  

---

### De adăugat:

1. Posibilitatea de a încărca o **poza de profil**.  
2. Posibilitatea de a modifica **numărul de telefon/email/nume**.  
3. Utilizarea unui fișier **.env** pentru configurări repetitive (în prezent, o problemă cu librăria **crypto** blochează implementarea).  
4. Alte funcționalități interesante vor fi adăugate!  

---


EN

---

A basic website for publishing recipes online, made by food enthusiasts for food enthusiasts.

### Running the Project:

Before we begin, you need **Node.js (npm)**, which can be installed by following the steps here: [Node.js installation](https://nodejs.org/en/download/package-manager).  
Additionally, you'll need **Express.js**, which will be installed later.  
If you encounter issues with libraries, all the libraries used are listed in the `package.json` files under the **dependencies** section (both for the frontend and backend).

---

### I. BACKEND

The backend setup is a bit more complex, requiring multiple steps:  

1. First, you need a local database. For this, we use the **XAMPP** application, which you can download from [here](https://www.apachefriends.org/index.html).  
2. After installing XAMPP, the servers need to be started. You can do this by going to the **Manage Servers** section and clicking the **Start All** button.  
3. Then, access [http://localhost/dashboard/](http://localhost/dashboard/), where you’ll see a Welcome screen confirming XAMPP is successfully installed and running. From here, go to the **phpMyAdmin** tab.  
4. In **phpMyAdmin**, you can view your existing databases. Instead of altering anything, create two new databases named **recipes** and **users**. The button for creating a new database is located in the top-left corner under the phpMyAdmin logo.  
5. After creating the two new databases, click on **recipes**, then go to the **SQL** tab at the top of the page, and paste the following command exactly as it is:

```sql
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
```

6. The table should now be created successfully. Next, navigate to the **users** database and, again in the **SQL** tab, run the following command:

```sql
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
```

7. If the commands were entered correctly, you should now have the `recipes` table in the **recipes** database and the `users` table in the **users** database.  
8. Now, open a terminal, navigate to the **backend** folder, and run `npm install`, followed by `npm start`. If everything worked correctly, you should see a message saying:  
   **Listening on port 8081...**

---

### II. FRONTEND

Running the frontend is simpler. After downloading the project:  

1. Open a terminal, navigate to the **frontend** directory, and run:  
   ```bash
   npm install
   npm start
   ```  

If all went well, a browser page with the project should open automatically. Now you can create an account, add a recipe, or explore the site. Bon appétit! 😄  

---

### Features:

1. **Account Creation**
2. **Token-based Login** (stay logged in even if you close the browser or stop the project in the terminal)
3. **Password Reset via Email** (receive an email with a unique link to reset your password — note: the link works only on the computer running the project)  
4. **Add Recipes**, including images uploaded by users, a rating system, and the ability to delete your own recipes.  
5. **Profile Page**, complete with all user information.  
6. **Feedback Form** (I receive the emails, so please don’t spam! 😅)  
7. **Recipe Page** where all published recipes can be viewed, with search options (by recipe name or author) and filtering/sorting (by rating).  
8. **Detailed Recipe Information** accessible by clicking on a recipe.  
9. **Mobile-friendly Design** for smaller screens (phones/tablets).  

---

### To Be Added:

1. Ability to upload a **profile picture**.  
2. Options to change **phone number/email/name**.  
3. Using a `.env` file to store repetitive configurations (currently blocked by an issue with the **crypto** library).  
4. More features to come!  

---



