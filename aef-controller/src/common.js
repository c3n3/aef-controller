// Some common function accross the vue app

let common = {
    /**
     * @param {String} value The date
     */
    prettyName(value)
    {
        if (value == null || value == undefined || !value) {
            return value
        }
        value = value.replace(/_/g, " ");
        let arr = value.split(" ");
        let newArr = []
        arr.forEach(element => {
            if (element)
                newArr.push(element[0].toUpperCase() + element.slice(1))
        });
        return newArr.join(" ");
    }
}

export default common