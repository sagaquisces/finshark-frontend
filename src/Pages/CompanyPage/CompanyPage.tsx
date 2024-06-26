import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCompanyProfile } from '../../api'
import { CompanyProfile } from '../../company'
import Sidebar from '../../Components/Sidebar/Sidebar'
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard'
import Tile from '../../Components/Tile/Tile'
import Spinner from '../../Components/Spinner/Spinner'

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CompanyPage = (_props: Props) => {
  const { ticker } = useParams()
  const [company, setCompany] = useState<CompanyProfile>()

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!)
      const obj = Object.assign({}, result?.data);
      console.log("obj ", obj[0])
      setCompany(result?.data[0])
    }
    getProfileInit()
  }, [])
  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title={'Company Name'} subTitle={company.companyName} />
            <Tile title={'Price'} subTitle={"$" + company.price.toFixed(2).toString()} />
            <Tile title={'DCF'} subTitle={"$" + company.dcf.toFixed(2).toString()}></Tile>
            <Tile title={'Sector'} subTitle={company.sector} />
            <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </ CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CompanyPage