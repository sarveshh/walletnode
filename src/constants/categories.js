import { MdPets, MdGamepad, MdMoneyOff } from 'react-icons/md';
import { FaAward, FaShoppingCart, FaCar } from 'react-icons/fa'
import { IoGiftSharp, IoBusiness as BusinessIcon, IoFastFood } from 'react-icons/io5'
import { GiTakeMyMoney, GiMoneyStack, GiHouse, GiRoad, GiClothes } from 'react-icons/gi'
import { FcSmartphoneTablet, FcHome, FcBullish, FcLibrary, FcMultipleInputs } from 'react-icons/fc'
import { IconContext } from 'react-icons/lib';

const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d', '#00ff9d'];
const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];

export const incomeCategories = [
    {
        type: 'Business', amount: 0, color: incomeColors[0],
        icon:
            <IconContext.Provider value={{ color: "orange", style: { width: "35px", height: "35px", marginRight: "8px" } }} >
                <BusinessIcon />
            </IconContext.Provider>
    },
    {
        type: 'Interest Money', amount: 0, color: incomeColors[1],
        icon: <FcLibrary />
    },
    {
        type: 'Award', amount: 0, color: incomeColors[2],
        icon:
            <IconContext.Provider value={{ color: " #ff6600", style: { width: "35px", height: "35px", marginRight: "8px" } }} >
                <FaAward />
            </IconContext.Provider>
    },
    {
        type: 'Gifts', amount: 0, color: incomeColors[3],
        icon:
            <IconContext.Provider value={{ color: "rgb(139, 195, 74)", style: { width: "35px", height: "35px", marginRight: "8px" } }} >
                <IoGiftSharp />
            </IconContext.Provider>
    },
    { type: 'Salary', amount: 0, color: incomeColors[4], icon: <GiTakeMyMoney /> },
    { type: 'Savings', amount: 0, color: incomeColors[5], icon: <FcBullish /> },
    { type: 'Rental', amount: 0, color: incomeColors[6], icon: <FcHome /> },
    { type: 'Lottery', amount: 0, color: incomeColors[7], icon: <GiMoneyStack /> },
    { type: 'Others', amount: 0, color: incomeColors[8], icon: <FcMultipleInputs /> },
];

export const expenseCategories = [
    { type: 'Bills', amount: 0, color: expenseColors[0], icon: <MdMoneyOff /> },
    { type: 'Car', amount: 0, color: expenseColors[1], icon: <FaCar /> },
    {
        type: 'Clothes', amount: 0, color: expenseColors[2],
        icon:
            <IconContext.Provider value={{ color: "#3366ff", style: { width: "35px", height: "35px", marginRight: "8px" } }} >
                <GiClothes />
            </IconContext.Provider>
    },
    { type: 'Travel', amount: 0, color: expenseColors[3], icon: <GiRoad /> },
    {
        type: 'Food', amount: 0, color: expenseColors[4],
        icon:
            <IconContext.Provider value={{ color: "#d4af37", style: { width: "35px", height: "35px", marginRight: "8px" } }} >
                <IoFastFood />
            </IconContext.Provider>
    },
    {
        type: 'Shopping', amount: 0, color: expenseColors[5],
        icon:
            <IconContext.Provider value={{ color: "#ace600", style: { width: "35px", height: "35px", marginRight: "8px" } }} >
                <FaShoppingCart />
            </IconContext.Provider>
    },
    { type: 'House', amount: 0, color: expenseColors[6], icon: <GiHouse /> },
    {
        type: 'Entertainment', amount: 0, color: expenseColors[7],
        icon:
            <IconContext.Provider value={{ color: "#ff3300", style: { width: "35px", height: "35px", marginRight: "8px" } }} >
                <MdGamepad />
            </IconContext.Provider>
    },
    { type: 'Phone', amount: 0, color: expenseColors[8], icon: <FcSmartphoneTablet /> },
     { type: 'Pets', amount: 0, color: expenseColors[9], icon: <MdPets /> },
    // { type: 'Others', amount: 0, color: expenseColors[10], icon: <FcMultipleInputs /> },
    { type: 'Savings', amount: 0, color: expenseColors[10], icon: <FcMultipleInputs /> },
];

export const resetCategories = () => {
    incomeCategories.forEach((c) => c.amount = 0);
    expenseCategories.forEach((c) => c.amount = 0);
};