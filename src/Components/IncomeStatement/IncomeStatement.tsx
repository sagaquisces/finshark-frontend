import { useEffect, useState } from 'react'
import { CompanyIncomeStatement } from '../../company';
import { formatLargeMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting';
import { useOutletContext } from 'react-router-dom';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';

interface Props {}

const config = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.netIncomeRatio),
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.epsdiluted),
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.grossProfitRatio),
  },
  {
    label: "Opearting Income Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.operatingIncomeRatio),
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.incomeBeforeTaxRatio),
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IncomeStatement = (_props: Props) => {
  const ticker = useOutletContext<string>()
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>()
  useEffect(() => {
    const incomeStatementFetch = async () => {
      const result = await getIncomeStatement(ticker)
      setIncomeStatement(result!.data)
    }
    incomeStatementFetch()
  }, [])
  return (
    <>
      {incomeStatement ? (
        <Table config={config} data={incomeStatement} />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default IncomeStatement