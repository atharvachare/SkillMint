import { createClient } from '@supabase/supabase-js';

// These will be loaded from .env in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only initialize if keys are present
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const dbService = {
  isConfigured: () => !!supabase,

  async getLeaderboard() {
    if (!supabase) {
      console.warn("Supabase not configured. Returning mock leaderboard.");
      return [
        { rank: 1, name: "Alice Web3", xp: 14500, level: "Legend", address: "0x71C...9B23" },
        { rank: 2, name: "Bob.eth", xp: 12200, level: "Master", address: "0x82D...1C34" },
        { rank: 3, name: "Charlie", xp: 9800, level: "Expert", address: "0x93E...2D45" },
        { rank: 4, name: "Diana Dev", xp: 8400, level: "Advanced", address: "0xA4F...3E56" },
        { rank: 5, name: "Eve Hacker", xp: 7200, level: "Intermediate", address: "0xB5A...4F67" },
      ];
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('name, xp, level, address')
      .order('xp', { ascending: false })
      .limit(50);
      
    if (error) throw error;
    return data.map((user, i) => ({ ...user, rank: i + 1 }));
  },

  async getUserProfile(address: string) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('address', address)
      .single();
    if (error && error.code !== 'PGRST116') throw error; // ignore not found
    return data;
  },

  async saveMint(mintData: { address: string; badgeId: string; tokenId: string; txHash: string; rarity: string; xpEarned: number }) {
    if (!supabase) {
      console.log("Mock saved mint to DB:", mintData);
      return;
    }
    
    // 1. Save the mint record
    const { error: mintError } = await supabase.from('mints').insert([mintData]);
    if (mintError) throw mintError;

    // 2. Increment user XP (RPC call or upsert)
    // Assuming an RPC 'increment_xp' exists in Supabase
    const { error: xpError } = await supabase.rpc('increment_xp', { 
      user_address: mintData.address, 
      xp_amount: mintData.xpEarned 
    });
    if (xpError) throw xpError;
  }
};
