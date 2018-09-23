'use strict';

//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents');

if (setupEvents.handleSquirrelEvent()) {
   return;
}

const electron = require('electron');
const {app, protocol} = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path')
const url = require('url')

var mainWindow = null;


function createWindow () {

  mainWindow = new BrowserWindow({width: 1235, height: 720, resizable: false, autoHideMenuBar: true})
  mainWindow.setMenu(null);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}
 
app.on('ready', createWindow)

app.on('window-all-closed',  () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})