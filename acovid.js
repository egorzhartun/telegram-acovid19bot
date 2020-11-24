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

bot.command('all', async (ctx) => {
    try {
        const allStats = await axios.get('https://disease.sh/v3/covid-19/all')
        const {
            updated,
            cases,
            todayCases,
            deaths,
            todayDeaths,
            recovered,
            todayRecovered,
            active,
            critical,
            tests,
            population,
            affectedCountries
        } = allStats.data
        
        const setData = `
            Статистика обновлена около *${moment(updated).fromNow()}*.
            Случаев: *${cases} чел.*
            Случаев за сегодня: *${todayCases} чел.*
            Смертей: *${deaths} чел.*
            Смертей за сегодня: *${todayDeaths} чел.*
            Выздоровевших: *${recovered} чел.*
            Выздоровевших за сегодня: *${todayRecovered} чел.*
            Активных случаев: *${active} чел.*
            Критических случаев: *${critical} чел.*
            Тесты: *${tests} чел.*
            Население: *${population} чел.*
            Пострадавшие страны: *${affectedCountries} чел.*
        `
        ctx.reply(setData, extra.markdown())
    } catch(e) {
        ctx.reply(e)
    }
})

bot.launch()
