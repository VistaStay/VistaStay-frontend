export const getHotels = async() =>{
    const res = await fetch("http://localhost:8080/api/hotels",{
        method:"GET",
    });
    if(!res.ok){
        throw new Error("Failed to fetch hotels");
    }
    const data = await res.json();
    return data;
};