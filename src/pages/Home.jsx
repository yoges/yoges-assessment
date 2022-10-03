import { useState,useEffect } from "react";
import { useMatch } from "react-location";
import { filterData } from "../services/services";

const Home = () => {
    let postList = useMatch()

    const [posts, setPosts] = useState(postList.data.posts)
    
    const [category, setcategory] = useState({
        dataManagement: false,
        marketingAnalytics: false
    })

    const [pagination,setPagination] = useState({
        current: 1,
        perPage: 4,
    })

    useEffect(() => {
        // your method
        console.log(category)
        const fetchData = async () => {
            setPosts(await filterData(category));
        }      
        fetchData()
     }, [category]);

     useEffect(() => {
        setListItems(posts.map((post) =>
        <tr>
            <td>{post.id}</td>
            <td>{post.author.name}</td>
            <td>{post.title}</td>
            <td>{post.publishDate}</td>
            <td><button type="button">View Details</button></td>
        </tr>))      
     }, [posts]);
   
    const handleChange = async (e) => {
        const {name} = e.target

        setcategory({
            ...category, 
            [name]: !category[name]                                        // return new object jasper object
        })       
    }

    const [listItems, setListItems] = useState(posts.map((post) =>
    <tr>
        <td>{post.id}</td>
        <td>{post.author.name}</td>
        <td>{post.title}</td>
        <td>{post.publishDate}</td>
        <td><button type="button">View Details</button></td>
    </tr>
));

    return (
        <div>
          <div>
            <input
                id="dataManagement"
                name="dataManagement"
                type="checkbox"                
                onClick={handleChange} 
            />
            <label htmlFor="dataManagement">Data Management</label>
          </div>
          <div>
            <input
                id="marketingAnalytics"
                type="checkbox"
                name="marketingAnalytics"            
                onClick={handleChange}
            />
            <label htmlFor="marketingAnalytics">Marketing Analytics</label>
          </div>        
            <div className="overflowX-auto">
                <table>
                    <tr id="header">
                        <th>Id</th>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Publish Date</th>
                        <th>Action</th>
                    </tr>
                    {listItems}
                    <tr>
                        <td></td>
                        <td></td>
                        <td><button type="button">Load More</button></td>
                    </tr>
                </table>
            </div>
        </div>
    )    
}

export default Home;