import fetch from 'node-fetch';

import { readFile, saveFile } from '../helpers/file.js';
import { getArrayOfMonthesToCurrentDate } from '../helpers/date.js';
import { parseHtml } from '../parser/html-parser.js';

const sourceUrl = 'https://index.minfin.com.ua/ua/russian-invading/casualties/month.php?month=';
const DB_HTML = 'db.html';
const DB_CSV = 'db.csv';

async function getHtml(){
    const dates = getArrayOfMonthesToCurrentDate();
    const urls = dates.map((date) => sourceUrl + date);

    let html = '';    

    for(let index in urls){
        html += await makeRequest(urls[index]);
    }
    
    return html;
}

async function makeRequest(url){
    let htmlContent = '';
    try {
        const response = await fetch(url);
        htmlContent = await response.text();
    } catch (error) {
        console.log(error);
    }
    return htmlContent;
}

export async function collectData(){
    const htmlFromMinFin = await getHtml();
    saveFile(htmlFromMinFin, DB_HTML)

    const htmlFromFile = readFile(DB_HTML);
    const structure = parseHtml(htmlFromFile);
    const csvData = structure.map(item => `${item.date}|${item.categoryName}|${item.amount}|${item.addAmount}`).join("\n")
    saveFile(csvData);

    return parseCSV();
}

export function parseCSV(){
    const csvString = readFile(DB_CSV);
    const csvLines = csvString.split("\n");
    return csvLines.map(item => item.split('|').reduce((accumulator, currentValue, index) => { 
        switch(index){
            case 0: accumulator['date'] = currentValue; break;
            case 1: accumulator['categoryName'] = currentValue; break;
            case 2: accumulator['amount'] = currentValue; break;
            case 2: accumulator['addAmount'] = currentValue; break;
        }
        return accumulator;
    }, {}));
}