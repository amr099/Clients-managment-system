import React, { useContext, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { FirebaseContext } from "context/FirebaseContext";
import { db } from "firebase-config";

export default function CustomTable({
    setName,
    transactions,
    expenses,
    revenues,
}) {
    const { clients } = useContext(FirebaseContext);
    const [clientData, setClientData] = useState();
    let finalAmount = 0;

    const onChange = async (name) => {
        await onSnapshot(doc(db, "Clients", name), (doc) => {
            setName(name);
            setClientData(doc.data());
        });
    };

    return (
        <div className='d-flex flex-column col mx-auto w-75 pt-4 custom-table'>
            <select
                onChange={(e) => onChange(e.target.value)}
                class='form-select'
            >
                <option disabled selected>
                    Select Client
                </option>
                {clients?.map((c) => (
                    <option value={c.name}>{c.name}</option>
                ))}
            </select>
            <table class='table table-dark mt-4'>
                <thead>
                    <tr>
                        <th scope='col'>Code</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Reg. Code</th>
                        <th scope='col'>Mobile</th>
                        <th scope='col'>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        <tr>
                            <td>{clientData?.code}</td>
                            <td>{clientData?.name}</td>
                            <td>{clientData?.reg}</td>
                            <td>{clientData?.phone}</td>
                            <td>{clientData?.address}</td>
                        </tr>
                    </>
                </tbody>
            </table>
            {transactions && (
                <table class='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>Date</th>
                            <th scope='col'>Service</th>
                            <th scope='col'>Cost</th>
                            <th scope='col'>Payment</th>
                            <th scope='col'>Balance</th>
                            <th scope='col'>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((t) => (
                            <tr>
                                <td>{t.date}</td>
                                <td>{t.service}</td>
                                <td>{t.cost}</td>
                                <td>{t.payment}</td>
                                <td>{(finalAmount += t.amount)}</td>
                                <td>{t.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {revenues && (
                <table class='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>Revenues</th>
                            <th scope='col'>Expenses</th>
                            <th scope='col'>Gross Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{revenues}</td>
                            <td>{expenses}</td>
                            <td>{revenues - expenses}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
