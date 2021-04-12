import {ComingSoonMsg} from "./shared/ComingSoonMsg";

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

export const getGraphData = (arr, key, score) => {
  let result = [];
  const groupedData = groupBy(arr, key);
  for(const obj in groupedData) {
    if(groupedData.hasOwnProperty(obj)) {
      let year = obj;
      let comments = 0;
      if(score) {
        for(let i = 0; i < groupedData[year].length;i++){
          comments = comments + groupedData[year][i].score;
        }
      } else {
        comments = groupedData[year].length;
      }
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

const formatGraphDate = (commentDate) => {
  let date = new Date(commentDate);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const formatTableDate = (commentDate, includeTime = true) => {
    let date = new Date(commentDate);
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    return `${month} ${day}${includeTime ? `, ${year} @ ${time}` : ''}`;
};

const createMRData = (id, iid, date, name, url, mrScore, totalCommitScore, relatedCommits) => {
  return {id, iid, date, name, url, mrScore, totalCommitScore, relatedCommits};
};

const createCommitData = (id, date, name, url, score) => {
  return {id, date, name, url, score};
};

const createGraphData = (year, MRDaily, CommitDaily) => {
  return { year, MRDaily, CommitDaily };
};

export const makeCodeContributionTableData = (mrData, mrArray, commitData) => {
  for(let mrDataIndex = 0; mrDataIndex < mrData.length; mrDataIndex++) {
    const relatedCommitIds = commitData.filter(val => {
      return mrData[mrDataIndex].commitIds.includes(val.commitId);
    });

    let relatedCommitsArray = [];
    for(let relatedCommitIndex = 0; relatedCommitIndex < relatedCommitIds.length; relatedCommitIndex++){
      const commitDate = new Date(relatedCommitIds[relatedCommitIndex].commitDate);
      const newCommitData = createCommitData(
        relatedCommitIds[relatedCommitIndex].commitId,
        '' + formatTableDate(commitDate),
        relatedCommitIds[relatedCommitIndex].commitName,
        relatedCommitIds[relatedCommitIndex].url,
        ComingSoonMsg.msg);
      relatedCommitsArray.push(newCommitData);
    }

    const mrDate = new Date(mrData[mrDataIndex].mergedAt);
    const newMrData = createMRData(
      mrData[mrDataIndex].id,
      mrData[mrDataIndex].iid,
      '' + formatTableDate(mrDate),
      mrData[mrDataIndex].mergeRequestName,
      mrData[mrDataIndex].url,
      ComingSoonMsg.msg,
      ComingSoonMsg.msg,
      relatedCommitsArray);
    mrArray.push(newMrData);
  }
};

export const makeCommitGraphData = (commitDataTypeArray, commitDataOutputArray) => {
  for(let i = 0; i < commitDataTypeArray.length; i++) {
    commitDataOutputArray.push(
      createGraphData(
        commitDataTypeArray[i].year,
        0,
        commitDataTypeArray[i].data));
  }
};

export const makeMRGraphData = (mrDataTypeArray, mrDataOutputArray) => {
  for(let i = 0; i < mrDataTypeArray.length; i++) {
    mrDataOutputArray.push(
      createGraphData(
        mrDataTypeArray[i].year,
        mrDataTypeArray[i].data,
        0));
  }
};

export const mergeGraphData = (commitData, mrData) => {
  let merged;
  for (let i = 0; i < commitData.length; i++) {
    for (let j = 0; j < mrData.length; j++) {
      if (commitData[i].year === mrData[j].year) {
        commitData[i].MRDaily += mrData[j].MRDaily;
        mrData.splice(j, 1);
      }
    }
  }
  merged = [...commitData, ...mrData];
  merged.sort((a, b) => {
    let dateA = new Date(a.year);
    let dateB = new Date(b.year);
    return dateA - dateB;
  });
  return merged;
};


