import React, { useState, useEffect } from "react";
import CustomTable from "components/CustomTable";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "firebase-config";

export default function RevenuesTable() {
    const [name, setName] = useState();
    const [revenues, setRevenue] = useState();
    const [expenses, setExpenses] = useState();

    useEffect(() => {
        const getRevenues = async () => {
            await onSnapshot(doc(db, "Clients", name), (doc) => {
                setRevenue(0);
                let r = 0;
                doc.data().transaction?.map((t) => (r += Number(t.payment)));
                setRevenue(r);
            });

            await onSnapshot(doc(db, "Expenses", name), (doc) => {
                setExpenses(0);
                let e = 0;
                doc.data().transaction?.map((t) => (e += Number(t.cost)));
                setExpenses(e);
            });
        };
        getRevenues();
    }, [name]);

    return (
        <CustomTable
            setName={setName}
            revenues={revenues}
            expenses={expenses}
        />
    );
}
