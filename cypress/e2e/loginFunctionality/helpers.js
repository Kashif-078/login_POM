
// To Select Server Name
export function decideServerName(Server)
{
   return 'Test'
}

// To Select Server URL
export function decideServerURL(Server)
{
    if(Server == 'Local' || Server == 'local' || Server  ==  'LOCAL')
    {
        return 'pmxvhb001.local'
    }else if(Server == 'Test' || Server == 'test' || Server == 'TEST')
    {
        return 'pmx-test'
    }
}

// Function to close Recover Unsaved Changes Modal
export function closeRecoverUnsavedChangesModal(){
    cy.get('body').then($body => {
        if ($body.find('div.modal-content').length) 
        {
            cy.log('Modal content does exist')
            cy.get('div.modal-content div.modal-footer button:eq(1)').click()
        }
    })
}

// Function to close any alert Modal triggered on Save, Cancel and so on
export function closeAlertModal(buttonIndex){
    // cy.get('div.modal-dialog div.modal-content').then(modal => {
    //     if (modal.length) {
    //         cy.log('Modal content does exist')
    //         cy.get(`div.modal-content div.modal-footer button:eq(${buttonIndex})`).click()
    //     }
    // })

    cy.get('body').then($body => {
        if ($body.find('div.modal-content').length) 
        {
            cy.log('Modal content does exist')
            cy.get(`div.modal-content div.modal-footer button:eq(${buttonIndex})`).click()
        }
    })
}

export function generateRandomName(Name, length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomName = `${Name}_`;
    for (let i = 0; i < length; i++) {
        randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomName;
}

export function getDate(Name) {
    // Get today's date
    const today = new Date();
    // Calculate the last month 
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    // Format the date for typing into the input field
    let formattedDate 
    if(Name == 'goLive' || Name == 'PAP Enrollment Date'){
        formattedDate = `${String(lastMonth.getMonth() + 1).padStart(2, '0')}/01/${lastMonth.getFullYear()}`
    }else{
        formattedDate = `${lastMonth.getFullYear()}-01-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`
    }
    return formattedDate;
}

export function MaxAccumulatorDate(liveDate) {
    // Parse the go_liveDate string to a Date object
    const date = new Date(liveDate);
    // Get the year and add 2 years to it
    const nextYear = date.getFullYear() + 1;
    // Update the year in the date object
    date.setFullYear(nextYear);
    // Convert the date object back to a string
    const nextDate = date.toLocaleDateString('en-US')
    return nextDate;
}

// export function nextTouchDate(){
//     // To get nextMonth 1st as nextTouchDate 
//     const today = new Date()   // Get today Date
//     cy.log(today)
//     today.setDate(1)    // Set day to 1
//     today.setMonth(today.getMonth() === 11 ? 0 : today.getMonth() + 1)  // Add 1 month, handle December
//     // Format date as MM/dd/yyyy
//     const nextMonthDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/01/${today.getFullYear()}` 
//     return nextMonthDate;
// }

export function welcomeCallDate(i) {
    if (i === 'callDate') {
        const today = new Date();   // Get today's date
        today.setDate(today.getDate());  // Get current date
        // Format date as MM/dd/yyyy
        const currentDate = `${(today.getMonth()).toString().padStart(2, '0')}/${today.getDate().toString()
            .padStart(2, '0')}/${today.getFullYear()}`;
        return currentDate;
    } else if (i === 'nextDate') {
        const today = new Date();   // Get today's date
        today.setDate(1);    // Set day to 1
        today.setMonth(today.getMonth() === 11 ? 0 : today.getMonth() + 1);   // Add 1 month, handle December
        // Format date as MM/dd/yyyy
        const nextMonthDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/01/${today.getFullYear()}`;
        return nextMonthDate;
    }
}

export function generateRandomNumber(length, deductValue) {
    // Here we'll pass deductValue 1 if wanna exclude 0 and include length else we'll pass 0
    return Math.floor(Math.random() * (length - deductValue)) + deductValue; 
}

export function generateShortName(randomName) {
    // Extract a substring from the randomName (excluding 'plan_')
    return randomName.substring(5); // Change 5 to the length of 'plan_'
}

// To select option from dropdown using select
export function selectOption(path, a){
    cy.get(path).find('option').its('length')
    .then((optionCount) => 
    {
        // Generate a random index
        cy.log(`before ${optionCount}`)
        optionCount  -= a; //To avoid getting a value 0 as there's no value at 1st option
        cy.log(`after ${optionCount}`)
        const randomIndex = Math.floor(Math.random() * optionCount) + 1;
        cy.log(randomIndex);
        // Select the option at the random index
        cy.get(path).select(randomIndex, {force:true});
    })
}

// To select option from dropdown using ul
export function selectOptionFromSelect(path, length){
    cy.get(path).find('option').its('length')
    .then((optionCount) => 
    {
        // Generate a random index
        cy.log(`before ${optionCount}`)
        optionCount  -= length; // To avoid getting a value 0 as there's no value at 1st option
        cy.log(`after ${optionCount}`)
        const randomIndex = Math.floor(Math.random() * optionCount) + 1
        cy.log(randomIndex)
        // Select the option at the random index
        cy.get(path).select(randomIndex, {force:true})
    })
}

// To select option from dropdown using ul
export function selectOptionFromUl(path){
    cy.get(path).its('length')
    .then((listCount) => 
    {
        // Generate a random index
        cy.log(`lisCount ${listCount}`)
        const randomIndex = Math.floor(Math.random() * listCount)
        cy.log(randomIndex)
        // Select the option at the random index
        cy.get(path).eq(randomIndex).click()
    })
}

export function waitUntilTableLoads(path) {
    return cy.get(path).then(($rows) => 
    {
        if ($rows.length >= 1) {
            return; // Condition is met, no need to wait further
        } else {
            // Condition is not met, retry after a short delay
            cy.wait(1000); // Wait for 1 second before retrying
            return waitUntilConditionIsMet(); // Recursively call the function
        }
    })
}

export function requiredFieldAlert(path, message){
    cy.get(path).should('contain', message)
}