# OfflineTest

Testing Online Sync using:

- Angular Service Worker (`ng add @angular/pwa`)
- IndexedDB ([idb](https://www.npmjs.com/package/idb))
- `addEventListener('online|offline')` (browser `window`)
- API used in this project: https://jsonplaceholder.typicode.com/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.

## Test Demo

```
npm install -g http-server
npm install
npm run build
cd dist/offline-test
http-server -p 4200
```

1. In browser, reload/refresh the page to make sure that GET (API call) is cached.
2. In browser's `Developer Tools` > `Application` > `Service Workers` should have content
3. Check **only** the `Offline` checkbox.
4. Click on `Add User` button in the web user interface (note: x clicked)
5. Uncheck the `Offline` checkbox in Service Workers
6. API Call from Add User button should come in

## Getting Started

In the way the project was created:

1. Project Setup and Installation

```
ng new offline-test
cd offline-test
ng add @angular/pwa
npm install idb
```

2. Create features to `GET` and `POST` API features (see `src/services/data.service.ts`)
3. Modify `ngsw-config.json` and add **dataGroups** to specify the endpoints that needs to be cached

Note: Recommend to have a different endpoint URL for `GET` and `POST` it might conflict with the cached data if same URL are given for different Request Methods.

4. Create IndexedDB and store the POST data when API calls failed for offline mode (see `src/services/indexed-db.service.ts`)
5. Create `src/services/offline.service.ts` to get browser window `navigator.online` or listen to `offline|online` events to check whether user is working on `offline` or `online` mode

> Use the listeners to trigger API calls based on the items stored in IndexedDB

### Others

Other npm packages used in this project:

- `bson-objectid` to generate Mongo ID in UI (https://www.npmjs.com/package/bson-objectid)
- `uuid` to generate unique IDs (https://www.npmjs.com/package/uuid)
