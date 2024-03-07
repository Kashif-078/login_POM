Cypress.Commands.add('typeSecurely', { prevSubject: 'element' }, (subject, text) => {
    const logMaskedText = '*'.repeat(text.length);
    Cypress.log({
        $el: subject,
        name: 'sensitiveInfo',
        message: logMaskedText,
    })
    cy.wrap(subject, {log:false}).type(text, {log:false})
})
  
  
