import { useLocation, useNavigate } from "react-router-dom";
import ViewPaymentHistory from "./ViewPaymentHistory";
import TenantPayment from "./TenantPayment";
import './tenant.css';

export default function ViewAllTenantInfo() {
    let today = new Date();
    let today_string = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    let getMonth = (num) => {
        switch(num) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return "January";
        }
    }

    let location = useLocation();
    let tenant = location.state.tenant;

    let curr_charges = [];
    let fut_charges = [];
    for(let i = 0; i < 3; i++) {
        let charge = {
            date: '12/' + i + '/2023',
            balance : tenant.balance + 10,
            description : "Description1",
            amount : (1.0 + i),
            status: 'UNPAID'
        }
        curr_charges.push(charge);

        let charge2 = {
            date: '12/' + (i+20) + '/2023',
            balance : tenant.balance + 10,
            description : "Description2",
            amount : (1.0 + i)
        }
        fut_charges.push(charge2);
    }

    let navigate = useNavigate();
    let goToHistory = (e) => {
        e.preventDefault();
        navigate("/tenant/paymentHistory", {state : {tenant}});
    }
    let newPayment = (e) => {
        e.preventDefault();
        navigate("/tenant/newPayment", {state : {tenant}});
    }
    let curr_total = 0;
    let fut_total = 0;
    
    return(
        <>
        <div id="dashboard">
        <div id="info">
            <div id="contact-card">
                <h3>Personal Information</h3>
                <p>Address Line 1, Unit #</p>
                <p>Address Line 2</p>
                <br/>
                <p>EMAIL: {tenant.email}</p>
                <p>PHONE: {tenant.phone}</p>
            </div>
            <div id="balance-summary">
                <h3>{getMonth(today.getMonth())} Balance Summary</h3>
                <table>
                    {
                        curr_charges.map((charge) => {
                            return (
                                <tr>
                                    <td id="left-data">{charge.description}</td>
                                    <td id="right-data">${charge.amount}</td>
                                </tr>
                            )
                        })
                    }
                </table>
                <button onClick={newPayment}>Pay Remaining Balance</button>
            </div>
        </div>

        <div id="payment">
            <div id="top-right-head">
            <h2>Welcome, {tenant.firstName}!</h2>
            <div id="balance">
                <h3>CURRENT BALANCE: ${tenant.balance}</h3>
                <p>&nbsp;(as of: {today_string})</p>
            </div>
            </div>
            <br/>
            <div id="table-head">
                <h3>Current Charges</h3>
                <button onClick={newPayment}>Pay Now</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        curr_charges.map((charge) => {
                            return (
                                <tr>
                                    <td>{charge.date}</td>
                                    <td>{charge.amount}</td>
                                    <td>{charge.description}</td>
                                    <td>{charge.balance}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div id="table-head">
                <h3>Payment History</h3>
                <button onClick={goToHistory}>View All</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fut_charges.map((charge) => {
                            return (
                                <tr>
                                    <td>{charge.date}</td>
                                    <td>{charge.amount}</td>
                                    <td>{charge.description}</td>
                                    <td>{charge.balance}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </div>
        </>
    )
}