require('dotenv').config()
const { Telegraf } = require('telegraf')
const extra = require('telegraf/extra')
const axios = require('axios').default
const moment = require('moment');
require ('moment/locale/ru')
moment.locale('ru')
const HELP_BOT = require('./help')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start( ctx => ctx.reply(`
    Здравствуйте, ${ctx.from.first_name}!
    Чтобы получить статистику по определённой стране,
    введите её в поле ввода на английском языке.
    Введите команду /help и я расскажу Вам о себе.
`))

bot.help( ctx => ctx.reply(HELP_BOT))


bot.launch()
