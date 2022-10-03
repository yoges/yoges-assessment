import axios from "axios";

const baseURL = "https://localhost:3000/api";

export const getData = async () => {
  return axios.get(`${baseURL}/posts`);
};

export const filterData = async (filter) => {
  let {data} = await axios.get(`${baseURL}/posts`);
  let posts = data.posts.filter(p => {    
    let bool = false;
    p.categories.forEach(c => {
      if (filter.marketingAnalytics || filter.dataManagement){
        if ((filter.marketingAnalytics && c.name === "Marketing Analytics") || (filter.dataManagement && c.name === "Data Management")){
          bool = true;
        }
      }else{
        bool = true;
      }
    });
    return bool;
  });

  return posts
};
