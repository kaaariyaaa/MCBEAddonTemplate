@echo off
setlocal

REM This script automates the initial setup for the Minecraft Bedrock Add-On project.

echo.
echo =======================================================
echo  Minecraft Bedrock Add-On Project Setup
echo =======================================================
echo.

REM Get the new project name from the command line argument
IF "%~1"=="" (
    echo.
    echo Please enter the new project name:
    set /p ProjectName=
) ELSE (
    set "ProjectName=%~1"
)

echo Project name set to: %ProjectName%
echo.

echo [Step 1/4] Installing dependencies...
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies. Please check your Node.js and npm installation.
    pause
    exit /b
)
echo [SUCCESS] Dependencies installed.
echo.

echo [Step 2/4] Renaming project files and configurations to "%ProjectName%"...
call npm run rename-project %ProjectName%
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to rename the project internals.
    pause
    exit /b
)
echo [SUCCESS] Project internals renamed.
echo.

echo [Step 3/4] Generating new UUIDs for manifest files...
call npm run generate-uuid %ProjectName%
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to generate UUIDs.
    pause
    exit /b
)
echo [SUCCESS] New UUIDs generated.
echo.

echo [Step 4/4] Preparing to rename the project root directory...

REM Get the current directory name
for %%f in ("%CD%") do set "CurrentDirName=%%~nxf"

REM Create a temporary batch file in the parent directory to perform the rename
(   echo @echo off
    echo title Renaming Project Directory
    echo echo.
    echo echo Renaming directory from "%CurrentDirName%" to "%ProjectName%"...
    echo timeout /t 2 /nobreak ^> nul
    echo ren "%CurrentDirName%" "%ProjectName%"
    echo IF %ERRORLEVEL% NEQ 0 (
    echo     echo [ERROR] Failed to rename the directory. It might be in use.
    echo     pause
    echo     exit /b
    echo )
    echo echo [SUCCESS] Project directory has been renamed.
    echo echo.
    echo echo This temporary window will close in 3 seconds...
    echo timeout /t 3 /nobreak ^> nul
    echo del "%%~f0"
) > "..\_renamer.bat"

echo A new window will open to finalize the directory renaming.

echo.
echo =======================================================
echo  Setup Complete!
echo =======================================================
echo.
echo This window will now close.

REM Start the renamer script from the parent directory
start "Renaming Process" /D "%CD%\.." cmd /c "_renamer.bat"

endlocal