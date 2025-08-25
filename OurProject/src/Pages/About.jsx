// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MoreDetails from "../Components/MoreDetails";
// import BestSellers from "./BestSellers";
// import SalesPage from "../Components/SalesPage";
// import { useNavigate } from "react-router-dom";
// import OurStore from "./OurStore";
// import Hero from "../Components/Hero";

// const About = () => {
//   const Navigate = useNavigate();
//   const [AllData, setAllData] = useState([]);
//   const [Details, setDetails] = useState([]);
//   const [count, setCount] = useState(1);
//   const [decreaseCount, setDecrease] = useState(-1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("All");

//   // filter logic

//   // const navigate=useNavigate()

//   // const FinalData = {...HandleProducts,base64,inpValue };
//   const data = JSON.parse(localStorage.getItem("userToken"));
//   console.log(data, "datauser");

//   const userToken = data.token;
//   // console.log(userToken,"usertoken");
//   const FetchingData = async () => {
//     await axios
//       .get("http://localhost:5000/api/getAll", {
//         headers: { Authorization: `Bearer ${userToken}` },
//       })
//       .then((response) => {
//         console.log();

//         setAllData(response.data);
//       });
//   };
//   useEffect(() => {
//     FetchingData();
//   }, []);

//   //category filteration
//   console.log(category, "category");

//   const filteredData = AllData.filter(
//     (p) =>
//       (category === "All" || p.productCategory === category) &&
//       p.productname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   console.log(AllData, "ALLDATA");
//   const increase = async (item, e) => {
//     e.stopPropagation();

//     // Safely calculate new count

//     setCount(+1); // Update local state

//     const itemQuant = item.productQuantity;

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/update/${item._id}`,
//         {
//           counter: count,
//           quantity: itemQuant + 1,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log("Updated successfully:", response.data);
//       FetchingData();
//     } catch (err) {
//       console.error("Error updating:", err);
//     }
  
//   };

//   const decrease = async (item, e) => {
//     e.stopPropagation();
//     const price = item.productSellingPrice;
//     const name = item.productname;
//     setDecrease(-1);

//     // console.log(count);
//     // console.log(item);
//     // console.log(decreaseCount);

//     const currValue = item.productQuantity;
//     // console.log(currValue,"value");

//     const response = await axios
//       .put(
//         `http://localhost:5000/api/updateDec/${item._id}`,
//         { counter: decreaseCount },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//     console.log(response);
//     FetchingData();

  
//     console.log(res);
//     const responsees = axios.post(
//       "http://localhost:5000/api/additionaldata",
//       AllData,
//       { headers: { Authorization: `Bearer ${userToken}` } }
//     );
//     console.log(responsees);
//   };
//   const Delete = async (item, e) => {
//     e.stopPropagation();

//     console.log(item._id);
//     const confirmation = confirm("are you sure to delete product");
//     if (confirmation) {
//       const response = await axios
//         .delete(`http://localhost:5000/api/delete/${item._id}`)
//         .then((res) => FetchingData())
//         .catch((err) => console.log(err));
//     } else {
//       alert("you cancleed your delete");
//     }

//     console.log(response);
//   };

//   const AllDetails = async (item, e) => {
//     e.stopPropagation();

//     console.log(item._id, "shgduse");

//     //  const goToDetails = (item) => {

//     // };
//     const response = await axios
//       .get(`http://localhost:5000/api/MoreDetails/${item._id}`)
//       .then((res) => setDetails(res.data));
//     console.log(response, "sijhijs9");
//     console.log(Details);
//     Navigate(`/MoreDetails/${item._id}`);

//     // console.log(AllData,"this is all data");
//     console.log(AllData, "data filtered");
//   };

//   return (
//     <div>
//       <Hero></Hero>

//       <div className="mt-30 mb-30">
//         <BestSellers></BestSellers>
//       </div>

//       <div className="p-4 ">
//         <div className="mb-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
//           {/* Category Select */}
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Choose Category</option>
//             <option>All</option>
//             <option>Biscuits</option>
//             <option>Stationery</option>
//             <option>Cosmetics</option>
//             <option>Snacks & Chips</option>
//             <option>Chocolates</option>
//             <option>Bathroom Essentials</option>
//             <option>Edible Oils</option>
//             <option>Others</option>
//           </select>

//           {/* Search Bar */}
//           <input
//             type="text"
//             placeholder="🔍 Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <h1 className="text-2xl font-bold text-center mb-6">
//           Available Products
//         </h1>

