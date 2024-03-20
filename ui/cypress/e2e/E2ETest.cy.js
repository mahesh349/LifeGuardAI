describe('template spec', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000');

		// Verify the main heading
		cy.get('h4').should(
			'contain.text',
			'Enriching End of Life Care with Technology'
		);
		cy.get('p').should(
			'contain.text',
			'Welcome to our platform dedicated to improving end-of-life care through technology.'
		);
		// Verify the buttons and their links
		cy.get('[data-cy="doctor-link"]')
			.should('exist')
			.invoke('text')
			.should('include', 'Doctor');
		cy.get('[data-cy="for patients-link"]')
			.contains('For Patients')
			.should('have.attr', 'href', '/PatLogin');
		cy.contains('Doctor').click();
		cy.url().should('include', '/DocLogin');

		//Patient login
		cy.visit('http://localhost:3000/PatLogin');
		cy.get('label').contains('Email').should('exist');
		cy.get('label').contains('Password').should('exist');
		cy.get('button').contains('Login').should('exist');
		cy.get('small').contains("Don't have an account?").should('exist');
		cy.get('small').contains('Forgot Password ?').should('exist');
		cy.get('form').submit();
		cy.get('.MuiAlert-root')
			.contains('You must provide a Email')
			.should('exist');
		cy.get('input[type="email"]').type('test@example.com');
		cy.get('input[type="password"]').type('testpassword');
		cy.get('form').submit();
		cy.contains("Don't have an account?").click();
		cy.contains('Forgot Password ?').click();
		cy.get('.MuiAlert-root')
			.contains('Password Reset Link has been sent to this email id')
			.should('exist');

		//Patient Auth
		cy.visit('http://localhost:3000/PatSignUp');
		cy.get('form').submit();
		cy.get('.MuiAlert-root')
			.contains('You must provide a Email')
			.should('exist');
	});
});
