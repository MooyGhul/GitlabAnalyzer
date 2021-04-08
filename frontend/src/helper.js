import moment from "moment";

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

export const getGraphData = (arr, key, startDate="2021-01-01", endDate=moment().format("YYYY-MM-DD")) => {
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
    return padDates(result, startDate, endDate);
};

const padDates = (dates, startDate, endDate) => {
    dates.splice().unshift({"year": startDate, "data": 0});
    dates.splice(dates.length-1).push({"year": endDate, "data": 0});

    // Found the solution to use moment to check sequential dates: https://stackoverflow.com/questions/26756997/dump-missing-date-in-data-for-chartjs
    for(let i = 0; i < dates.length - 1; i++) {
        let date1 = moment(dates[i].year, "YYYY-MM-DD");
        let date2 = moment(dates[i+1].year, "YYYY-MM-DD");

        if(!date1.add(1, "days").isSame(date2)) {
            dates.splice(i+1, 0, {"year": date1.format("YYYY-MM-DD"), "data": 0});
        }
    }
    return dates;
}

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