//         <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-20">
//           {filteredData.length > 0 ? (
//             <>
//               {filteredData.map((item) => (
//                 <div
//                   onClick={(e) => AllDetails(item, e)}
//                   key={item._id}
//                   className="bg-white border-1 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                 >
//                   {/* Product Image */}
//                   <img
//                     src={item.base64}
//                     alt={item.productname}
//                     className="h-32 sm:h-40 md:h-48 w-full object-cover border-1 rounded"
//                   />

//                   {/* Product Info */}
//                   <div className="p-2 sm:p-3 md:p-4">
//                     <h2 className="text-sm sm:text-base md:text-lg font-semibold">
//                       {item.productname}
//                     </h2>
//                     <p className="text-[10px] sm:text-xs md:text-sm text-black">
//                       {item.productCategory}
//                     </p>

//                     <p className="text-xs sm:text-sm text-gray-700 mt-1">
//                       Expiry:{" "}
//                       <span className="font-bold text-blue-800">
//                         {item.ProductExpiry}
//                       </span>
//                     </p>

//                     <div className="mt-2 flex justify-between items-center text-[10px] sm:text-sm">
//                       <span className="text-green-600 font-bold">
//                         SellingPrice: {item.productSellingPrice}
//                       </span>
//                       <span className="text-red-500 font-bold">
//                         ActualPrice: {item.productActualPrice}
//                       </span>
//                       <span className="text-red-500 font-bold">
                        
//                         {/* Actual qty: {item.inpValue} */}
//                         {/* {const}
//                         {localStorage.setItem("inpValue",JSON.stringify([filteredData]))} */}
//                       </span>
//                     </div>

//                     <SalesPage data={item}></SalesPage>
//                     <div className="hidden">
//                       <OurStore items={item}></OurStore>
                    
                      
//                     </div>

//                     <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
//                       <button
//                         onClick={(e) => decrease(item, e)}
//                         className="bg-blue-600 hover:bg-yellow-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded"
//                       >
//                         -
//                       </button>
//                       <span className="font-bold text-xs sm:text-sm flex items-center">
//                         {item.productQuantity}
//                       </span>
//                       <button
//                         onClick={(e) => increase(item, e)}
//                         className="bg-green-600 hover:bg-red-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded"
//                       >
//                         +
//                       </button>
//                       <button
//                         onClick={(e) => Delete(item, e)}
//                         className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded ml-auto"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <MoreDetails productData={Details}></MoreDetails>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <>no products found</>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MoreDetails from "../Components/MoreDetails";
// import BestSellers from "./BestSellers";
// import SalesPage from "../Components/SalesPage";
// import { useNavigate } from "react-router-dom";
// import OurStore from "./OurStore";
// import Hero from "../Components/Hero";


// const About = () => {
//   const Navigate = useNavigate();
//   const [AllData, setAllData] = useState([]);
//   const [Details, setDetails] = useState([]);
//   const [count, setCount] = useState(1);
//   const [decreaseCount, setDecrease] = useState(-1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("All");
// const [expiredProducts, setExpiredProducts] = useState([]);
// const [dateAypoindhi,setDateAypoindhi]=useState([])

//   // filter logic

//   // const navigate=useNavigate()

//   // const FinalData = {...HandleProducts,base64,inpValue };
//   const data = JSON.parse(localStorage.getItem("userToken"));
//   console.log(data, "datauser");

//   const userToken = data.token;
//   // console.log(userToken,"usertoken");
//   const FetchingData = async () => {
//     await axios
//       .get("http://localhost:5000/api/getAll", {
//         headers: { Authorization: `Bearer ${userToken}` },
//       })
//       .then((response) => {
//         console.log();

//         setAllData(response.data);
//       });
//   };
//   useEffect(() => {
//     FetchingData();
//     expireFetch()
//   }, []);


// const expireFetch=async()=>{



//  const response=await axios
//       .get("http://localhost:5000/api/getAll", {
//         headers: { Authorization: `Bearer ${userToken}` },
//       })
  

//      const today = new Date();
// const nonExpired = response.data.filter((item) => {
//   const expiryDate = new Date(item.ProductExpiry);
//   return expiryDate >= today; // ✅ Non-expired (valid) products
// });

     
// const expired = response.data.filter((item) => {
//   const expiryDate = new Date(item.ProductExpiry);
//   return expiryDate < today; // ✅ Non-expired (valid) products
// });
// setDateAypoindhi(expired)




