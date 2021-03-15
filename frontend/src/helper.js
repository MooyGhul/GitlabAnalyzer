
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

export const getGraphData = (arr) => {
    let result = [];
    const groupedData = groupBy(arr, "commentDate");
    for(const obj in groupedData) {
        if(groupedData.hasOwnProperty(obj)) {
            let year = obj;
            let comments = groupedData[year].length;
            result.push({"year": year, "comments": comments});
        }
    }
    return result
};

export const getIssueGraphData= (arr) => {
    let result = []; 
    const groupedData = groupBy(arr, 'openedDate');
    for(const obj in groupedData) {
        if(groupedData.hasOwnProperty(obj)) {
            let year = obj;
            let issues = groupedData[year].length;
            result.push({'year': year, 'IssueWordCount': issues});
        }
    }
}

export const formatGraphDate = (commentDate) => {
    let date = new Date(commentDate);
    let month = date.getMonth();
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