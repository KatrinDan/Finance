import { FaUtensils, 
         FaPlane, 
         FaMoneyBillWave, 
         FaBus,
         FaShoppingBag, 
         FaGift,
         FaEllipsisH } from "react-icons/fa";

export const categories = [
    {value:"Food",label:"Food",icon:FaUtensils},

    {value:"Travel", label: "Travel",icon:FaPlane},

    {value:"Salary", label:"Salary",icon:FaMoneyBillWave},

    {value:"Transport",label:"Transport",icon:FaBus},

    {value:"Shopping",label:"Shopping",icon:FaShoppingBag},

    {value:"Bonus",label:"Bonus",icon:FaGift},

    {value:"Other",label:"Other",icon:FaEllipsisH}
]

export const categoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : FaEllipsisH;
};

export default categories;