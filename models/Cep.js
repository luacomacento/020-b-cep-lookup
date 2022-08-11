const connection = require('./connection');

const Cep = {
  getByPk: async (cep) => {
    // Aqui acabei fazendo uma desconstrução dupla, pois o retorno de connection.query é uma array em que o primeiro índice tem os meus dados (conforme explicado na monitoria). Porém, esses dados também são uma array (pois eu poderia ter mais de uma linha da tabela). Como estamos pesquisando pela chave primária (ou seja, teremos apenas uma única linha encontrada), puxei direto a posição [0] desse resultado.
    // Seria o equivalente a fazer: "[result] = await...." e no final substituir por "return result[0]"
    const [[result]] = await connection.query(`
      SELECT * from cep_lookup.ceps
      WHERE cep = ?
    `, [cep]);
    return result;
  },

  getAll: async () => {
    const [result] = await connection.query(`SELECT * from cep_lookup.ceps`);
    return result;
  },

  create: async (address) => {
    const {cep, logradouro, bairro, localidade, uf} = address;
    const [{ affectedRows }] = await connection.query(`
      INSERT INTO cep_lookup.ceps (cep, logradouro, bairro, localidade, uf)
      VALUES (?, ?, ?, ?, ?)
    `, [cep, logradouro, bairro, localidade, uf]);
    return affectedRows;
  }
};

module.exports = Cep;