


export const handleCategoryService = () => {

    const getAllCategories = async () => {

       const listCategories =  await fetch('/categories')
        
       if(  listCategories !== undefined && listCategories !== null){
           return listCategories;
       }
        return [];
    }; 


    return {
        getAllCategories
    }
};