import React from 'react'
import Link from 'next/link'
import Layout from "../components/Layout";
import { Component } from "react";
import apiService from "../lib/apiService";
import { Col, FormGroup, Label, Input, Card, CardTitle, CardText, CardColumns,
  CardSubtitle } from "reactstrap";
import NumberFormat from 'react-number-format'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux';
import { gobrew } from '../store/index.js';
import { Provider } from 'react-redux';
import { store } from '../store/index.js';
import withRedux from "next-redux-wrapper";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch
// } from "react-router-dom";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "Rhode Island",
      type: "micro",
      brewsList: []
    };
  }
  static async getInitialProps({ req }) {
    const ny = await apiService(`/breweries/search?query=florida`);
    const nj = await apiService(`/breweries/search?query=new jersey`);
    const ri = await apiService(`/breweries/search?query=rhode island`);
    const nyData = await ny.data;
    const njData = await nj.data;
    const riData = await ri.data;
    const allData = nyData.concat(njData).concat(riData);

    return { brews: allData };
  }

  handleStateChange = (event) => {
    this.setState({
      state: event.target.value,
    }, () => {
      if (this.state.type !== '') {
        this.setState({
          brewsList: this.state.brews.filter(el => {
            return el.state === this.state.state && el.brewery_type === this.state.type
          })
        })
      }
    })
    
  }

  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value,
    }, () => {
      if (this.state.state !== '') {
        this.setState({
          brewsList: this.state.brews.filter(el => {
            return el.state === this.state.state && el.brewery_type === this.state.type
          })
        })
      }
    })
  }

  componentDidMount() {
    const { brews } = this.props;
    this.setState({
      brews: JSON.parse(JSON.stringify(brews)),
    }, () => {
      this.setState({
        brewsList: this.state.brews.filter(el => {
          return el.state === this.state.state && el.brewery_type === this.state.type
        })
      })
    })
  }

  render() {
    return (
      <Provider store={store}>
      <Layout>
        <h1>Brews</h1>
        <div>
          <FormGroup row>
            <Label for="stateSelect" sm={2}>
              State
            </Label>
            <Col sm={10}>
              <Input
                className="selects"
                value={this.state.state}
                onChange={this.handleStateChange}
                type="select"
                name="state"
                id="stateSelect"
              >
                <option value={"Florida"}>Florida</option>
                <option value={"New Jersey"}>New Jersey</option>
                <option value={"Rhode Island"}>Rhode Island</option>
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="typeSelect" sm={2}>
              Type
            </Label>
            <Col sm={10}>
              <Input
                className="selects"
                value={this.state.type}
                onChange={this.handleTypeChange}
                type="select"
                name="type"
                id="typeSelect"
              >
                <option value={"micro"}>Micro</option>
                <option value={"brewpub"}>Pub</option>
                <option value={"planning"}>Planning</option>
                <option value={"contract"}>Contract</option>
                <option value={"proprietor"}>Proprietor</option>
                <option value={"regional"}>Regional</option>
                <option value={"large"}>Large</option>
              </Input>
            </Col>
          </FormGroup>
        </div>

        <CardColumns>
          {this.state.brewsList.map((value, index) => {
            return (
              <Link
                key={value.id}
                href="/brewery/[id]" 
                as={{
                  pathname: `/brewery/${value.id}`,
                }}
                >
              
                {/* <Link
                  key={value.id}
                  to={{
                    pathname: `/brewery/${value.id}`,
                    state: {
                      fromNotifications: true
                    }
                  }}
                  > */}
                    <a>
                      <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                        <CardTitle>{value.name}</CardTitle>
                        <CardSubtitle>{value.city}, {value.state}</CardSubtitle>
                        <CardText><NumberFormat displayType="text" value={value.phone} format="(###) ###-####" mask="_" /></CardText>
                      </Card>
                    </a>
                </Link>
            )
          })}
        </CardColumns>
        {/* <p>{JSON.stringify(this.state.type)}</p>
        <p>{JSON.stringify(this.state.state)}</p>
        <p>{JSON.stringify(this.state.brewsList.length)}</p>
        <p>{JSON.stringify(this.state.brewsList)}</p> */}
      </Layout>
      </Provider>
    );
  }
}


const mapStateToProps = state => ({
  brew: state.brewery
});

const mapDispatchToProps = {
  gobrew
};

const makeStore = () => store

const AppContainer = withRedux(makeStore)(Index);

export default Index
// export default AppContainer