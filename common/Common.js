
export class Common {

    convertPriceToDecimal = async (price) => {
        return parseFloat(price.replace(',', '.').replace('$', '').trim());
    }
}