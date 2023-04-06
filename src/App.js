import './App.css';
import { useEffect, useState } from 'react';
import supabase from './DataBase/SupabaseClient';

function App() {
  const [fetchError , setFetchError] = useState(null);
  const [fetchData , setFetchData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('test')
          .select('*')
        if (error) {
          setFetchError(error);
          setFetchData(null);
          console.log(error);
        } else {
          setFetchData(data);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError(error);
      }
    };

    fetchData();

  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h1>Supabase React App</h1>
          {fetchError && <p>{fetchError.message}</p>}
          {fetchData && fetchData.map((data) => (
            <p key={data.id}>{data.test_name}</p>
          ))}
        </p>
      </header>
    </div>
  );
}

export default App;
