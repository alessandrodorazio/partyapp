# Installazione PartyApp Gruppo 5

## Configurazione di Laravel e React

Lanciare i comandi `composer install` e `npm install`per installare le dipendenze di React e Laravel.
Successivamente, generare le chiavi di Laravel per la sicurezza mediante `php artisan key:generate`e `php artisan jwt:secret`

## Configurazione del database

Creare il database (e tenerlo vuoto).

Modificare le variabili del db all'interno del file .env. Le variabili sono `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`e `DB_PASSWORD`.

Tramite `php artisan migrate:fresh --seed` viene configurato il database e vengono inseriti dei record di test tramite Faker (generazione automatica).

## Lancio dell'app

Lanciare `npm run prod`, successivamente `php artisan serve`. L'app sarà visibile all'url 127.0.0.1:8000
