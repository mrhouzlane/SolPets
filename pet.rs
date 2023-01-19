use solana_sdk::{account::Account, entrypoint, info, pubkey::Pubkey, sysvar::rent::Rent};
use std::collections::HashMap;

// Pet passport information
struct Pet {
    name: String,
    breed: String,
    owner: String,
    birthdate: u64,
    identification: String,
}

#[entrypoint]
fn register_pet(
    pet_name: String,
    pet_breed: String,
    owner_pubkey: Pubkey,
    birthdate: u64,
    identification: String,
    accounts: HashMap<Pubkey, Account>,
) -> HashMap<Pubkey, Account> {
    // Ensure that the identification number is unique
    let pet_account = accounts.get(&identification.into()).unwrap();
    if !pet_account.is_empty() {
        panic!("Pet identification already exists");
    }

    let mut pet_account =
        Account::new(0, Rent::default().lamports_per_byte, &identification.into());

    let mut pet_info = Pet {
        name: pet_name,
        breed: pet_breed,
        owner: owner_pubkey.to_string(),
        birthdate: birthdate,
        identification: identification,
    };
    pet_account.data = bincode::serialize(&pet_info).unwrap();

    accounts.insert(identification.into(), pet_account);
    accounts
}
