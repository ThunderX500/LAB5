# SEG3502 — Laboratoire 5 — Progression

## Authors

- Andrianina Solofo
- <Second student name>

Course: SEG3502 — Lab 5.

## Prerequisites

- Node.js `^18.19.1`, `^20.11.1`, or `>=22` (the versions supported by Angular 18).
- npm 10 or later.
- A Google account, to create the Firebase project used by this lab.
- The Angular CLI does not need to be installed globally: `@angular/cli` is a dev dependency, so `npx ng <command>` uses the local version.

## Installation

1. Clone the repository and move into the project folder:

   ```bash
   git clone <repository-url>
   cd LAB5
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   This step is required: `node_modules/` is not committed and the repository has no lockfile. It installs the whole Angular 18 toolchain together with `@angular/fire` 18.0.1 and `firebase` ^10.14.1, which this lab uses to talk to Firestore.

## Firebase configuration

The application reads its Firebase credentials from `src/environments/environment.ts`, and that file currently holds placeholders. Complete these steps before the first run:

1. In the [Firebase console](https://console.firebase.google.com/), create a new project.
2. In **Build > Firestore Database**, create a database. Test mode is sufficient for this lab.
3. In **Project settings > General**, register a new **Web app** and copy the `firebaseConfig` object that the console displays.
4. Open `src/environments/environment.ts` and replace each placeholder (`<your-api-key>`, `<your-project-id>`, ...) with the matching value from that object. The keys already present — `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` — are exactly the ones the console provides.

Note: as long as the placeholders are still in place, Firebase cannot initialize and saving an employee will fail.

## Running the app

- Start the development server:

  ```bash
  npm start
  ```

  The app is then served at <http://localhost:4200>. The default route redirects to `/employee`, the form used to add an employee; `/employees` displays the employee list.

- Create a production build (output in `dist/employee-app`):

  ```bash
  npm run build
  ```

- Run the unit tests (Karma + Jasmine):

  ```bash
  npm test
  ```

## DONE

- Ajout des dépendances AngularFire/Firebase au projet.
- Ajout du fichier `src/environments/environment.ts` pour la configuration Firebase.
- Configuration de Firebase et Firestore dans `app.config.ts`.
- Connexion du formulaire Employee à Firestore.
- Ajout de `saveEmployee()` dans `EmployeeService` avec `addDoc()` vers la collection `employees`.
- Ajout de la gestion d'erreur lors de la sauvegarde d'un employé, avec délai d'attente maximal.
- Remplacement des valeurs Firebase temporaires dans `environment.ts` par les vraies valeurs du projet Firebase.
- Remplacement de la liste en mémoire par la lecture réelle depuis Firestore avec `collectionData()`.
- Chargement des données Firestore lors de l'affichage de « Employee List », et affichage de tous les employés, y compris après un rafraîchissement de la page.
- Conversion du `Timestamp` Firestore en `Date` afin que le `DatePipe` du tableau puisse la formater.
- Correction de la lecture de la date du formulaire : `yyyy-MM-dd` est maintenant interprétée en heure locale et non en UTC, ce qui décalait la date d'un jour.
- Correction des tests unitaires : `Firestore` et `Router` sont fournis au `TestBed`, et le test de l'`AppComponent` vérifie le `router-outlet` réellement présent dans le gabarit.
- Vérification de la persistance complète avec Firestore : écriture, relecture après rafraîchissement, et conversion de la date.

## LEFT

- Aucun élément restant : le laboratoire est complet.
