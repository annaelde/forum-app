# Enter your Django container to use bash

$sd = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$pn = Import-CliXml $sd\pn.xml

docker exec -it $pn"_django" bash