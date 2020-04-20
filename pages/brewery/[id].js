
import Layout from '../../components/Layout'
import React from 'react'
import apiService from '../../lib/apiService';
import { useRouter } from 'next/router'

import { Card, Button, CardBody, CardFooter, CardHeader, CardTitle, CardText,
  CardSubtitle } from 'reactstrap';
import NumberFormat from 'react-number-format'
import 'bootstrap/dist/css/bootstrap.min.css'

const Brew = ({b}) => {
  // console.log(props)
//   const b = {
//     id: 6372,
//     name: 'Whalers Brewing Company',
//     brewery_type: 'large',
//     street: '1174 Kingstown Rd',
//     city: 'Wakefield',
//     state: 'Rhode Island',
//     postal_code: '02879-8316',
//     country: 'United States',
//     longitude: '-71.4970673093227',
//     latitude: '41.4506997',
//     phone: '4015520002',
//     website_url: 'https://whalers.com',
//     updated_at: '2018-08-24T16:14:05.240Z',
//     tag_list: []
// }

const typeMap = {
  micro: 'MicroBrew',
  brewpub: 'Pub',
  planning: 'Planning',
  contract: 'Contract',
  proprietor: 'Proprietor',
  regional: 'Regional',
  large: 'LargeBrew'
}
    // const router = useRouter()
    // const { brew } = router.query
    // const brewery = JSON.stringify(brew)
    // console.log('brew', brewery.data)
  return (
    <Layout>
      <h1>Brewery</h1>
      <Card>
      <CardHeader>{b.name}</CardHeader>
      <CardBody>
        <CardTitle>{typeMap[b.brewery_type]}</CardTitle>
        <CardSubtitle><NumberFormat displayType="text" value={b.phone} format="(###) ###-####" mask="_" /></CardSubtitle>
        <CardText>
          {b.street}<br />
          {b.city}, {b.state} {b.postal_code}
        </CardText>
      </CardBody>
      <CardFooter>{b.website_url}</CardFooter>
    </Card>
    </Layout>
  )
  
}

Brew.getInitialProps = async ({req}) => {
  // console.log('asPath', asPath)
  // console.log('req', req)
  
  return {
    b: {
      id: 6372,
      name: 'Whalers Brewing Company',
      brewery_type: 'large',
      street: '1174 Kingstown Rd',
      city: 'Wakefield',
      state: 'Rhode Island',
      postal_code: '02879-8316',
      country: 'United States',
      longitude: '-71.4970673093227',
      latitude: '41.4506997',
      phone: '4015520002',
      website_url: 'https://whalers.com',
      updated_at: '2018-08-24T16:14:05.240Z',
      tag_list: []
    }
  };
};

export default Brew
