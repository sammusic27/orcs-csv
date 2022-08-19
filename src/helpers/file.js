import fs from 'fs';

export function saveFile(data, fileName = 'db.csv'){
    return fs.writeFileSync(`./tmp/${fileName}`, data); 
}

export function readFile(fileName = 'db.csv'){
    return fs.readFileSync(`./tmp/${fileName}`, {encoding: "utf8"}); 
}
