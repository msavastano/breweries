
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, CardText,CardSubtitle } from 'reactstrap';
import NumberFormat from 'react-number-format'
import 'bootstrap/dist/css/bootstrap.min.css'

const Brew = (props) => {
  let b = {}
  if (props.info) {
    b = props.info
  }

  const typeMap = {
    micro: 'MicroBrew',
    brewpub: 'Pub',
    planning: 'Planning',
    contract: 'Contract',
    proprietor: 'Proprietor',
    regional: 'Regional',
    large: 'LargeBrew'
  }
  return (
    <div>
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
      <CardFooter>
        <a 
          href={b.website_url} 
          target="blank" 
          style={{textDecoration: 'none', color: 'darkgrey' }}
          >
              {b.website_url}
        </a>
      </CardFooter>
    </Card>
    </div>
  )
  
}

Brew.getInitialProps = async () => {
  return {
    ff: {}
  };
};

export default Brew
