import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { DefaultLayout } from './layout';



import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectSearchedItems } from '@/redux/crud/selectors';


function formatDate(date : Date) {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return `${year}-${month}-${day}`;
}

const lastWeek = formatDate(new Date(new Date().setDate(new Date().getDate() - 7)));

function App() {

  const dispatch = useDispatch();
  const [state, setState] = useState("");

  async function getGithubRepo() {
    const response = await fetch(`https://api.github.com/search/repositories?q=created:%3E${lastWeek}&sort=stars&order=desc`);
    const data = await response.json();
   setState(data);
  }



  const { result: searchResult, isLoading } = useSelector(selectSearchedItems);
  console.log("🚀 ~ file: App.tsx ~ line 38 ~ App ~ searchResult", searchResult);
  
  useEffect( () => {
     dispatch(crud.search({ entity: "repositories", options: {q : `created:%3E${lastWeek}` ,sort:"stars" }}));
     getGithubRepo();
      
  }, []);

  useEffect( () => {console.log("🚀 ~ file: App.tsx ~ line 9 ~ App ~ state", state)},[state])
  

  return (
    <DefaultLayout>
    
      
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      
    
    </DefaultLayout>
  );
}

export default App;
