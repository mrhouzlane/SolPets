import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  ChakraProvider,
  theme as baseTheme,
  extendTheme,
} from '@chakra-ui/react';
import * as web3 from '@solana/web3.js';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
  getLedgerWallet,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import Home from './components/home';
import { useForm } from 'react-hook-form';

require('@solana/wallet-adapter-react-ui/styles.css');



function App() {
  const network = 'devnet';
  const endpoint = web3.clusterApiUrl(network);
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
      getLedgerWallet(),
    ],
    [network]
  );

  const theme = extendTheme({
    fonts: {
      heading: 'Montserrat',
      Body: 'Inter',
    },
    colors: {
      brand: {
        100: 'linear-gradient(144deg, #242038 20%, #522DA9 80%, #432C87)',
        // ...
        900: '#1a202c',
      },
    },
  });

 

  return (
    <>
      <ChakraProvider theme={theme}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Home>
               
              </Home>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ChakraProvider>
    </>
  );
}

export default App;