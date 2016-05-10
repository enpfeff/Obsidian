# Obsidian
Flight aware tracking and Notification System

### Contents
* [Dependencies](#dependencies)
    * [Node]
    * [Mongo]
    * [Redis]
* [Install](#install)
    * [Normal](#normal)
    * [Development](#dev)

## Dependencies
The following are hard dependencies
* Node `~ v4.x`
    * For dependencies and main server
* Mongo `~ v3.2.4`
    * Configuration of Users and Emails
* Redis `~ v2.8.19`
    * TTL for cached flight data and session storage of main App

## Install
### Normal
1.  `npm run build`
2.  `npm start`

### Dev
`npm run dev`