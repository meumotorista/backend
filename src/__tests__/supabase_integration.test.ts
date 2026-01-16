import { supabase } from '../config/supabase.js';
import { jest } from '@jest/globals';

describe('Supabase Integration Test', () => {
  it('should insert a real ride record into Supabase', async () => {
    // Nota: Este teste assume que a tabela 'rides' existe e as credenciais no .env são válidas.
    // Usamos dados de teste que não dependem de FKs complexas se possível, 
    // ou assumimos que o banco permite inserção parcial para este teste.
    
    const testRide = {
      pickup_address: 'Endereço de Teste Origem',
      destination_address: 'Endereço de Teste Destino',
      status: 'requested',
      fare: 25.50
    };

    const { data, error } = await supabase
      .from('rides')
      .insert([testRide])
      .select()
      .single();

    if (error) {
      console.error('Erro na inserção do Supabase:', error);
    }

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.pickup_address).toBe(testRide.pickup_address);
    
    // Limpeza opcional: remover o dado de teste após a verificação
    if (data && data.id) {
      await supabase.from('rides').delete().eq('id', data.id);
    }
  }, 15000); // Aumentando timeout para chamadas de rede
});
