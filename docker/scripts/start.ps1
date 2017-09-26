# Start all project containers

$sd = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$pn = Import-CliXml $sd\pn.xml

Try
{
    docker container start $pn"_postgres"
    docker container start $pn"_django"
    docker container start $pn"_nginx"
}
Catch
{
    "Containers failed to start. Are you sure Docker has been started?"
}