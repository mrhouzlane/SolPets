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
    fn update_pet_data(&mut self, pet_pubkey: &Pubkey, new_data: PetData);
    fn donate_to_pet(&mut self, pet_pubkey: &Pubkey, amount: u64);
}

#[derive(Serialize, Deserialize)]
pub struct PetData {
    pub history_of_vaccination: Vec<VaccinationRecord>,
    pub health_information: Vec<HealthInformation>,
    pub needs_help: bool,
    pub funds: u64,
}

#[derive(Serialize, Deserialize)]
pub struct VaccinationRecord {
    pub date: u64,
    pub vaccine: String,
}

#[derive(Serialize, Deserialize)]
pub struct HealthInformation {
    pub date: u64,
    pub information: String,
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

#[entrypoint]
pub fn update_pet_data(pet_pubkey: &Pubkey, new_data: PetData) -> ContractResult {
    let account_info = solanalib::get_account_info(pet_pubkey)?;
    let mut pet_data: PetData = solanalib::deserialize(&account_info.data).unwrap();
    pet_data = new_data;
    let serialized = solanalib::serialize(&pet_data).unwrap();
    solanalib::store_account(pet_pubkey, &serialized)?;
    Ok(())
}

#[entrypoint]
pub fn donate_to_pet(pet_pubkey: &Pubkey, amount: u64) -> ContractResult {
    let account_info = solanalib::get_account_info(pet_pubkey)?;
    let mut pet_data: PetData = solanalib::deserialize(&account_info.data).unwrap();
    pet_data.funds += amount;
    let serialized = solanalib::serialize