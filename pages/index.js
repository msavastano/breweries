import React from 'react'
import Layout from "../components/Layout";
import { Component } from "react";
import apiService from "../lib/apiService";
import { Col, FormGroup, Label, Input, Card, CardTitle, CardColumns,CardSubtitle } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import Brewery from '../components/Brewery';
export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "Rhode Island",
      type: "micro",
      brewsList: [],
      br: {}
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
          }),
          br: {}
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
          }),
          br: {}
        })
      }
    })
  }

  handleBrew = (e, data) => {
    this.setState({
      br: data
    })
    window.scrollTo({
      top: 0,
      behavior: "smooth"
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
    
        {Object.keys(this.state.br).length > 0 &&
          <div>
            <Brewery info={this.state.br} />
            <br />
          </div>
        }

        <CardColumns>
          {this.state.brewsList.map((value, index) => {
            return (
                
                    <Card 
                      key={value.id}
                      body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                      <CardTitle>{value.name}</CardTitle>
                      <CardSubtitle>{value.city}, {value.state}</CardSubtitle>
                      <button
                        onClick={((e) => this.handleBrew(e, value))}
                        value={value.name}
                        >Info</button>
                    </Card>
                
            )
          })}
        </CardColumns>
      </Layout>
    );
  }
}

export default Index
