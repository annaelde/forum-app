$workingDirectory =  (Get-Item (Split-Path -Parent $MyInvocation.MyCommand.Path)).Parent.Parent.FullName
Set-Location $workingDirectory

Invoke-Expression "./env/py/scripts/Activate.ps1"

Set-Location './site'