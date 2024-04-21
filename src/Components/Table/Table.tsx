import { v4 as uuidv4 } from 'uuid'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const Table = ({config, data}: Props) => {
  const renderedRows = data.map((company: any) => {
    return (
      <tr key={uuidv4()}>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {config.map((val: any) => {
          return (
            <td 
              className="p-3"
              key={uuidv4()}
            >{val.render(company)}</td>
          )
        })}
      </tr>
    )
  })
  const renderedHeaders = config.map((config: any) => {
    return (
      <th 
        className="p-4 text-left text-xs font-medium text-gray uppercase tracking-wider"
        key={uuidv4()}
      >
        {config.label}
      </th>
    )
  })

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead className="bg-gray-50">
          <tr>
            {renderedHeaders}
          </tr>
        </thead>
        <tbody className="min-w-full divide-y divide-gray-200 m-5">
          {renderedRows}
        </tbody>
      </table>
    </div>
  )
}

export default Table