import React from 'react';
import ReactTable from "react-table";
import moment from 'moment'
import numeral from 'numeral'
import PieChart from 'react-simple-pie-chart';

function Dashboard(props) {
  if(props.reduxStore.dashboardStatus === 'ready'){
    function formatAmount(amount){
      let currencyClass = 'recieved'
      if(amount < 0){
        currencyClass = 'sent'
      }
      return (<span className={currencyClass}>{numeral(amount).format('$0,0.00')}</span>)
    }
    let transactionAmounts = {
      donationsGiven: 0,
      birthdayGifts: 0,
      moneyWasted: 0,
    }
    const totalBalance = props.reduxStore.userTransactions.reduce((total, transaction) => {
      switch (transaction.description) {
        case 'Donation':
          transactionAmounts.donationsGiven += Math.abs(transaction.transAmt)
          break;
        case 'Birthday gift':
          transactionAmounts.birthdayGifts += Math.abs(transaction.transAmt)
          break;
        case 'Fyre Festival tickets':
        case 'Buying bitcoins':
        case 'iPhone X':
          transactionAmounts.moneyWasted += Math.abs(transaction.transAmt)
          break;
        default:
          break;
      }
      return total += transaction.transAmt
    }, 0)
    const pieChartData = Object.keys(transactionAmounts).map((transactionKey) => {
      let color;
      switch (transactionKey) {
        case 'donationsGiven':
          color = '#1414a3'
          break;
        case 'birthdayGifts':
          color = '#14a314'
          break;
        case 'moneyWasted':
          color = '#a31414'
          break;
        default:
          color = '#14a3a3'

      }
      let amount = transactionAmounts[transactionKey]
      return {
        color: color,
        value: Number(amount.toFixed(2)),
      }
    })
    const fullName = `${props.reduxStore.userInfo.first_name} ${props.reduxStore.userInfo.last_name}`
    return (
      <div className="container-fluid dashboard-primary-container">
        <div className="dashboard-balance-container">
          <div className="row">
            <div className="col-md-6 summary-container">
              <h1 className='small-font'>Account Summary</h1>
              <p><span className="text-muted">Name:</span> {fullName}</p>
              <p><span className="text-muted">Email:</span> {props.reduxStore.userInfo.email}</p>
              <p><span className="text-muted">Balance:</span> <span className='money'>{numeral(totalBalance).format('$0,0.00')}</span></p>
            </div>
            <div className="col-md-6 piechart-container">
              <h1 className='small-font'>Special Transactions</h1>
              <ul className="legend">
                  <li><span className="legend-keys donationsGiven"></span> Donations Given <span className='money'>{numeral(transactionAmounts.donationsGiven).format('$0,0.00')}</span></li>
                  <li><span className="legend-keys birthdayGifts"></span> Birthday Gifts <span className='money'>{numeral(transactionAmounts.birthdayGifts).format('$0,0.00')}</span></li>
                  <li><span className="legend-keys moneyWasted"></span> Money Wasted <span className='money'>{numeral(transactionAmounts.moneyWasted).format('$0,0.00')}</span></li>
              </ul>
              <PieChart
                slices={pieChartData}
              />
            </div>
          </div>
        </div>
        <div className="dashboard-table-container">
          {props.reduxStore.userTransactions.length < 1 ? (<h1 className='small-font'>No Results</h1>) : (
            <ReactTable
              data={props.reduxStore.userTransactions}
              columns={[
                {
                  Header: "Date",
                  id: 'transTime',
                  accessor: data => moment(data.transTime).format("M/D, hA")
                },
                {
                  Header: "Amount",
                  id: 'transAmt',
                  accessor: data => formatAmount(data.transAmt)
                },
                {
                  Header: "Description",
                  accessor: 'description',
                },
                {
                  Header: "Recipient",
                  accessor: "transTo"
                },
                {
                  Header: "Sender",
                  accessor: "transFrom"
                },
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          )}
        </div>
      </div>
    );
  } else {
    return null
  }
}

export default Dashboard;
