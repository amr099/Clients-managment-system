import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "firebase-config";
import CustomTable from "components/CustomTable";

export default function TransactionsTable() {
    const [name, setName] = useState();
    const [transactions, setTransactions] = useState();

    useEffect(() => {
        const getTransactions = async () => {
            await onSnapshot(doc(db, "Clients", name), (doc) => {
                let sortedTransactions = doc
                    .data()
                    ?.transaction.sort((a, b) => {
                        let dateA = a.date.split("/");
                        let dateB = b.date.split("/");
                        dateA = new Date(`${dateA[1]}/${dateA[0]}/${dateA[2]}`);
                        dateB = new Date(`${dateB[1]}/${dateB[0]}/${dateB[2]}`);

                        return dateA - dateB;
                    });
                setTransactions(sortedTransactions);
            });
        };
        getTransactions();
    }, [name]);

    return <CustomTable transactions={transactions} setName={setName} />;
}
