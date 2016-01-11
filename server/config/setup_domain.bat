@echo off
set domain="vizob1.com"
set subdomain=%1.%domain%
echo %subdomain%
REM Step 1 Creating a conf file for subdomain

set sites_available_path="C:\nginx\conf\sites-available\"%subdomain%."conf"
set sites_enabled_path="C:\nginx\conf\sites-enabled\"%subdomain%."conf"
set sites_log_path="C:\nginx\logs\"%subdomain%."log"

(
	echo upstream %subdomain% {   
	echo     server 127.0.0.1:3000;      
	echo     keepalive 8;                
	echo }                               
	echo # the nginx server instance     
	echo server {                        
	echo     listen 0.0.0.0:80;          
	echo     server_name %subdomain%;
	echo     access_log /nginx/logs/%subdomain%.log;
	echo     # pass the request to the n ode.js server with the correct headers
	echo     # and much more can be adde d, see nginx config options
	echo     location / {                
	echo       proxy_set_header X-Real-IP $remote_addr;
	echo       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	echo       proxy_set_header Host $http_host;
	echo       proxy_set_header X-NginX-Proxy true;
	echo       proxy_pass http://%subdomain%/;
	echo       proxy_redirect off;
	echo     }
	echo }
) >%sites_available_path%


REM Step 2 Link sites-available to sites-enable
echo %sites_enabled_path% %sites_available_path%
mklink /h %sites_enabled_path% %sites_available_path%

REM Step 3 Link sites-available to sites-enable
(
 echo conf file has been created 
) >%sites_log_path%

REM Step 4 restart nginx server