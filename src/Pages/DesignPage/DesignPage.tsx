import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { formatLargeNonMonetaryNumber } from '../../Helpers/NumberFormatting';
import { testIncomeStatementData } from '../../Components/Table/testData';
import IncomeStatement from '../../Components/IncomeStatement/IncomeStatement';

interface Props {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) =>
      formatLargeNonMonetaryNumber(company.marketCapTTM),
    subTitle: "Total value of all a company's shares of stock",
  },

];

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark Design Page</h1>
      <h2>This FinShark's design page. This is where we'll showcase the design aspects of the app</h2>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <Table data={testIncomeStatementData} config={tableConfig} />
    </>
  )
}

export default DesignPage