//       setExpiredProducts(nonExpired);





// }
//   console.log(expiredProducts,"pydytdydjy");
  






//   //category filteration
//   console.log(category, "category");


//   const filteredData = expiredProducts.filter(
//     (p) =>
//       (category === "All" || p.productCategory === category) &&
//       p.productname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   console.log(AllData, "ALLDATA");
//   const increase = async (item, e) => {
//     e.stopPropagation();

//     // Safely calculate new count

//     setCount(+1); // Update local state

//     const itemQuant = item.productQuantity;

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/update/${item._id}`,
//         {
//           counter: count,
//           quantity: itemQuant + 1,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log("Updated successfully:", response.data);
//       FetchingData();
//     } catch (err) {
//       console.error("Error updating:", err);
//     }
  
//   };

//   const decrease = async (item, e) => {
//     e.stopPropagation();
//     const price = item.productSellingPrice;
//     const name = item.productname;
//     setDecrease(-1);

//     // console.log(count);
//     // console.log(item);
//     // console.log(decreaseCount);

//     const currValue = item.productQuantity;
//     // console.log(currValue,"value");

//     const response = await axios
//       .put(
//         `http://localhost:5000/api/updateDec/${item._id}`,
//         { counter: decreaseCount },
//         { headers: { "Content-Type": "application/json" } }
//       )
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//     console.log(response);
//     FetchingData();

  
//     console.log(res);
//     const responsees = axios.post(
//       "http://localhost:5000/api/additionaldata",
//       AllData,
//       { headers: { Authorization: `Bearer ${userToken}` } }
//     );
//     console.log(responsees);
//   };
//   const Delete = async (item, e) => {
//     e.stopPropagation();

//     console.log(item._id);
//     const confirmation = confirm("are you sure to delete product");
//     if (confirmation) {
//       const response = await axios
//         .delete(`http://localhost:5000/api/delete/${item._id}`)
//         .then((res) => FetchingData())
//         .catch((err) => console.log(err));
//     } else {
//       alert("you cancleed your delete");
//     }

//     console.log(response);
//   };

//   const AllDetails = async (item, e) => {
//     e.stopPropagation();

//     console.log(item._id, "shgduse");

//     //  const goToDetails = (item) => {

//     // };
//     const response = await axios
//       .get(`http://localhost:5000/api/MoreDetails/${item._id}`)
//       .then((res) => setDetails(res.data));
//     console.log(response, "sijhijs9");
//     console.log(Details);
//     Navigate(`/MoreDetails/${item._id}`);

//     // console.log(AllData,"this is all data");
//     console.log(AllData, "data filtered");
//   };


  
//   return (
//     <div>
//       <Hero></Hero>

//       <div className="mt-30 mb-30">
//         <BestSellers></BestSellers>
//         {/* <ExpiredProducts></ExpiredProducts> */}
//       </div>

//       <div className="p-4 ">
//         <div className="mb-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
//           {/* Category Select */}
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Choose Category</option>
//             <option>All</option>
//             <option>Biscuits</option>
//             <option>Stationery</option>
//             <option>Cosmetics</option>
//             <option>Snacks & Chips</option>
//             <option>Chocolates</option>
//             <option>Bathroom Essentials</option>
//             <option>Edible Oils</option>
//             <option>Others</option>
//           </select>

//           {/* Search Bar */}
//           <input
//             type="text"
//             placeholder="🔍 Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         <h1 className="text-2xl font-bold text-center mb-6">
//           Available Products
//         </h1>

//         <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-20">
//           {filteredData.length > 0 ? (
//             <>
//             {dateAypoindhi.map((x) => {
//   const isExpired = new Date(x.ProductExpiry) < new Date();

//   return (
//     <div
//       key={x._id}
//       className={`flex items-center h-20 gap-4 p-4 mb-3 rounded-xl shadow-md border ${
//         isExpired ? "opacity-50 bg-gray-100" : "bg-white"
//       }`}
//     >
//       {/* Product Image */}
//       <img
//         src={x.base64 || "https://via.placeholder.com/100"}
//         alt={x.productname}
//         className="w-24 h-24 object-cover rounded-lg"
//       />

