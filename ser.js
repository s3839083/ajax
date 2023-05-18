#!/usr/bin/env node

// Step 1 and step 2 code goes here
/* Step 1:
 * insert this code snippet to `./ser.js`
 * edit [port] to an appropriate value
 * storing config to variables is a good practice, see `port` in the code
 * learn the syntax of string interpolation in js, see `${port}` in the code
 * 將這段程式碼插入 `./ser.js`
 * 將 [port] 修改成合適的值
 * 將設定放在變數中是一種好習慣，參考程式中的 `port`
 * 學習 js 的 string interpolation 語法，參考程式中的 `${port}`
 */

// include `express`, you can use `import` now
// 載入 `express`, 現在可以放心使用 `import` 了
import express from 'express'
// const express = require('express')

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// create an express, aka web server, instance
// 建立一個 express (也就是網頁伺服器)實體
const app = express()

const port = 8475

// handle `/step1` url
// 處理 `/step1` 網址
app.get('/step1', (req, res) => {
  // response browser
  // 回應瀏覽器
  res.send('<h1>hello world</h1>')
})

// start the server
// 啟動伺服器
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

// Step 3 code goes here
app.use(express.static(`${__dirname}/dist`))
// Step 4 code goes here
let nRequests = 0
app.get('/step4', (req, res) => {
  res.send(`this is request #${++nRequests}`)
})
// Step 5 code goes here
app.get('/step5', (req, res) => {
  res.send(`Hello, ${req.query.fname} ${req.query.lname}`)
})
// Step 7 code goes here
// include `body-parser`
// 載入 `body-parser`
import bodyParser from 'body-parser'
// const bodyParser = require('body-parser')

// setup `body-parser`
// 設定 `body-parser`
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/step7', (req, res) => {
  // `bady-parser` stores parsed data in `req.body`
  // `bady-parser` 將解析好的資料存放在 `req.body`
  res.send(`Hello, ${req.body.fname} ${req.body.lname}`)
})

import fs from 'fs'
app.get('/list',(req,res) => {
  fs.readFile('./students.json', function(err, studentInfo){
    if(err){
      return console.error(err)  
    }
    let students = studentInfo.toString();
    students = JSON.parse(students);
    res.send(students)
  })
})

app.get('/search', (req, res) => {
  fs.readFile('./students.json', function(err, studentInfo){
    if(err){
      return console.error(err)  
    }
    let students = studentInfo.toString();
    students = JSON.parse(students);
    var name = '';
    for(const id in students){
      if(id == req.query.id){
        name += students[id];
      }
    }
    res.send(name)
  })
})

app.get('/add', (req, res) => {
  fs.readFile('./students.json', function(err, studentInfo){
    if(err){
      return console.error(err)  
    }
    let students = studentInfo.toString();
    students = JSON.parse(students);
    let add_succeed = 1;
    for(const id in students){
      if(id == req.query.id){
        add_succeed = 0;
        res.send(`There has the same student ID in the list`);
      }
    }
    if(add_succeed == 1){
      //var student =  req.query.id + ': ' + req.query.name;
      //console.log(students)
      //students.push(student)
      students[req.query.id] = req.query.name;

      var newlist = JSON.stringify(students);
      fs.writeFile('./students.json', newlist, function(err){
        if(err){
          console.error(err)  
        }
        console.log('Add new student to studentInfo');
      })
      res.send(`Add succeeds`);
    }
  })
})

app.get('/delete', (req, res) => {
  fs.readFile('./students.json', function(err, studentInfo){
    if(err){
      return console.error(err)  
    }
    let students = studentInfo.toString();
    students = JSON.parse(students);
    let delete_succeed = 0;
    for(const id in students){
      if(id == req.query.id){
        delete_succeed = 1;
        delete students[id];
        var newlist = JSON.stringify(students);
        fs.writeFile('./students.json', newlist, function(err){
          if(err){
            console.error(err)  
            }
            res.send(`Delete succeed`)
        })
      }
    }
    if(delete_succeed == 0){
      res.send(`Delete failed`)  
    }
  })
})

