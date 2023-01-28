import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  FormControl,
  FormLabel,
  SimpleGrid,
  VStack,
  Input,
  FormHelperText,
  Box,
  Heading,
  Text,
  Stack,
  HStack,
  RadioGroup,
  Radio,
  NumberInput,
  NumberInputField,
  Button,
  Flex,
  Link,
  ButtonGroup,
  IconButton,
  AddIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Lorem,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import AlertPop from './AlertPop';
import Stats from './Stats';

export default function Form() {
  const toast = useToast();
  const [data, setData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    //console.log(data);
    toast({
      title: 'Submitted!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setData(data);
  };
  console.log(data);
  console.log(errors);
  return (
    <>
      <VStack
        justifyContent="space-between"
        align="center"
        mt={8}
        spacing="3px"
      >
        <Heading textAlign="center" mb="10">
          Create a new passport
        </Heading>
        <Box maxWidth="750px" align="center">
          <Text textAlign="center">
            Create a new profile for your pet. If you already have an account
            connect to your wallet to view your NFT
          </Text>
        </Box>
      </VStack>
      <SimpleGrid
        columns={1}
        spacing={10}
        m="120px"
        align="center"
        justifyContent="center"
      >
        <Stack
          spacing={5}
          borderRadius={30}
          borderWidth={3}
          p={20}
          bg="#F4F2F2"
          color="grey"
          textAlign="left"
        >
          <form isRequired onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <FormLabel color="#6D5D5D">What's your pet's name?</FormLabel>
              <Input
                type="name"
                borderColor="#B8B5B5"
                color="black"
                placeholder="What's your pet's name?"
                {...register('petname', {
                  required: "Please enter your pet's name",
                  minLength: 2,
                  maxLength: 80,
                })}
              />
              {errors.petname && <AlertPop title={errors.petname.message} />}
              <FormLabel as="legend">What kind of pet do you have?</FormLabel>
              <RadioGroup isRequired {...register('animal')}>
                <HStack spacing="30px">
                  <Radio value="Dog">Dog</Radio>
                  <Radio value="Cat">Cat</Radio>
                  <Radio value="Reptile">Reptile</Radio>
                  <Radio value="Other">Other</Radio>
                </HStack>
              </RadioGroup>
              {errors.animal && <AlertPop title={errors.animal.message} />}
              <FormLabel color="#6D5D5D">
                When is your pet's birthdate?
              </FormLabel>
              <Input
                type="date"
                borderColor="#B8B5B5"
                color="black"
                placeholder="When is your pet's birthdate?"
                {...register('birthdate', {
                  required: 'Please enter your pets birthday',
                  minLength: 3,
                  maxLength: 100,
                })}
              />
              {errors.birthdate && (
                <AlertPop title={errors.birthdate.message} />
              )}
              <FormLabel color="#6D5D5D">What's your pet's breed?</FormLabel>
              <Input
                type="text"
                borderColor="#B8B5B5"
                color="black"
                placeholder="What's your pet's breed?"
                {...register('breed', {
                  required: "Please enter your pet's breed",
                })}
              />
              {errors.breed && <AlertPop title={errors.breed.message} />}
              <FormControl>
                <FormLabel color="#6D5D5D" textAlign="center">
                  Microchip No.
                </FormLabel>
                <Input
                  type="number"
                  min={10}
                  borderColor="#B8B5B5"
                  color="black"
                  {...register('microchip')}
                />
                {errors.microchip && (
                  <AlertPop title={errors.microchip.message} />
                )}
                <FormLabel color="#6D5D5D" textAlign="center">
                  Rabies ID
                </FormLabel>
                <Input
                  type="text"
                  min={10}
                  borderColor="#B8B5B5"
                  color="black"
                  {...register('rabies')}
                />
                {errors.rabies && <AlertPop title={errors.rabies.message} />}
              </FormControl>
              <VStack mt="10px">
                <FormLabel color="#6D5D5D" textAlign="center">
                  Upload a photo
                </FormLabel>
                <Input
                  isRequired
                  bg="grey.500"
                  color="white"
                  borderRadius={10}
                  textAlign="center"
                  type="file"
                  // {...register('picture', {
                  //   required: 'Please upload a photo',
                  // })}
                />

                <Button
                  bg="#C92BF7"
                  type="submit"
                  color="white"
                  width="200px"
                  borderRadius="md"
                  mt={4}
                  variant="ghost"
                >
                  Submit
                </Button>
              </VStack>
              <Link mt={4}>Save Profile</Link>
            </VStack>
          </form>
        </Stack>
        {data && (
          <Stats
            Petname={data.petname}
            Animal={data.animal}
            Birthdate={data.birthdate}
            Breed={data.breed}
            Microchip={data.microchip}
            Rabies={data.rabies}
            Picture={data.picture}
          />
        )}
      </SimpleGrid>
    </>
  );
}
