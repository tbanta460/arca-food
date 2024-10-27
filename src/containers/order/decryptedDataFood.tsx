import React from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { secretCookie, secretKey } from "./modals/ModalDetailFood";
const decryptedDataFood = () => {
    const dataFood = localStorage.getItem(secretCookie);
    const bytes = CryptoJS.AES.decrypt(dataFood ?? "", secretKey);

    const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);

    const decryptedObject = (decryptedStr === "" || decryptedStr === undefined || decryptedStr === null) ? null : JSON?.parse(decryptedStr) ?? null;
    return decryptedObject;
}

export default decryptedDataFood