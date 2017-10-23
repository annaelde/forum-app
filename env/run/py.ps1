$workingDirectory =  (Get-Item (Split-Path -Parent $MyInvocation.MyCommand.Path)).Parent.FullName
Set-Location $workingDirectory

Invoke-Expression "./py/scripts/Activate.ps1"