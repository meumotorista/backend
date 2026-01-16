import { supabase } from '../config/supabase.js';
import { jest } from '@jest/globals';

describe('Supabase Persistence Test', () => {
  it('should insert and PERSIST a ride record in Supabase', async () => {
    const timestamp = new Date().toISOString();
    const testRide = {
      pickup_address: `Origem Persistida - ${timestamp}`,
      destination_address: `Destino Persistido - ${timestamp}`,
      status: 'requested',
      fare: 42.00
    };

    console.log('Iniciando inserção persistente...');

    const { data, error } = await supabase
      .from('rides')
      .insert([testRide])
      .select()
      .single();

    if (error) {
      console.error('Erro na inserção:', error);
    }

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.pickup_address).toBe(testRide.pickup_address);
    
    console.log(`Sucesso! Registro mantido no banco com ID: ${data.id}`);
    // A limpeza (delete) foi removida propositalmente para manter o dado no banco.
  }, 15000);
});
