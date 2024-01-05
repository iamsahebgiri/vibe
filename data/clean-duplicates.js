import fs from 'fs';

const inputFileName = 'output.json';
const outputFileName = 'cleaned_data.json';

function removeDuplicates(data) {
  const uniqueData = [];
  const idsSet = new Set();

  for (const item of data) {
    if (!idsSet.has(item.id)) {
      uniqueData.push(item);
      idsSet.add(item.id);
    }
  }

  return uniqueData;
}

try {
  // Read data from the input file
  const inputData = JSON.parse(fs.readFileSync(inputFileName));

  // Remove duplicates based on the "id" field
  const cleanedData = removeDuplicates(inputData);
  console.log(cleanedData.length);
  // Save the cleaned data to the output file
  fs.writeFileSync(outputFileName, JSON.stringify(cleanedData, null, 2));

  console.log(`Duplicates removed. Cleaned data saved to ${outputFileName}`);
} catch (error) {
  console.error('Error processing data:', error.message);
}
