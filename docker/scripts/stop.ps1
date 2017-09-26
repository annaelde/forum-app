# Stop all project containers

$sd = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$pn = Import-CliXml $sd\pn.xml

docker container stop $pn"_nginx"
docker container stop $pn"_django"
docker container stop $pn"_postgres"