# pims-proxy

**Déprecié :** Le proxy PIMS n'est plus nécessaire, les API en aval étant maintenant accessibles sans intermédiaire.

Ce repo contient des serverless functions déployées sur Vercel. Ces fonctions permettent de réaliser des requêtes vers des APIs rencontrant des erreurs CORS lorsqu'elles sont réalisées depuis le client PIMS.

Les proxy se mettent en intermédiaire, pour ajouter aux headers de la réponse les champs nécessaires pour éviter les erreurs CORS.

Deux proxy existent ainsi :

- [Proxy georisque](./api/proxy_georisque.ts) : Permet de faire une requête sur l'API de géorisque. Initialement il n'y avait pas de problèmes de CORS, mais le 26 Septembre, l'API de géorisque est down.
- [Proxy radiofrance](./api/proxy_radiofrance.ts) : Nous récupérons des informations sur une page de radiofrance, en faisant du scrapping sur des éléments html. Comme il n'y a pas d'API radiofrance permettant de récupérer ces informations, la récupération de ces informations est fait à la main. On récupère du html depuis une requête ajax, qui rencontre des erreurs CORS.