//       {/* Product Details */}
//       <div >
//         <h2
//           className={`text-xl font-semibold ${
//             isExpired ? "text-gray-500" : "text-black"
//           }`}
//         >
//           {x.productname}
//         </h2>
//         <p
//           className={`text-md ${
//             isExpired ? "text-gray-400" : "text-gray-700"
//           }`}
//         >
//           Price: ₹{x.productActualPrice}
//         </p>
//         <p
//           className={`text-sm ${
//             isExpired ? "text-red-500" : "text-green-600"
//           }`}
//         >
//           Expired: {new Date(x.ProductExpiry).toLocaleDateString()}
//         </p>
//       </div>
//     </div>
//   );
// })}


//               {filteredData.map((item) => (
//                 <div
//                   onClick={(e) => AllDetails(item, e)}
//                   key={item._id}
//                   className="bg-white border-1 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
//                 >
//                   {/* Product Image */}
//                   <img
//                     src={item.base64}
//                     alt={item.productname}
//                     className="h-32 sm:h-40 md:h-48 w-full object-cover border-1 rounded"
//                   />

//                   {/* Product Info */}
//                   <div className="p-2 sm:p-3 md:p-4">
//                     <h2 className="text-sm sm:text-base md:text-lg font-semibold">
//                       {item.productname}
//                     </h2>
//                     <p className="text-[10px] sm:text-xs md:text-sm text-black">
//                       {item.productCategory}
//                     </p>

//                     <p className="text-xs sm:text-sm text-gray-700 mt-1">
//                       Expiry:{" "}
//                       <span className="font-bold text-blue-800">
//                         {item.ProductExpiry}
//                       </span>
//                     </p>

//                     <div className="mt-2 flex justify-between items-center text-[10px] sm:text-sm">
//                       <span className="text-green-600 font-bold">
//                         SellingPrice: {item.productSellingPrice}
//                       </span>
//                       <span className="text-red-500 font-bold">
//                         ActualPrice: {item.productActualPrice}
//                       </span>
//                       <span className="text-red-500 font-bold">
                        
//                         {/* Actual qty: {item.inpValue} */}
//                         {/* {const}
//                         {localStorage.setItem("inpValue",JSON.stringify([filteredData]))} */}
//                       </span>
//                     </div>

//                     <SalesPage data={item}></SalesPage>
//                     <div className="hidden">
//                       <OurStore items={item}></OurStore>
                    
                      
//                     </div>

//                     <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
//                       <button
//                         onClick={(e) => decrease(item, e)}
//                         className="bg-blue-600 hover:bg-yellow-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded"
//                       >
//                         -
//                       </button>
//                       <span className="font-bold text-xs sm:text-sm flex items-center">
//                         {item.productQuantity}
//                       </span>
//                       <button
//                         onClick={(e) => increase(item, e)}
//                         className="bg-green-600 hover:bg-red-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded"
//                       >
//                         +
//                       </button>
//                       <button
//                         onClick={(e) => Delete(item, e)}
//                         className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded ml-auto"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <MoreDetails productData={Details}></MoreDetails>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <>no products found</>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MoreDetails from "../Components/MoreDetails";
// import BestSellers from "./BestSellers";
// import SalesPage from "../Components/SalesPage";
// import { useNavigate } from "react-router-dom";
// import OurStore from "./OurStore";
// import Hero from "../Components/Hero";

// const About = () => {
//   const Navigate = useNavigate();
//   const [allProducts, setAllProducts] = useState([]);
//   const [details, setDetails] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("All");

//   const data = JSON.parse(localStorage.getItem("userToken"));
//   const userToken = data?.token;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/getAll", {
//         headers: { Authorization: `Bearer ${userToken}` },
//       });

//       const today = new Date();
//       const updated = data.map((item) => ({
//         ...item,
//         isExpired: new Date(item.ProductExpiry) < today,
//       }));

//       setAllProducts(updated);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   const handleIncrease = async (item, e) => {
//     e.stopPropagation();
//     try {
//       await axios.put(
//         `http://localhost:5000/api/update/${item._id}`,
//         {
//           counter: 1,
//           quantity: item.productQuantity + 1,
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       fetchProducts();
//     } catch (err) {
//       console.error("Error increasing:", err);
//     }
//   };

//   const handleDecrease = async (item, e) => {
//     e.stopPropagation();
//     try {
//       await axios.put(
//         `http://localhost:5000/api/updateDec/${item._id}`,
//         { counter: -1 },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       fetchProducts();
//     } catch (err) {
//       console.error("Error decreasing:", err);
//     }
//   };

