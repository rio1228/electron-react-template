/**
 * Created by Ryo Mikami on 2017/08/10.
 */
// import React from 'react'
// import ReactDOM from  'react-dom'
//
// const dom = <div> {/*この中にコンポーネントを配置*/} </div>
// ReactDOM.render(dom, document.getElementById('root'))

const electron = require('electron')
// Module to control application life.
const express = require("express");
const exapp = express();
const portNo = 3000
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const {ipcMain} = require('electron');
const path = require('path')
const url = require('url')
exapp.use(express.static("./"));
exapp.listen(3000, "localhost");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// Electronのライフサイクルを定義
let mainWindow //メインウィンドウを表す変数

// ウィンドウを作成してコンテンツを読み込む
function createWindow () {

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    mainWindow.loadURL(`http://localhost:${portNo}/`)
    console.log('electron.app.on通りました')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', electron.app.quit)
}
// 非同期プロセス通信
ipcMain.on('async',( event, args ) =>{
    console.log( args );
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        port : 3306,
        database: 'taiken'
    });

    connection.connect();

    connection.query('SELECT * from kyak LIMIT 10;', (err, rows, fields) => {
        if (err) throw err;

        console.log('The solution is: ', rows);
        // レンダラプロセスへsend
        event.sender.send('async-reply', rows);
    });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron.app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
