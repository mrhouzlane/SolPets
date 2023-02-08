use solana::{
    account_info::AccountInfo,
    contract_interface::{contract_interface, ContractInterface},
    entrypoint::{entrypoint, Entrypoint},
    pubkey::Pubkey,
};

const PET_NFT_PRGRAM_ID: [u8; 32] = [
    2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

#[Contract_interface]
trait NFTMinter {
    fn mint(&mut self, pet_data: PetData);
}

#[derive(Serialize, Deserialize)]
pub struct PetData {
    pub history_of_vaccination: Vec<u64>,
    pub needs_help: bool,
}

#[entrypoint]
pub fn mint(pet_data: PetData) -> ContractResult {
    let pubkey = Pubkey::new_unique();
    let owner = solanalib::get_caller();
    solanalib::mint_nft(
        PET_NFT_PRGRAM_ID,
        &pubkey,
        &owner,
        &pet_data,
        &solana_stake_program::id(),
    )?;
    Ok(())
}
