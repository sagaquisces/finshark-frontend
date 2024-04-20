import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import CardList from '../../Components/CardList/CardList';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import { searchCompanies } from '../../api';
import { CompanySearch } from '../../company';
import Search from '../../Components/Search/Search';
import { PortfolioGet } from '../../Models/Portfolio';
import { portfolioDeleteAPI, portfolioGetAPI, portfolioPostAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>('')
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([])
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("")

  useEffect(() => {
    getPortfolio()
  }, [])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e)
  }

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if(res?.data) {
          setPortfolioValues(res?.data)
        }
      }).catch((e) => {
        toast.warning("Could not get portfolio.")
      })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioPostAPI(e.target[0].value)
      .then((res) => {
        if(res?.status === 204) {
          toast.success("Stock added to portfolio!")
          getPortfolio()
        }
      }).catch((e) => {
        toast.warning("Could not add to portfolio.")
      })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPortfolioDelete = (e: any) => {
    e.preventDefault()
    portfolioDeleteAPI(e.target[0].value)
      .then((res) => {
        if(res?.status == 200) {
          toast.success("Stock deleted from portfolio")
          getPortfolio()
        }
      })
  }

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const result = await searchCompanies(search)
    if (typeof result === "string") {
      setServerError(result);
    } else if(Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
    console.log(searchResult)
  }
  return (
    <>
      <Search 
        onSearchSubmit={onSearchSubmit} 
        search={search} 
        handleSearchChange={handleSearchChange} 
      />
      <ListPortfolio 
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList searchResult={searchResult} onPortfolioCreate={onPortfolioCreate} />
      {serverError && <div>Unable to connect to data.</div>}
    </>
  )
}

export default SearchPage