# SEG3502 — Laboratoire 5 — Progression

## DONE

- Ajout des dépendances AngularFire/Firebase au projet.
- Ajout du fichier `src/environments/environment.ts` pour la configuration Firebase.
- Configuration de Firebase et Firestore dans `app.config.ts`.
- Connexion du formulaire Employee à Firestore.
- Ajout de `saveEmployee()` dans `EmployeeService` avec `addDoc()` vers la collection `employees`.
- Ajout de la gestion d'erreur lors de la sauvegarde d'un employé.
- Conservation temporaire de la liste en mémoire pour que l'affichage actuel continue de fonctionner pendant cette première moitié.

## LEFT

- Exécuter `npm install` après avoir récupéré cette version afin d’installer AngularFire/Firebase.
- Remplacer la lecture en mémoire par la récupération réelle des employés depuis Firestore.
- Faire charger les données Firestore lorsque « Employee List » est utilisé.
- Afficher dans le tableau tous les employés récupérés depuis Firestore, y compris après un rafraîchissement de la page.
- Gérer correctement la conversion de la date venant de Firestore si nécessaire.
- Remplacer les valeurs Firebase temporaires dans `environment.ts` par les vraies valeurs du projet Firebase.
- Tester la persistance complète avec Firestore et effectuer la vérification finale du laboratoire.
