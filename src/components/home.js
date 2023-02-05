import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  VStack,
  Grid,
  Button,
  useToast,
  Code,
  HStack,
  Heading,
  theme as baseTheme,
  Input,
  SimpleGrid,
  Img,
  Container,
  Stack,
  extendTheme,
  FormControl,
  FormLabel,
  Link,
  VisuallyHidden, 
  VisuallyHiddenInput,
  FaFacebook,
  FaTwitter,
} from '@chakra-ui/react';
import phoneUI from '../assets/phoneUI.svg';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
import * as web3 from '@solana/web3.js';
import logo from '../logo.svg';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import LoginForm from '../components/LoginForm';
import solanaShape from '../assets/solanaShape.svg';
import dogAndHuman from '../assets/dogAndHuman.svg';
import dogProfile from '../assets/dogProfile.svg';
import solanaVerticalLogo from '../assets/solanaVerticalLogo.svg';
import { Greet } from '../Greet';
import Form from './LoginForm';


function WalletNotConnected() {
  return (
    <VStack height="70vh" justify="space-around">
      <VStack>
        <Text fontSize="2xl">
          {' '}
          Looks like your wallet is not connnected. Connect a wallet to get
          started!
        </Text>
        <WalletMultiButton />
      </VStack>
    </VStack>
  );
}

function useSolanaAccount() {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const init = useCallback(async () => {
    if (publicKey) {
      let acc = await connection.getAccountInfo(publicKey);
      setAccount(acc);
      let transactions = await connection.getConfirmedSignaturesForAddress2(
        publicKey,
        {
          limit: 10,
        }
      );
      setTransactions(transactions);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    if (publicKey) {
      setInterval(init, 1000);
    }
  }, [init, publicKey]);

  return { account, transactions };
}

function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { account, transactions } = useSolanaAccount();
  const toast = useToast();
  const [airdropProcessing, setAirdropProcessing] = useState(false);
  

  const getAirdrop = useCallback(async () => {
    setAirdropProcessing(true);
    try {
      var airdropSignature = await connection.requestAirdrop(
        publicKey,
        web3.LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
    } catch (error) {
      console.log(error);
      toast({ title: 'Airdrop failed', description: 'unknown error' });
    }
    setAirdropProcessing(false);
  }, [toast, publicKey, connection]);




  return (
    <Box textAlign="left" fontSize="xl" bg="brand.100">
      <Tabs variant="soft-rounded" colorScheme="purple" >
        <TabList width="full">
          <HStack justify="space-between" width="full" m="50px">
              <HStack >
              <a href="./App.js"><Img src={logo} /></a>
              </HStack>
              <HStack flex="1" pl="50px">
              <VisuallyHidden><Tab>Home</Tab></VisuallyHidden>
              <Tab backgroundColor="purple.500" color="white" >Start here</Tab>
            </HStack>
            <HStack>
              <WalletMultiButton />
              {publicKey && <WalletDisconnectButton bg="pink" />}
              <ColorModeSwitcher justifySelf="flex-end" />
            </HStack>
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box as="section" className="header" mt="170">
              <Flex>
                <Box width="700px">
                  <Img src={phoneUI} />
                </Box>
                <Stack>
                  <VStack justifyContent="space-evenly" align="left">
                    <Heading
                      as="h1"
                      size="lg"
                      fontSize="60px"
                      fontWeight="600"
                      mb="10"
                    >
                      A Passport NFT for your pet
                    </Heading>
                    <Box maxWidth="750px" pb="10" align="left">
                      <Text fontSize="24px" fontWeight="400">
                        Create a profile for your pet and we'll convert your
                        pets information into a personalized NFT you can use to
                        show proof-of-ownership and proof-of-records.
                      </Text>
                    </Box>
                    <Link to='./LoginForm.jsx'>
                      <Button w="120px" > Get Started </Button>
                    </Link>
                  </VStack>
                </Stack>
                <Box flex="1" align="right" width="500px">
                  <Img
                    src={solanaShape}
                    position="relative"
                    top="-200px"
                    right="-20px"
                  />
                </Box>
              </Flex>
            </Box>
            <Box as="section" className="main">
              <Flex
                flexDirection={['column', 'row']}
                justifyContent="center"
                position="relative"
                align="center"
              >
                <Img src={dogAndHuman} boxSize="500px" />
                <Img src={dogProfile} boxSize="800px" />
              </Flex>
            </Box>
            <Box as="section" className="footer">
              <Flex justifyContent="center">
                {/* <Img src={solanaVerticalLogo} /> */}
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
          {publicKey && (
            <>
            <Form />
            <SimpleGrid columns={2} spacing={10}>
            <VStack spacing={8} borderRadius={10} borderWidth={2} p={10}>
              <FormControl id="pubkey">
                <FormLabel>Wallet Public Key</FormLabel>
                <Input
                  type="text"
                  value={publicKey.toBase58()}
                  readOnly
                />
              </FormControl>
              <FormControl id="balance">
                <FormLabel>Balance</FormLabel>
                <Input
                  type="text"
                  value={
                    account
                      ? account.lamports / web3.LAMPORTS_PER_SOL + ' SOL'
                      : 'Loading..'
                  }
                  readOnly
                />
              </FormControl>
              <Button onClick={getAirdrop} isLoading={airdropProcessing}>
                Get Airdrop of 1 SOL
              </Button>
            </VStack>
            <VStack>
              <Greet />
            </VStack>
          </SimpleGrid>
          </>
            )}
          
            {publicKey && (
              <VStack spacing={8}>
                <Heading>transaction history</Heading>
                {transactions && (
                  <VStack>
                    {transactions.map((v, i, arr) => (
                      <HStack key={'transaction-' + i}>
                        <Text>Signature: </Text>
                        <Code>{v.signature}</Code>
                      </HStack>
                    ))}
                  </VStack>
                )}
              </VStack>
            )}
            {!publicKey && <WalletNotConnected />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Home;
