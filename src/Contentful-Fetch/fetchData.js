import * as contentful from "contentful";

const SPACE_ID = process.env.REACT_APP_SPACE_ID;
const DELIVERY_ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN; //DELIVERY <- Gathers all content that is published
const ENTRY_ID = process.env.REACT_APP_ENTRY_ID;
const ENTRIES_TYPE_ID = process.env.REACT_APP_ENTRIES_TYPE_ID;
const ASSESTS_TYPE_ID = process.env.REACT_APP_ASSETS_TYPE_ID;

const client = contentful.createClient({
  entry_id: ENTRY_ID,
  space: SPACE_ID, // This is the space ID. A space is like a project folder in Contentful terms
  accessToken: DELIVERY_ACCESS_TOKEN,
});

const fetchEntries = () => {
  return client
    .getEntries({
      content_type: ENTRIES_TYPE_ID,
      include: 3,
    }).then(response => response.items)
    .catch(error => {
      alert("There was an issue fetching your content from Contentful " + error);
    });
};

export const getAll = () => {
  return fetchEntries().then(response => {
    //get all data for all components
    const data = response;

    return data;
  });
}

const fetchAssests = (_skip, _limit) => {
  return client
    .getEntries({
      content_type: ASSESTS_TYPE_ID,
      include: 3,
      skip: _skip,
      limit:  _limit,
    }).then(response => response.items)
    .catch(error => {
      alert("There was an issue fetching your content from Contentful " + error);
    });
};

export const getAllImages = (_skip, _limit) => {
  return fetchAssests(_skip, _limit).then(response => {
    //get all data for all components
    const data = shuffle(response);

    return data;
  });
}

//The modern version of the Fisher–Yates shuffle
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}