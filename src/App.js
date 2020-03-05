import React, {useState, useEffect} from 'react';

const useApi = (initialData) => {
  const [data, setData] = useState(initialData);
  const url = 'http://data.fixer.io/api/latest?access_key=fe3a9b3f9ac173a3e51d8ea22951cf95';
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await fetch(url);
        const data = await result.json();
        console.log("json data: ", data);
        setData(data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return {data, isLoading, isError};
}

function App() {
  const {data, isLoading, isError} = useApi();
  const rates = data ? data.rates : {};
  const head = (
    <thead>
      <tr>
        <th style={{padding: 15}}>
          Key
        </th>
        <th style={{padding: 15}}>
          Original Currency
        </th>
        <th style={{padding: 15}}>
          Currency added by 10.002
        </th>
      </tr>
    </thead>
  );
  const rows = isLoading || isError ? 
    (
      <tbody>
        <tr>
          <td style={{padding: 15}}>{isLoading ? 'Loading...' : 'API Error...'}</td>
          <td style={{padding: 15}}>{isLoading ? 'Loading...' : 'API Error...'}</td>
          <td style={{padding: 15}}>{isLoading ? 'Loading...' : 'API Error...'}</td>
        </tr>
      </tbody>
    ) : Object.keys(rates).map(key => {
    const temp = rates[key] + 10.0002;
    return (
      <tbody key={key}>
        <tr>
          <td style={{padding: 15}}>
            {key}
          </td>
          <td
            style={{
              padding: 15,
              border: rates[key] % 2 === 0 || key === 'HKD' ?
                '5px solid red' : ''
            }}
          >
            {rates[key]}
          </td>
          <td
            style={{
              padding: 15,
              border: rates[key] % 2.0 === 0 || key === 'HKD' ?
                '5px solid red' : ''
            }}
          >
            {temp}
          </td>
        </tr>
      </tbody>
    );
  });
  const table = (
    <table>
      {head}
      {rows}
    </table>
  );

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {table}
    </div>
  );
}

export default App;
