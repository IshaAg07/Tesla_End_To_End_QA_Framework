describe('Mock Tesla Insurance API', () => {
    it('GET /insurance-info returns plans', () => {
      cy.request('/insurance-info').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('plans');
        expect(res.body.plans).to.be.an('array').and.not.be.empty;
        expect(res.body.plans[0]).to.have.all.keys('plan', 'monthly', 'deductible', 'coverage');
      });
    });
    it('POST /get-quotes (typo) should fail with 404', () => {
        cy.request({
          method: 'POST',
          url: '/get-quotes',   // wrong endpoint
          failOnStatusCode: false,   // don’t auto-fail Cypress, let us check
          body: {
            name: 'Isha',
            email: 'isha@example.com',
            model: 'Model Y',
            zip: '94016',
          },
        }).then((res) => {
          expect(res.status).to.eq(404);   // we expect 404, not 200
          expect(res.body).to.have.property('status'); // Flask may not return JSON here, so this may fail
        });
      });
      
    it('POST /get-quote returns success', () => {
      cy.request('POST', '/get-quote', {
        name: 'Isha',
        email: 'isha@example.com',
        model: 'Model Y',
        zip: '94016',
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.status).to.eq('success');
        expect(res.body).to.have.property('quoteId');
        expect(res.body.monthlyPremium).to.be.a('number');
      });
    });
  
    it('POST /get-quote returns error for bad input', () => {
      cy.request({
        method: 'POST',
        url: '/get-quote',
        failOnStatusCode: false,
        body: { name: 'Isha', email: 'bademail', model: 'Model Y', zip: 'abc' },
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.status).to.eq('error');
        expect(res.body).to.have.property('message');
      });
    });
  });
  