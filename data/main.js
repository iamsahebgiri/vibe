import axios from 'axios';
import fs from 'fs';

const options = {
  method: 'GET',
  url: 'http://sapi.slickapp.co/activities',
  headers: {
    'user-agent': 'Dart/3.1 (dart:io)',
    app: 'slick',
    deviceid: 'bed7c293cc532887',
    appversion: '2.1.49+157',
    'accept-encoding': 'gzip',
    authorization: 'Bearer TOKEN',
    operatingsystem: 'android',
    host: 'sapi.slickapp.co',
    'content-type': 'application/json',
  },
};

const outputFileName = 'output.json';

async function fetchData(selection_time) {
  try {
    const response = await axios.request({
      ...options,
      params: {
        selection_time,
      },
    });
    return response.data.activities;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

async function processAndSaveData(data) {
  // Transform data as needed
  const transformedData = data.map((item) => {
    return { id: item.question_id, emoji: item.emoji, prompt: item.prompt };
  });

  // Read existing data or initialize an empty array
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync(outputFileName));
  } catch (error) {
    console.log('No existing data found. Starting fresh.');
  }

  // Combine existing data with new transformed data
  const allData = existingData.concat(transformedData);

  // Save the combined data to the output file
  fs.writeFileSync(outputFileName, JSON.stringify(allData, null, 2));

  console.log(`Data saved to ${outputFileName}`);
}

async function fetchDataAndProcess() {
  let selection_time = '';
  let hasMoreData = true;
  let page = 1;

  while (hasMoreData) {
    console.log(`Fetching data for page ${page}`);
    const apiData = await fetchData(selection_time);

    if (apiData && apiData.length > 0) {
      selection_time = apiData.at(-1).selection_time;
      await processAndSaveData(apiData);
      page++;
    } else {
      console.log('No more data. Exiting.');
      hasMoreData = false;
    }
  }
}

// Start fetching and processing data
fetchDataAndProcess();