//   const handleDelete = async (item, e) => {
//     e.stopPropagation();
//     if (confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/delete/${item._id}`);
//         fetchProducts();
//       } catch (err) {
//         console.error("Error deleting:", err);
//       }
//     }
//   };

//   const handleDetails = async (item, e) => {
//     e.stopPropagation();
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/api/MoreDetails/${item._id}`
//       );
//       setDetails(data);
//       Navigate(`/MoreDetails/${item._id}`);
//     } catch (err) {
//       console.error("Error fetching details:", err);
//     }
//   };

//   // 🔎 Filter by category & search
//   const filteredProducts = allProducts.filter(
//     (p) =>
//       (category === "All" || p.productCategory === category) &&
//       p.productname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Hero />

//       <div className="mt-30 mb-30">
//         <BestSellers />
//       </div>

//       <div className="p-4 ">
//         {/* Search + Category */}
//         <div className="mb-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
//           >
//             <option value="All">All</option>
//             <option>Biscuits</option>
//             <option>Stationery</option>
//             <option>Cosmetics</option>
//             <option>Snacks & Chips</option>
//             <option>Chocolates</option>
//             <option>Bathroom Essentials</option>
//             <option>Edible Oils</option>
//             <option>Others</option>
//           </select>

//           <input
//             type="text"
//             placeholder="🔍 Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//           />
//         </div>

//         <h1 className="text-2xl font-bold text-center mb-6">
//           Available Products
//         </h1>

//         {/* Product Grid */}
//         <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-20">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((item) => (
//               <div
//                 key={item._id}
//                 onClick={(e) => handleDetails(item, e)}
//                 className={`flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
//                   item.isExpired ? "opacity-50 bg-gray-100" : ""
//                 }`}
//               >
//                 <img
//                   src={item.base64 || "https://via.placeholder.com/150"}
//                   alt={item.productname}
//                   className="h-32 sm:h-40 md:h-48 w-full object-cover"
//                 />

//                 <div className="p-2 sm:p-3 md:p-4">
//                   <h2
//                     className={`font-semibold ${
//                       item.isExpired ? "text-gray-500" : "text-black"
//                     }`}
//                   >
//                     {item.productname}
//                   </h2>
//                   <p className="text-xs text-gray-600">{item.productCategory}</p>
//                   <p className="text-xs">
//                     Expiry:{" "}
//                     <span
//                       className={`font-bold ${
//                         item.isExpired ? "text-red-500" : "text-green-600"
//                       }`}
//                     >
//                       {new Date(item.ProductExpiry).toLocaleDateString()}
//                     </span>
//                   </p>

//                   <div className="mt-2 flex justify-between text-xs">
//                     <span className="text-green-600 font-bold">
//                       Selling: ₹{item.productSellingPrice}
//                     </span>
//                     <span className="text-red-500 font-bold">
//                       MRP: ₹{item.productActualPrice}
//                     </span>
//                   </div>

//                   {/* Actions */}
//                   <SalesPage data={item} />
//                   {/* <OurStore items={item} className="hidden" /> */}

//                   <div className="flex gap-2 mt-3">
//                     <button
//                       onClick={(e) => handleDecrease(item, e)}
//                       className="bg-blue-600 text-white px-2 rounded"
//                     >
//                       -
//                     </button>
//                     <span>{item.productQuantity}</span>
//                     <button
//                       onClick={(e) => handleIncrease(item, e)}
//                       className="bg-green-600 text-white px-2 rounded"
//                     >
//                       +
//                     </button>
//                     <button
//                       onClick={(e) => handleDelete(item, e)}
//                       className="bg-red-600 text-white px-2 rounded ml-auto"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React, { useEffect, useState } from "react";
import axios from "axios";
import MoreDetails from "../Components/MoreDetails";
import BestSellers from "./BestSellers";
import SalesPage from "../Components/SalesPage";
import { useNavigate } from "react-router-dom";
import OurStore from "./OurStore";
import Hero from "../Components/Hero";

