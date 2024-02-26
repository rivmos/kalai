const wildCardSearch = (
    list,
    input,
    specifyKey
) => {
    const searchText = (item) => {
        for (const key in item) {
            if (item[specifyKey ? specifyKey : key] == null) {
                continue
            }
            if (
                item[specifyKey ? specifyKey : key]
                    .toString()
                    .toUpperCase()
                    .indexOf(input.toString().toUpperCase()) !== -1
            ) {
                return true
            }
        }
        return false; 
    }
    const result = list.filter((value) => searchText(value))
    return result
}


const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}


module.exports = { wildCardSearch, paginate }
