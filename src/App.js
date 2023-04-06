import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vussefkqdtgdosoytjch.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1c3NlZmtxZHRnZG9zb3l0amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2MTIxNTgsImV4cCI6MTk5NjE4ODE1OH0.Df2aXRl0D-XsGkkoJMgGomnu7NnI165udUEmiicXUyg'
const supabase = createClient(supabaseUrl, supabaseKey)


function App() {
  
  const [data, setData] = useState([])

  async function fetchData() {
    const { data: testTableData, error } = await supabase
      .from('test')
      .select('*')
    if (error) {
      console.log('error', error)
    }
    else {
      setData(testTableData)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  console.log(data)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          
        </p>
      </header>
    </div>
  );
}

export default App;