const About = () => {
  const Navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [details, setDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const data = JSON.parse(localStorage.getItem("userToken"));
  const userToken = data?.token;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/getAll", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const today = new Date();
      const updated = data.map((item) => ({
        ...item,
        isExpired: new Date(item.ProductExpiry) < today,
      }));

      setAllProducts(updated);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleIncrease = async (item, e) => {
    e.stopPropagation();
    if (item.isExpired) return; // disable for expired
    try {
      await axios.put(
        `http://localhost:5000/api/update/${item._id}`,
        {
          counter: 1,
          quantity: item.productQuantity + 1,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      fetchProducts();
    } catch (err) {
      console.error("Error increasing:", err);
    }
  };

  const handleDecrease = async (item, e) => {
    e.stopPropagation();
    if (item.isExpired) return; // disable for expired
    try {
      await axios.put(
        `http://localhost:5000/api/updateDec/${item._id}`,
        { counter: -1 },
        { headers: { "Content-Type": "application/json" } }
      );
      fetchProducts();
await axios.post(
        "http://localhost:5000/api/printdetails",
        {
          pName: item.productname,
          quantity: item.productQuantity,
          selling: item.productSellingPrice,
          // Always 1 per click
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
    } catch (err) {
      console.error("Error decreasing:", err);
    }
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/delete/${item._id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  const handleDetails = async (item, e) => {
    e.stopPropagation();
    if (item.isExpired) return; // disable for expired
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/MoreDetails/${item._id}`
      );
      setDetails(data);
      Navigate(`/MoreDetails/${item._id}`);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  // 🔎 Filter by category & search
  const filteredProducts = allProducts.filter(
    (p) =>
      (category === "All" || p.productCategory === category) &&
      p.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Hero />

      <div className="mt-30 mb-30">
        <BestSellers />
      </div>

      <div className="p-4 ">
        {/* Search + Category */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="All">All</option>
            <option>Biscuits</option>
            <option>Stationery</option>
            <option>Cosmetics</option>
            <option>Snacks & Chips</option>
            <option>Chocolates</option>
            <option>Bathroom Essentials</option>
            <option>Edible Oils</option>
            <option>Others</option>
          </select>

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Available Products
        </h1>

        {/* Product Grid */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div
                key={item._id}
                onClick={(e) => handleDetails(item, e)}
                className={`flex flex-col rounded-xl shadow-md overflow-hidden transition-shadow ${
                  item.isExpired
                    ? "opacity-60 bg-gray-400 cursor-not-allowed"
                    : "bg-white hover:shadow-lg cursor-pointer"
                }`}
              >
                <img
                  src={item.base64 || "https://via.placeholder.com/150"}
                  alt={item.productname}
                  className="h-32 sm:h-40 md:h-48 bg-gray-400 w-full object-cover"
                />

                <div className="p-2 sm:p-3 md:p-4">
                  <h2
                    className={`font-semibold ${
                      item.isExpired ? "text-gray-500" : "text-black"
                    }`}
                  >
                    {item.productname}
                  </h2>
                  <p className="text-xs text-gray-600">{item.productCategory}</p>
                  <p className="text-xs">
                    {/* Expiry:{" "} */}
                    {/* <span
                      className={`font-bold ${
                        item.isExpired ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      {new Date(item.ProductExpiry).toLocaleDateString()}
                    </span> */}
                  </p>

                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-green-600 font-bold">
                      Selling: ₹{item.productSellingPrice}
                    </span>
                    {/* <span className="text-red-500 font-bold">
                      MRP: ₹{item.productActualPrice}
                    </span> */}
                  </div>

                  {/* Actions */}
                  {!item.isExpired && <SalesPage data={item} />}
                  {/* <OurStore items={item} className="hidden" /> */}

                  <div className="flex gap-2 mt-3">
                    <div className="flex gap-2 mt-3 items-center">
  <button
    onClick={(e) => handleDecrease(item, e)}
    disabled={item.isExpired}
    className={`text-sm sm:text-base md:text-lg 
      px-2 sm:px-4 md:px-6 
      py-1 sm:py-2 md:py-3 
      rounded font-bold
      ${
        item.isExpired
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 text-white"
      }`}
  >
    -
  </button>

  <span className="text-sm sm:text-base md:text-lg font-bold">
    {item.productQuantity}
  </span>

  <button
    onClick={(e) => handleIncrease(item, e)}
    disabled={item.isExpired}
    className={`text-sm sm:text-base md:text-lg 
      px-2 sm:px-4 md:px-6 
      py-1 sm:py-2 md:py-3 
      rounded font-bold
      ${
        item.isExpired
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 text-white"
      }`}
  >
    +
  </button>

  <button
    onClick={(e) => handleDelete(item, e)}
    className="ml-3 bg-red-500 text-white 
      text-xs sm:text-sm md:text-base 
      px-2 sm:px-3 md:px-4 
      py-1 sm:py-1.5 md:py-2 
      rounded"
  >
    Delete
  </button>
</div>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
