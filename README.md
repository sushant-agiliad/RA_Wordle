# RA_Wordle
Wordle app for RA project

Setup by cleaning and reinstalling 
1) npm rm -rf node_modules
2) rm package-lock.json
3) npm install

Run Locally (Localhost)
1) ng serve --open
2) Open browser - http://localhost:4200/

Get Ip address of Computer
1) ipconfig

Run in local network
1) ng serve --host 0.0.0.0
2) 2) Open browser - http://[ip address]:4200/

To change the ip address of graphql server.
1) src/app/graphql.module.ts
2) change this line "const uri = 'http://[ip address]:4000';"