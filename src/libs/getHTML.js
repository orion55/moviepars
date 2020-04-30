const axios = require('axios');

const getHTML = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export default getHTML;
