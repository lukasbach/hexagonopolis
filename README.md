# Hexagonopolis

[![Build Status](https://travis-ci.com/lukasbach/hexagonopolis.svg?branch=master)](https://travis-ci.com/lukasbach/hexagonopolis)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lukasbach_hexagonopolis&metric=bugs)](https://sonarcloud.io/dashboard?id=lukasbach_hexagonopolis)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lukasbach_hexagonopolis&metric=code_smells)](https://sonarcloud.io/dashboard?id=lukasbach_hexagonopolis)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=lukasbach_hexagonopolis&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=lukasbach_hexagonopolis)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=lukasbach_hexagonopolis&metric=ncloc)](https://sonarcloud.io/dashboard?id=lukasbach_hexagonopolis)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukasbach_hexagonopolis&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=lukasbach_hexagonopolis)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukasbach_hexagonopolis&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=lukasbach_hexagonopolis)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=lukasbach_hexagonopolis&metric=security_rating)](https://sonarcloud.io/dashboard?id=lukasbach_hexagonopolis)

Hexagonopolis is a web-based minigame playable at 
[lukasbach.github.io/hexagonopolis/](https://lukasbach.github.io/hexagonopolis/).
It was developed using React and Typescript, the assets are designed
by [Kenney](https://kenney.nl).

The used asset packs are: 

 * [Hexagon Pack](https://kenney.nl/assets/hexagon-pack)
 * [Animal Pack Redux](https://www.kenney.nl/assets/animal-pack-redux)

## Screenshots
![Screenshot](./screenshots/main-menu.jpg "Main Menu")

![Screenshot](./screenshots/campaign.jpg "Campaign")

![Screenshot](./screenshots/ingame-0.jpg "Ingame")

![Screenshot](./screenshots/ingame-1.jpg "Ingame")

![Screenshot](./screenshots/ingame-2.jpg "Ingame")

![Screenshot](./screenshots/ingame-3.jpg "Ingame")

## ToDos

The game is playable, but lacks a few features, especially levels. At the moment,
there are a few campaign levels and three Fill-The-Map levels which are essentially
random-based levels. The balancing is also not so great at the moment.

Other missing features (which may or may not be added later) include:

 * Locking later campaign levels and unlocking them when the previous level is finished.
 * Animated dialogs.
 * Allow playing levels and campaigns designed by community (which should not be too hard,
   all levels are just JSON-data, just the logic to load external levels is missing).
 * Level Editor

## Developing and Deploying

If you want to download and run the game locally, you can
do so by following the usual npm/yarn workflow, ``yarn && yarn start``
to run the game and ``yarn && yarn run build`` to build independent
deployment artifacts.

The webapp was created using ``create-react-app`` and still uses
``react-scripts`` for building the app.

    
