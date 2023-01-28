import {
  Heading,
  HStack,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
} from '@chakra-ui/react';
import React from 'react';

export default function Stats(props) {
  return (
    <Stat mt={5}>
      <Heading my={2} as="h4" fontSize="20px">
        Submitted Result
      </Heading>
      <Stack
        p={4}
        borderWidth="3px"
        borderRadius="md"
        direction="column"
        align="flex-start"
      >
        <HStack>
          <StatLabel>Pet Name: {props.Petname}</StatLabel>
          <StatLabel>Animal: {props.Animal}</StatLabel>
          <StatLabel>Birthdate: {props.Birthdate}</StatLabel>
          <StatLabel>Breed: {props.Breed}</StatLabel>
          <StatLabel>Picture: {props.Picture}</StatLabel>
        </HStack>
        <StatHelpText>Microchip: {props.Microchip}</StatHelpText>
        <StatHelpText>RabiesID: {props.Rabies}</StatHelpText>
      </Stack>
    </Stat>
  );
}
