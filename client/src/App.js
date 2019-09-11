import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Header from './components/header/Header';
import DisplayTable from './components/displayTableContents/DisplayTable';
import { fetchTableQuery, insertEntryTableQuery, booksCountVsGenere, booksCountVsPerson, fetchGraphdataQueries } from './queries/query';
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
      graphsData: [ 
        {labels: [], values: [], xlabel: "Genres", title: "Number of books by Genre"},
        {labels: [], values: [], xlabel: "Persons",  title: "Number of books by Person"}
      ],
    }
  }

  maxPriceBookSubcription(){
    // client.subscribe({
    //   query: maxPriceSuncriptionQuery
    // }).subscribe((result) => {
    //    this.setState({...this.state, maxPriceBookDatails: {...result.data.books[0]}})
    // },
    // (err) => { console.error(err); }
    // )
  }

  fetchGraphsData() {
    this.setState([])
    // client
    // .query({
    //   query: booksCountVsGenere
    // })
    // .then(result => {
    //   const {labels, values } = filterBooksCountVsGenere(result);
    //   this.setState({...this.state, graphsData: this.state.graphsData.concat({labels, values, xlabel: "Genres", title: "Genres V/s Number of books"})});
    // }).catch(e => console.error(e));

    // client
    // .query({
    //   query: booksCountVsPerson
    // })
    // .then(result => {
    //   console.log(result);
    //   const {labels, values } = filterPersonsCountVsGenere(result);
    //   this.setState({...this.state, graphsData: this.state.graphsData.concat({labels, values, xlabel: "Persons",  title: "Persons V/s Number of books"})});
    // }).catch(e => console.error(e));

    // client
    //   .query({
    //     query: fetchGraphdataQueries,
    //     fetchPolicy: 'no-cache'
    //   })
    //   .then(result => {
    //     const filteredResult = filterGraphQueriesData(result);
    //     this.setState({ ...this.state, graphsData: this.state.graphsData.concat(filteredResult.map((data) => ({ ...data }))) });
    //   }).catch(e => console.error(e));

  }
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
    // this.fetchTableData();
    this.fetchGraphsData();
  }
  runQuery() {
    client
      .mutate({
        mutation: insertEntryTableQuery,
        fetchPolicy: 'no-cache'
      })
      .then(() => {
        this.setState({ ...this.state, graphsData: [] });
        this.fetchGraphsData();
      }).catch(e => console.error(e));
  }
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
          <Button color="warning" className="run-query-btn" onClick={() => { this.runQuery(); }}><img src={play_btn_logo} alt="run-query" /> Run Query</Button>
          <DisplayTable data={this.state.tabledata} />
          {this.state.graphsData.length > 0 ? this.state.graphsData.map((graphData, index) => {
            return <Chart key={index} chartData={this.getChartData(graphData)} text={graphData.title} legendPosition="bottom" type={graphData.type || "bar"} />
          }) : ""}
        </div>
      </ApolloProvider>
    );
  }

}

export default App;
