@echo off
echo =====================================
echo STARTING QA AUTOMATION FULL FLOW
echo =====================================

cd /d C:\Users\RAM\APP-QA-ENV

echo.
echo STEP 1: Starting Server...
start cmd /k node server.js

timeout /t 5

echo.
echo STEP 2: Running Newman Tests...

echo Using environment file...

newman run "C:\Users\RAM\APP-QA-ENV\APPS-POLICY_PRO.postman_collection.json" ^
-e "C:\Users\RAM\APP-QA-ENV\APP-QA-ENV-GULF.postman_environment.json" ^
-r cli,htmlextra ^
--reporter-htmlextra-export "C:\Users\RAM\APP-QA-ENV\report.html"

echo.
echo STEP 3: Opening Report...
start "" "C:\Users\RAM\APP-QA-ENV\report.html"

echo =====================================
echo DONE
echo =====================================

pause