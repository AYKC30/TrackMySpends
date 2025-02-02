import { BASE_URL } from "../../utils/url";
import axios from 'axios'
import { getUserFromStorage } from './../../utils/getUserFromStorage';


//! Get the token
const token = getUserFromStorage();

//! Add
export const addTransactionAPI = async({ type, category, date, description, amount}) => {
    const response  = await axios.post(`${BASE_URL}/transactions/create`,{
        type,
        category,
        date,
        description,
        amount,
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    //! Return a promise
    return response.data;
};



//! Update
export const updateCategoryAPI = async({name, type, id}) => {
    const response  = await axios.put(`${BASE_URL}/categories/update/${id}`,{
        name,
        type,
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    //! Return a promise
    return response.data;
};

//! delete
export const deleteCategoryAPI = async(id) => {
    const response  = await axios.delete(`${BASE_URL}/categories/delete/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    //! Return a promise
    return response.data;
};

//! Lists
export const listTransactionsAPI = async({category, type, startDate, endDate}) => {
    const response  = await axios.get(`${BASE_URL}/transactions/lists`,{
            params:{category, endDate, startDate, type},
            headers: {
                Authorization: `Bearer ${token}`,
            
        },
    });

    //! Return a promise
    return response.data;
};
