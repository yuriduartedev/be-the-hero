const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {
  beforeEach( async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new Incident', async () => {
    const ongId = await request(app)
      .post('/ongs')
      .send({ name: "APAD2", email: "contato@test.com", whatsapp: "4700000000", city: "Rio do Sul", uf: "SC" });

    const response = await request(app)
      .post('/incidents')
      .set('Authorization', ongId)
      .send({
        title: "TEST JEST",
        description: "Detalhes Test Jest",
        value: 250
      });

      expect(response.body).toHaveProperty('id');
      expect(response.statusCode).toBe(200);
  });

  it('should be able to list Incidents', async () => {
    const response = await request(app)
      .get('/incidents')
      .set('Accept', 'application/json')
      .then(response => {
        // assert(response.body.email, 'foo@bar.com')
        console.log(response.body);
      })

  })

})