import {
    Heading,
    HStack,
    Stack,
    Card,
    CardBody,
    Image,
    Text,
    Divider,
    CardFooter,
    Button,
    ButtonGroup,
    CardHeader,
  } from '@chakra-ui/react';
  import React from 'react';
  
  export default function NFT(props) {
    return (
        <Card align='center'>
  <CardHeader>
    <Heading size='md'> Customer dashboard</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your customers over the last month.</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue'>View here</Button>
  </CardFooter>
</Card>
    );
  }