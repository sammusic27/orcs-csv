# ORCs CSV

A small parser from public source to get CSV database of killed orcs.

## RUN

```npm run start``` - get the database.

File `tmp/db.csv` will be created.

`node src/index.js -c` - collect the data into html format and convert into csv format.

`node src/index.js -p` - parse the csv format.

`node src/index.js --help` - to get help

## CSV Format

```Date | Category Name | Amount of Elliminated Orcs | Difference Amount from Previous Date```

FYI: For the specific category it could be as range, for example: `10-20`

## ORCs must die!

Support Ukraine!