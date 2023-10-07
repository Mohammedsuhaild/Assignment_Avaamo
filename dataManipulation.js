const fs = require('fs');
const axios = require('axios');

// Function to fetch data from the URL
async function fetchData() {
  try {
    const response = await axios.get('https://res.cloudinary.com/drjttrnae/raw/upload/v1696592942/input_data.json');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from the URL:', error);
  }
}

// Read data from the URL
fetchData()
  .then((inputJson) => {
    // Calculate the average age of all the people
    const totalAge = inputJson.reduce((sum, person) => sum + person.age, 0);
    const averageAge = totalAge / inputJson.length;

    // Filter people who are 30 years old or older
    const filteredPeople = inputJson.filter((person) => person.age >= 30);

    // Sort the filtered array by name in alphabetical order
    filteredPeople.sort((a, b) => a.name.localeCompare(b.name));

    // Create the output object with the calculated average and filtered/sorted data
    const outputData = {
      averageAge: averageAge,
      people: filteredPeople,
    };

    // Write the result to the output JSON file
    fs.writeFile('output_data.json', JSON.stringify(outputData, null, 2), (err) => {
      if (err) {
        console.error('Error writing output file:', err);
        return;
      }
      console.log('Output data has been written to output_data.json');
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
