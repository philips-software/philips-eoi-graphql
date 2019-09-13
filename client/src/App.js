import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from './components/header/Header';
import DisplayTable from './components/displayTableContents/DisplayTable';
import { fetchTableQuery, insertEntryBooksTableQuery, updateEntryBooksTable, deleteEntryBooksTable, booksCountVsGenere, booksCountVsPerson, fetchGraphdataQueries, maxPriceSubcriptionQuery } from './queries/query';
import { filterBooksCountVsGenere, filterPersonsCountVsGenere, filterGraphQueriesData } from './filter/filter';
import { Button } from 'reactstrap'
import play_btn_logo from './assets/images/play-button.svg';
import Chart from './charts/Chart';
import { getRandomColor } from './utility';
import './App.css';
import { generateClient } from './utils/generateClient';

const client = generateClient()

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabledata: [],
      graphsData: [],
      maxPriceBookDatails: {
        title: '',
        price: ''
      }
    }
  }
 
  // Subscription query on maximum price of a book
  // A Book having maximum price identified in books table after modifying table,
  // will trigger event and subscribed here
  maxPriceBookSubcription(){
    client.subscribe({
      query: maxPriceSubcriptionQuery
    }).subscribe((result) => {
       this.setState({...this.state, maxPriceBookDatails: {...result.data.books[0]}})
    },
    (err) => { console.error(err); }
    )
  }

  fetchGraphsData() {
    this.setState({...this.state, graphData : []});
    
    // Number of books per genre
    client
    .query({
      query: booksCountVsGenere,
      fetchPolicy: "no-cache"
    })
    .then(result => {
      const {labels, values } = filterBooksCountVsGenere(result);
      this.setState({...this.state, graphsData: this.state.graphsData.concat({labels, values, xlabel: "Genres", title: "Number of books per Genre"})});
    }).catch(e => console.error(e));

    // Number of books per person
    client
    .query({
      query: booksCountVsPerson,
      fetchPolicy: "no-cache"
    })
    .then(result => {
      const {labels, values } = filterPersonsCountVsGenere(result);
      this.setState({...this.state, graphsData: this.state.graphsData.concat({labels, values, xlabel: "Persons",  title: "Number of books per Person"})});
    }).catch(e => console.error(e));
    
    // Multiple query in single query [Batched query]
    client
      .query({
        query: fetchGraphdataQueries,
        fetchPolicy: 'no-cache'
      })
      .then(result => {
        const filteredResult = filterGraphQueriesData(result);
        this.setState({ ...this.state, graphsData: this.state.graphsData.concat(filteredResult.map((data) => ({ ...data }))) });
      }).catch(e => console.error(e));

  }
  // To display data in Table.
  fetchTableData() {
    client
      .query({
        query: fetchTableQuery,
        fetchPolicy: 'no-cache'
      })
      .then(result => {
        this.setState({ ...this.state, tabledata: result.data.books });
      }).catch(e => console.error(e));
  }
  componentDidMount() {
    this.maxPriceBookSubcription()
    this.fetchTableData();
    this.fetchGraphsData();
  }
  // Trigger on click of Run query button, perform different kind of query/mutation/subscription 
  runQuery() {
    client
      .mutate({
      mutation: deleteEntryBooksTable,  // import different kind of mutation query here written query/query.js [example]: insertEntryBooksTableQuery, updateEntryBooksTable, deleteEntryBooksTable, upsertEntryBooksTable
        fetchPolicy: 'no-cache'
      })
      .then(() => {
        this.setState({ ...this.state, graphsData: [] });
        this.fetchGraphsData(); // After running query, run aggregate queries to load graphs data.
      }).catch(e => console.error(e));
  }

  // serve chartdata as props in required format to Chart component.
  getChartData(graphData) {
    const { labels, values, xlabel } = graphData
    return {
      labels,
      datasets: [
        {
          label: xlabel,
          data: values,
          backgroundColor: labels.map(() => getRandomColor()),
          borderColor: "#212121",
          borderWidth: 1
        }
      ]
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <div className= "max-price-book-details"><b>Tilte: </b>{this.state.maxPriceBookDatails.title}<b>| Price :</b>{this.state.maxPriceBookDatails.price}</div>
          <Button color="warning" className="run-query-btn" onClick={() => { this.runQuery(); }}><img src={play_btn_logo} alt="run-query" /> Run Query</Button>
          {this.state.graphsData.length > 0 ? this.state.graphsData.map((graphData, index) => {
            return <Chart key={index} chartData={this.getChartData(graphData)} text={graphData.title} legendPosition="bottom" type={graphData.type || "bar"} />
          }) : ""}
          <DisplayTable data={this.state.tabledata} />
        </div>
      </ApolloProvider>
    );
  }

}

export default App;
