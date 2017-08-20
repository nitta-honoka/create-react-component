#!/usr/bin/env node

const version = require('../package.json').version
const program = require('commander')
const readline = require('readline')
const path = require('path')
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let target, template

program
  .version(version)
  .command('new <target> <template>')
  .action((tg, te) => {
    target = tg
    template = te
  })

program.parse(process.argv)

const targetPath = path.join('.', target)
const templatePath = path.join('.', template)

console.info('target %s, template %s', targetPath, templatePath)
if (!fs.existsSync(targetPath)) {
  createFile(targetPath, templatePath)
  return process.exit(1)
}

rl.question('the target file has existed, replace the file? Y/N ', answer => {
  answer = answer.trim()
  if (answer === 'Y' || answer === 'y') {
    fs.unlinkSync(targetPath)
    createFile(targetPath, templatePath)
  }

  return process.exit(1)
})

function createFile(targetPath, templatePath) {
  const templateData = fs.readFileSync(templatePath, 'utf8')
  fs.appendFileSync(targetPath, templateData, 'utf8')
  console.info('create file successfully! ')
}