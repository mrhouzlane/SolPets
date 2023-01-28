use anchor_lang::prelude::*;
use num_derive::*;
use num_traits::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[account]
pub struct Game {
    players: [Pubkey; 2],          // (32 * 2)
    turn: u8,                      // 1
    board: [[Option<Sign>; 3]; 3], // 9 * (1 + 1) = 18
    state: GameState,              // 32 + 1
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GameState {
    Active,
    Tie,
    Won { winner: Pubkey },
}

#[derive(
    AnchorSerialize, AnchorDeserialize, FromPrimitive, ToPrimitive, Copy, Clone, PartialEq, Eq,
)]
pub enum Sign {
    X,
    O,
}

impl Game {
    pub const MAXIMUM_SIZE: usize = (32 * 2) + 1 + (9 * (1 + 1)) + (32 + 1);

    pub fn start(&mut self, players: [Pubkey; 2]) -> Result<()> {
        require_eq!(self.turn, 0, TicTacToeError::GameAlreadyStarted);
        self.players = players;
        self.turn = 1;

        Ok(());
    }

    pub fn is_active() -> bool {
        self.state == GameState::Active,
    }

    fn current_player_index(&self) -> usize {
        ((self.turn - 1) % 2) as usize
    }

    pub fn current_player(&self) -> PubKey {
        self.players[current_player_index()];
    }

    pub fn play(&mut self, tile: &Tile) -> Result<()>{
        require!(self.is_active(), TicTacToeError::GameAlreadyOver)
    }

    match tile {
        tile @Tile {
            row: 0..=2,
            column 0..=2,
        } => match self.board[tile.row as usize][tile.column as usize]{
            Some(_) => return Err(TicTacToeError::TileAlreadySet.into()),
            None => {
                self.board[tile.row as usize][tile.column as usize] =
                    Some(Sign::from_usize(self.current_player_index()).unwrap());
            }
        },

        _ => return Err(icTacToeError::TileOutOfBounds.into()),

    

        self.update_state();

        if GameState::Active == self.state {
            self.turn += 1;
        }

        Ok(())

    }

    fn is_winning_trio(&self, trio: [(usize, usize); 3]) -> bool{
        let [first, second, third] = trio;
        self.board[first.0][first.1].is_some() 
            && self.board[first.0][first.1] == self.board[second.0][second.1] 
            && self.board[first.0][first.1] == self.board[third.0][third.1]
    }

    fn update_state(&mut self){
        
    }



}


