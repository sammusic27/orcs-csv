import { parse } from 'node-html-parser';

export function parseHtml(htmlFromFile){
    const documentHtml = parse(htmlFromFile);

    let prepareDataToCSV = [];
    const lis = documentHtml.querySelectorAll('ul.see-also > li');
    lis.forEach((li) => {
        const date = li.querySelector('span.black').textContent;
        const categories = li.querySelectorAll('li');
        let text = '';

        // date | category name | amount | add amount
        let categoryName = '';
        let amount = '';
        let addAmount = '';
        
        categories.forEach((category) => {
            // remove &nbsp;&mdash;
            // check abbr tag

            const abbr = category.querySelector('abbr');
            const small = category.querySelector('small');

            if(abbr){
                category.removeChild(abbr);
            }
            if(small){
                category.removeChild(small);
            }
            
            text = category.textContent;
            // replace special characters
            text = text.replace(/&nbsp;/ig, ' '); 
            text = text.replace(/&mdash;/ig, '-');

            text = text.replace(/\n/g, ' '); // remove new line 
            text = text.replace(/\s+/g, ' '); // make one space for all text

            const textArr = text.split('—').map((item) => item.trim());

            // make a structure 
            
            categoryName = textArr[0];
            if(abbr){
                categoryName = abbr.textContent;
            }

            // amount value
            amount = textArr[1];
            // special case
            if(categoryName === 'Особовий склад'){
                const severalWords = amount.split(' ');
                const values = severalWords.filter(item => !isNaN(parseInt(item)));
                amount = values[1] ? `${values[0]}-${values[1]}` : values[0];
            }

            // let variants = '';
            // severalWords.forEach((item) => {
            //     const isItNumber = parseInt(item);
            //     if(!isNaN(isItNumber)){
            //         variants += `${isItNumber} `
            //     }
            // });
            // amount = variants;

            // addAmount value
            addAmount = 0;
            if(small){
                addAmount = small.textContent;
                addAmount = addAmount.replace(/\(/, '');
                addAmount = addAmount.replace(/\)/, '');
                addAmount = addAmount.replace(/\+/, '');
            }

            prepareDataToCSV.push({
                date,
                categoryName,
                amount,
                addAmount
            })
        });
    });

    return prepareDataToCSV;
}