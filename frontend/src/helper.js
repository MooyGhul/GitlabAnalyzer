const monthNames = ["January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

// Found a solution for grouping by date here:
// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
const groupBy = (arr, key) => {
    return arr.reduce((storage, item) => {
        let group = formatGraphDate(item[key]);

        storage[group] = storage[group] || [];

        storage[group].push(item);

        return storage;
    }, {});
};

export const getGraphData = (arr, key) => {
    let result = [];
    const groupedData = groupBy(arr, key);
    for(const obj in groupedData) {
        if(groupedData.hasOwnProperty(obj)) {
            let year = obj;
            let comments = groupedData[year].length;
            result.push({"year": year, "data": comments});
        }
    }
    result = result.sort((obj1, obj2) => {
        const date1 = new Date(obj1.year);
        const date2 = new Date(obj2.year)
        if(date1 > date2) {
            return 1;
        } else {
            return -1;
        }
    });
    return result
};

export const formatGraphDate = (commentDate) => {
    let date = new Date(commentDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

export const formatTableDate = (commentDate) => {
    let date = new Date(commentDate);
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    return `${month} ${day}, ${year} @ ${time}`;
}