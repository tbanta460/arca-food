const generateUniqueCartId = () =>  {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
    const uniqueRandomNumber = (timestamp + randomPart).slice(0, 20);
    
    return uniqueRandomNumber;
}

export default generateUniqueCartId