package com.tesla.insurance.pages;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class InsurancePage {
    private WebDriver driver;

    // Locators
    private By heading = By.xpath("//h1[contains(text(),'Tesla Insurance')]");
    private By getQuoteButton = By.xpath("//button[contains(text(),'GET QUOTE')]");
    private By popupHeading = By.xpath("//h2[contains(text(),'Get Your Tesla Insurance Quote')]");
    private By firstName = By.xpath("//input[@placeholder='Enter your first name']");
    private By lastName = By.xpath("//input[@placeholder='Enter your last name']");
    private By email = By.xpath("//input[@placeholder='Enter your email']");
    private By phone = By.xpath("//input[@placeholder='Enter your phone number']");
    private By modelDropdown = By.xpath("//button[contains(.,'Select your Tesla model')]");
    private By modelYOption = By.xpath("//span[text()='Model Y']");
    private By zipCode = By.xpath("//input[@placeholder='Enter your ZIP code']");
    private By submitButton = By.xpath("//button[contains(text(),'Get My Quote')]");

    // Constructor
    public InsurancePage(WebDriver driver) {
        this.driver = driver;
    }

    // Page actions
    public WebElement getHeading() { return driver.findElement(heading); }
    public WebElement getQuoteButton() { return driver.findElement(getQuoteButton); }
    public WebElement getPopupHeading() { return driver.findElement(popupHeading); }
    public WebElement getFirstName() { return driver.findElement(firstName); }
    public WebElement getLastName() { return driver.findElement(lastName); }
    public WebElement getEmail() { return driver.findElement(email); }
    public WebElement getPhone() { return driver.findElement(phone); }
    public WebElement getModelDropdown() { return driver.findElement(modelDropdown); }
    public WebElement getModelYOption() { return driver.findElement(modelYOption); }
    public WebElement getZipCode() { return driver.findElement(zipCode); }
    public WebElement getSubmitButton() { return driver.findElement(submitButton); }
}


