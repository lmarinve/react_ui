import { Selector } from 'testcafe';


fixture `Adfluence UI`
    .page `http://localhost:9000`;


test('login', async t => {
    
    await t
    .typeText('#username', 'testuser')
    .typeText('#email', 'testuser@test.com')
    .typeText('#password', 'testing')
    .click('button.btn.animated.bounceInUp');

    const welcomeMessage = Selector('h5.modal-title')

    await t
    .expect(welcomeMessage.innerText).eql('Welcome back !')


})
