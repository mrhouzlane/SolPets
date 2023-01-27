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
} from '@chakra-ui/react';






export default function Form() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <VStack justifyContent="space-between" align="center" >
            <Heading textAlign="center" mb="10">Create a new passport</Heading>
            <Box maxWidth="750px" align="center" >
                <Text textAlign="center" >Create a new profile for your pet. If you already have an account connect to your wallet to view your NFT</Text>
            </Box>
        </VStack>
            <SimpleGrid columns={1} spacing={10}  m="120px" align="center" justifyContent="center" >
                <Stack spacing={5} borderRadius={30} borderWidth={3} p={20} bg="#F4F2F2" color="grey" >
                    <FormControl isRequired >
                        <FormLabel color="#6D5D5D">What's your pet's name?</FormLabel>
                        <Input type='name' borderColor="#B8B5B5" color="black" placeholder="What's your pet's name?" />
                    </FormControl>
                    <FormControl isRequired >
                        <FormLabel as='legend'>What kind of pet do you have?</FormLabel>
                        <RadioGroup defaultValue="Dog" >
                            <HStack spacing="24px">
                                <Radio value='Dog'>Dog</Radio>
                                <Radio value='Cat'>Cat</Radio>
                                <Radio value='Reptile'>Reptile</Radio>
                                <Radio value='Other'>Other</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="#6D5D5D">When is your pet's birthdate?</FormLabel>
                        <Input type='email' borderColor="#B8B5B5" color="black" placeholder="When is your pet's birthdate?" />
                    </FormControl>
                    <FormControl >
                        <FormLabel color="#6D5D5D">What's your pet's breed?</FormLabel>
                        <Input type='email' borderColor="#B8B5B5" color="black" placeholder="What's your pet's breed?" />
                    </FormControl>
                    <FormControl >
                        <FormLabel color="#6D5D5D">Microchip No.</FormLabel>
                        <NumberInput max={50} min={10}  borderColor="#B8B5B5" color="black" >
                        <NumberInputField />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel color="#6D5D5D">Rabies ID</FormLabel>
                        <NumberInput max={50} min={10}  borderColor="#B8B5B5" color="black" >
                        <NumberInputField />
                        </NumberInput>
                    </FormControl>
                    
                    <Box isRequired as="button" boxSize="400px" bg="grey" color="white" borderRadius={10} textAlign="center" >Upload a picture</Box>
                        
                    
                    <Button bg="#C92BF7" color="white" width="200px">Remove</Button>
                </Stack>
                <Flex justifyContent="space-between" >
                    <Link
                        mt={4}
                        >
                        Save Profile
                    </Link>
                    <Button
                        mt={4}
                        bg='#9945FF'
                        loadingText='Submitting'
                        type='submit'
                        width="180px"
                        >
                        Submit
                    </Button>
                </Flex>
            </SimpleGrid>
        </>
    )
}