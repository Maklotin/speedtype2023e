import React from "react";
import './App.css'
import { db } from '../backend/firebase-config'
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

const FaqSide = () => {
    
    return (
        <>
            <div id="FAQside">
                <h1>Frequently Asked Question</h1>
                <ul id="spoersmaal">
                    <li>
                        <h3>Hvordan kan jeg slette brukeren min?</h3>
                        <p>Du kan sende mail til: mikkel.huth.a@gmail.com med brukernavn og bruker ID. Din bruker ID er </p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FaqSide;